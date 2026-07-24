import type { OrganizerState, OrganizerPage, PdfDocumentInfo } from "./types";
import { loadPdfDocument } from "./pdf-operations";
import { renderPageToCanvas } from "./pdf-renderer";

async function loadPdfjsDoc(buf: ArrayBuffer) {
  const pdfjs = await import("pdfjs-dist");
  return (await pdfjs.getDocument({ data: buf }).promise);
}

export function createEmptyOrganizer(): OrganizerState {
  return {
    documents: [],
    pages: [],
    phase: { phase: "empty" },
  };
}

export type OrganizerAction =
  | { type: "SET_LOADING" }
  | { type: "SET_EDITING"; documents: PdfDocumentInfo[]; pages: OrganizerPage[]; warnings?: string[] }
  | { type: "REMOVE_DOCUMENT"; index: number }
  | { type: "MOVE_PAGE"; fromIndex: number; toIndex: number }
  | { type: "ROTATE_PAGE"; pageId: string; degrees: 90 | -90 | 180 }
  | { type: "TOGGLE_SELECT"; pageId: string }
  | { type: "SELECT_ALL" }
  | { type: "DESELECT_ALL" }
  | { type: "SET_PROCESSING" }
  | { type: "SET_PROGRESS"; progress: { current: number; total: number; label: string } }
  | { type: "SET_CANCELLED" }
  | { type: "SET_SUCCESS"; blob: Blob; objectUrl: string; bytes: number; filename: string; warnings: string[] }
  | { type: "SET_ERROR"; message: string; recoverable: boolean }
  | { type: "RESET" };

export function organizerReducer(state: OrganizerState, action: OrganizerAction): OrganizerState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, phase: { phase: "loading" } };

    case "SET_EDITING":
      return {
        ...state,
        documents: action.documents,
        pages: action.pages,
        phase: { phase: "editing", warnings: action.warnings },
      };

    case "REMOVE_DOCUMENT": {
      const docs = state.documents.filter((_, i) => i !== action.index);
      const pages = state.pages
        .filter((p) => p.sourceDocIndex !== action.index)
        .map((p) => ({
          ...p,
          sourceDocIndex: p.sourceDocIndex > action.index ? p.sourceDocIndex - 1 : p.sourceDocIndex,
        }));
      return {
        ...state,
        documents: docs,
        pages,
        phase: pages.length === 0 ? { phase: "empty" } : state.phase,
      };
    }

    case "MOVE_PAGE": {
      const pages = [...state.pages];
      const [moved] = pages.splice(action.fromIndex, 1);
      if (!moved) return state;
      pages.splice(action.toIndex, 0, moved);
      return { ...state, pages };
    }

    case "ROTATE_PAGE": {
      const pages = state.pages.map((p) => {
        if (p.id !== action.pageId) return p;
        const next = (((p.rotation + action.degrees) % 360) + 360) % 360;
        return { ...p, rotation: next as 0 | 90 | 180 | 270 };
      });
      return { ...state, pages };
    }

    case "TOGGLE_SELECT": {
      const pages = state.pages.map((p) =>
        p.id === action.pageId ? { ...p, selected: !p.selected } : p
      );
      return { ...state, pages };
    }

    case "SELECT_ALL":
      return { ...state, pages: state.pages.map((p) => ({ ...p, selected: true })) };

    case "DESELECT_ALL":
      return { ...state, pages: state.pages.map((p) => ({ ...p, selected: false })) };

    case "SET_PROCESSING":
      return { ...state, phase: { phase: "processing", cancelled: false } };

    case "SET_PROGRESS":
      if (state.phase.phase !== "processing") return state;
      return { ...state, phase: { ...state.phase, progress: action.progress } };

    case "SET_CANCELLED":
      if (state.phase.phase !== "processing") return state;
      return { ...state, phase: { ...state.phase, cancelled: true } };

    case "SET_SUCCESS":
      return {
        ...state,
        phase: {
          phase: "success",
          blob: action.blob,
          objectUrl: action.objectUrl,
          bytes: action.bytes,
          filename: action.filename,
          warnings: action.warnings,
        },
      };

    case "SET_ERROR":
      return { ...state, phase: { phase: "error", message: action.message, recoverable: action.recoverable } };

    case "RESET":
      return createEmptyOrganizer();

    default:
      return state;
  }
}

export async function loadPdfsAndBuildOrganizer(
  files: File[],
  onThumbnail?: (pageId: string, url: string) => void
): Promise<{ documents: PdfDocumentInfo[]; pages: OrganizerPage[]; warnings: string[] }> {
  const documents: PdfDocumentInfo[] = [];
  const pages: OrganizerPage[] = [];
  const warnings: string[] = [];

  for (const file of files) {
    try {
      const doc = await loadPdfDocument(file);
      documents.push(doc);
      const docIndex = documents.length - 1;

      const pdfBuffer = await file.arrayBuffer();
      const pdfjsDoc = await loadPdfjsDoc(pdfBuffer);

      for (const pageInfo of doc.pages) {
        const pageId = `p-${docIndex}-${pageInfo.pageNumber}-${Math.random().toString(36).slice(2, 7)}`;
        const rendered = await renderPageToCanvas(pdfBuffer, pageInfo.pageNumber, 0.3, pdfjsDoc as any);

        let thumbnailUrl = "";
        if (rendered) {
          thumbnailUrl = rendered.canvas.toDataURL("image/jpeg", 0.6);
        }

        pages.push({
          id: pageId,
          sourceDocIndex: docIndex,
          sourcePageNumber: pageInfo.pageNumber,
          thumbnailUrl,
          rotation: 0,
          selected: false,
          width: pageInfo.width,
          height: pageInfo.height,
        });
      }
    } catch {
      warnings.push(`${file.name} could not be loaded. The file may be encrypted, corrupted, or not a valid PDF.`);
    }
  }

  return { documents, pages, warnings };
}
