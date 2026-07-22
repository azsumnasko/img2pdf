import { POINTS_PER_MM, POINTS_PER_INCH, PAGE_SIZE_DIMENSIONS } from "./config";
import type { PageSizePreset, PageOrientation, FitMode } from "./types";

export function mmToPoints(mm: number): number {
  return mm * POINTS_PER_MM;
}

export function inchesToPoints(inches: number): number {
  return inches * POINTS_PER_INCH;
}

export function getPageSizePoints(
  pageSize: PageSizePreset,
  customWidthMm?: number,
  customHeightMm?: number
): { width: number; height: number } {
  if (pageSize === "image") {
    return { width: 0, height: 0 };
  }
  if (pageSize === "custom" && customWidthMm && customHeightMm) {
    return { width: mmToPoints(customWidthMm), height: mmToPoints(customHeightMm) };
  }
  const dims = PAGE_SIZE_DIMENSIONS[pageSize];
  if (!dims) {
    const a4 = PAGE_SIZE_DIMENSIONS["a4"]!;
    return { width: mmToPoints(a4.widthMm), height: mmToPoints(a4.heightMm) };
  }
  return { width: mmToPoints(dims.widthMm), height: mmToPoints(dims.heightMm) };
}

export function getImageArea(
  pageSize: PageSizePreset,
  imageWidth: number,
  imageHeight: number,
  orientation: PageOrientation,
  margins: { top: number; right: number; bottom: number; left: number },
  customWidthMm?: number,
  customHeightMm?: number
): { areaWidth: number; areaHeight: number; pageWidth: number; pageHeight: number } {
  let { width: pw, height: ph } = getPageSizePoints(pageSize, customWidthMm, customHeightMm);

  if (pageSize === "image") {
    const MAX_PAGE_POINTS = 3456; // 48 inches max
    const FIT_DPI = 200;
    pw = Math.min((imageWidth / FIT_DPI) * 72, MAX_PAGE_POINTS) + mmToPoints(margins.left + margins.right);
    ph = Math.min((imageHeight / FIT_DPI) * 72, MAX_PAGE_POINTS) + mmToPoints(margins.top + margins.bottom);
  }

  if (orientation === "landscape" && pw < ph) {
    [pw, ph] = [ph, pw];
  } else if (orientation === "portrait" && pw > ph) {
    [pw, ph] = [ph, pw];
  }

  const ml = mmToPoints(margins.left);
  const mr = mmToPoints(margins.right);
  const mt = mmToPoints(margins.top);
  const mb = mmToPoints(margins.bottom);

  return { areaWidth: pw - ml - mr, areaHeight: ph - mt - mb, pageWidth: pw, pageHeight: ph };
}

export function computeAutoOrientation(
  imageWidth: number,
  imageHeight: number,
  pageSize: PageSizePreset,
  margins: { top: number; right: number; bottom: number; left: number },
  customWidthMm?: number,
  customHeightMm?: number
): PageOrientation {
  const portrait = getImageArea(pageSize, imageWidth, imageHeight, "portrait", margins, customWidthMm, customHeightMm);
  const landscape = getImageArea(pageSize, imageWidth, imageHeight, "landscape", margins, customWidthMm, customHeightMm);
  const ps = Math.min(portrait.areaWidth / imageWidth, portrait.areaHeight / imageHeight);
  const ls = Math.min(landscape.areaWidth / imageWidth, landscape.areaHeight / imageHeight);
  return imageWidth * ps * imageHeight * ps >= imageWidth * ls * imageHeight * ls ? "portrait" : "landscape";
}

export function computeContainPlacement(
  iw: number, ih: number, aw: number, ah: number, ml: number, mt: number
): { x: number; y: number; renderWidth: number; renderHeight: number } {
  if (iw <= 0 || ih <= 0) return { x: ml, y: mt, renderWidth: aw, renderHeight: ah };
  const scale = Math.min(aw / iw, ah / ih);
  return { x: ml + (aw - iw * scale) / 2, y: mt + (ah - ih * scale) / 2, renderWidth: iw * scale, renderHeight: ih * scale };
}

export function computeCoverPlacement(
  iw: number, ih: number, aw: number, ah: number, ml: number, mt: number
): { x: number; y: number; renderWidth: number; renderHeight: number } {
  if (iw <= 0 || ih <= 0) return { x: ml, y: mt, renderWidth: aw, renderHeight: ah };
  const scale = Math.max(aw / iw, ah / ih);
  return { x: ml + (aw - iw * scale) / 2, y: mt + (ah - ih * scale) / 2, renderWidth: iw * scale, renderHeight: ih * scale };
}

export function computeImagePlacement(
  imageWidth: number,
  imageHeight: number,
  pageSize: PageSizePreset,
  orientation: PageOrientation,
  fitMode: FitMode,
  margins: { top: number; right: number; bottom: number; left: number },
  customWidthMm?: number,
  customHeightMm?: number
): { renderWidth: number; renderHeight: number; x: number; y: number; pageWidth: number; pageHeight: number } {
  const effectiveOrientation =
    orientation === "auto"
      ? computeAutoOrientation(imageWidth, imageHeight, pageSize, margins, customWidthMm, customHeightMm)
      : orientation;

  const { areaWidth, areaHeight, pageWidth, pageHeight } = getImageArea(
    pageSize, imageWidth, imageHeight, effectiveOrientation, margins, customWidthMm, customHeightMm
  );

  const ml = mmToPoints(margins.left);
  const mb = mmToPoints(margins.bottom);

  if (fitMode === "cover") {
    const p = computeCoverPlacement(imageWidth, imageHeight, areaWidth, areaHeight, ml, mb);
    return { ...p, pageWidth, pageHeight };
  }
  const p = computeContainPlacement(imageWidth, imageHeight, areaWidth, areaHeight, ml, mb);
  return { ...p, pageWidth, pageHeight };
}

export function computeDownscaleFactor(
  sw: number, sh: number, targetDpi: number, rwPoints: number, rhPoints: number
): number {
  const rwi = rwPoints / 72;
  const rhi = rhPoints / 72;
  const tw = targetDpi * rwi;
  const th = targetDpi * rhi;
  if (sw <= tw && sh <= th) return 1;
  return Math.min(tw / sw, th / sh);
}
