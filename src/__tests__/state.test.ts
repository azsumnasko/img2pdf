import { describe, it, expect } from "vitest";
import { projectReducer, createEmptyProject, computeOutputFilename } from "@/features/image-to-pdf/state";

describe("projectReducer", () => {
  it("starts in empty phase", () => {
    const project = createEmptyProject();
    expect(project.state.phase).toBe("empty");
    expect(project.pages).toHaveLength(0);
  });

  it("transitions to validating", () => {
    const project = createEmptyProject();
    const next = projectReducer(project, { type: "SET_VALIDATING" });
    expect(next.state.phase).toBe("validating");
  });

  it("transitions to editing with pages", () => {
    const project = createEmptyProject();
    const next = projectReducer(project, { type: "SET_EDITING", pages: [], validationErrors: [] });
    expect(next.state.phase).toBe("editing");
  });

  it("removes a page", () => {
    const project = createEmptyProject();
    const page = {
      id: "p1",
      file: new File([], "test.jpg"),
      format: "jpeg" as const,
      sourceWidth: 100,
      sourceHeight: 100,
      sourceBytes: 1000,
      rotationDegrees: 0 as const,
      thumbnailUrl: "blob:test",
      status: "ready" as const,
    };
    const withPage = projectReducer(project, {
      type: "SET_EDITING",
      pages: [page],
      validationErrors: [],
    });
    const removed = projectReducer(withPage, { type: "REMOVE_PAGE", pageId: "p1" });
    expect(removed.pages).toHaveLength(0);
    expect(removed.state.phase).toBe("empty");
  });

  it("rotates a page clockwise", () => {
    const project = createEmptyProject();
    const page = {
      id: "p1",
      file: new File([], "test.jpg"),
      format: "jpeg" as const,
      sourceWidth: 100,
      sourceHeight: 100,
      sourceBytes: 1000,
      rotationDegrees: 0 as const,
      thumbnailUrl: "blob:test",
      status: "ready" as const,
    };
    const withPage = projectReducer(project, {
      type: "SET_EDITING",
      pages: [page],
      validationErrors: [],
    });
    const rotated = projectReducer(withPage, { type: "ROTATE_PAGE", pageId: "p1", direction: "cw" });
    expect(rotated.pages[0]?.rotationDegrees).toBe(90);
  });

  it("resets preserving some settings", () => {
    const project = createEmptyProject();
    const withSettings = projectReducer(project, { type: "SET_PAGE_SIZE", pageSize: "letter" });
    const reset = projectReducer(withSettings, { type: "RESET" });
    expect(reset.state.phase).toBe("empty");
    expect(reset.settings.pageSize).toBe("letter");
  });
});

describe("computeOutputFilename", () => {
  it("appends .pdf", () => {
    expect(computeOutputFilename("test")).toBe("test.pdf");
  });

  it("strips existing .pdf extension", () => {
    expect(computeOutputFilename("test.pdf")).toBe("test.pdf");
  });

  it("sanitizes special characters", () => {
    expect(computeOutputFilename('test<>:"/\\|?*.pdf')).toBe("test.pdf");
  });

  it("trims to 80 chars", () => {
    const long = "a".repeat(100);
    const result = computeOutputFilename(long);
    expect(result.length).toBeLessThanOrEqual(84);
  });
});
