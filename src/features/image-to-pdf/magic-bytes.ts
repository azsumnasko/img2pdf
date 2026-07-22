const MAGIC_SIGNATURES: Record<string, number[][]> = {
  jpeg: [[0xff, 0xd8, 0xff]],
  png: [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  webp: [
    [0x52, 0x49, 0x46, 0x46],
  ],
  heic: [
    [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70],
    [0x00, 0x00, 0x00, 0x1c, 0x66, 0x74, 0x79, 0x70],
  ],
};

const WEBP_SUB_SIGNATURE_OFFSET = 8;
const WEBP_SUB_MARKER = [0x57, 0x45, 0x42, 0x50]; // "WEBP"

export function checkMagicBytesFromBuffer(
  bytes: Uint8Array,
  expectedFormat: string
): boolean {
  const signatures = MAGIC_SIGNATURES[expectedFormat];
  if (!signatures) return true;

  return signatures.some((sig) => {
    if (sig.length > bytes.length) return false;
    const match = sig.every((b, i) => bytes[i] === b);
    if (!match) return false;

    if (expectedFormat === "webp") {
      if (bytes.length < 16) return false;
      const sub = WEBP_SUB_MARKER;
      return sub.every((b, i) => bytes[WEBP_SUB_SIGNATURE_OFFSET + i] === b);
    }

    return true;
  });
}

export async function checkMagicBytes(
  file: File,
  expectedFormat: string
): Promise<boolean> {
  const signatures = MAGIC_SIGNATURES[expectedFormat];
  if (!signatures) return true;

  try {
    const buffer = await file.slice(0, 16).arrayBuffer();
    const bytes = new Uint8Array(buffer);
    return checkMagicBytesFromBuffer(bytes, expectedFormat);
  } catch {
    return false;
  }
}
