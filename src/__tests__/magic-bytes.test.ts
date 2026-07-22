import { describe, it, expect } from "vitest";
import { checkMagicBytesFromBuffer } from "@/features/image-to-pdf/magic-bytes";

describe("magicBytes", () => {
  it("detects JPEG magic bytes", () => {
    const bytes = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46]);
    const result = checkMagicBytesFromBuffer(bytes, "jpeg");
    expect(result).toBe(true);
  });

  it("detects PNG magic bytes", () => {
    const bytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d]);
    const result = checkMagicBytesFromBuffer(bytes, "png");
    expect(result).toBe(true);
  });

  it("rejects non-JPEG bytes for JPEG check", () => {
    const bytes = new Uint8Array([0x00, 0x00, 0x00, 0x00]);
    const result = checkMagicBytesFromBuffer(bytes, "jpeg");
    expect(result).toBe(false);
  });

  it("detects WebP magic bytes", () => {
    const bytes = new Uint8Array([0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50, 0x00, 0x00, 0x00, 0x00]);
    const result = checkMagicBytesFromBuffer(bytes, "webp");
    expect(result).toBe(true);
  });

  it("rejects RIFF but non-WEBP files", () => {
    const bytes = new Uint8Array([0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x41, 0x56, 0x49, 0x20, 0x00, 0x00, 0x00, 0x00]); // "AVI "
    const result = checkMagicBytesFromBuffer(bytes, "webp");
    expect(result).toBe(false);
  });
});
