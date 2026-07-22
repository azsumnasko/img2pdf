import { describe, it, expect } from "vitest";
import { formatBytes, formatDuration, sanitizeFilename } from "@/lib/format";

describe("formatBytes", () => {
  it("formats 0 bytes", () => {
    expect(formatBytes(0)).toBe("0 B");
  });

  it("formats bytes", () => {
    expect(formatBytes(500)).toBe("500 B");
  });

  it("formats KB", () => {
    expect(formatBytes(2048)).toBe("2.0 KB");
  });

  it("formats MB", () => {
    expect(formatBytes(5_242_880)).toBe("5.0 MB");
  });
});

describe("formatDuration", () => {
  it("formats milliseconds", () => {
    expect(formatDuration(500)).toBe("500ms");
  });

  it("formats seconds", () => {
    expect(formatDuration(2500)).toBe("2.5s");
  });
});

describe("sanitizeFilename", () => {
  it("removes special characters", () => {
    expect(sanitizeFilename('test<>:"/\\|?*.pdf')).toBe("test.pdf");
  });

  it("normalizes whitespace", () => {
    expect(sanitizeFilename("test   file  name")).toBe("test file name");
  });

  it("trims to 80 chars", () => {
    const long = "x".repeat(100);
    expect(sanitizeFilename(long).length).toBe(80);
  });
});
