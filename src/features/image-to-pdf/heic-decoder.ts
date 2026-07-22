let heicDecodeModule: typeof import("heic-decode") | null = null;

async function getDecoder() {
  if (!heicDecodeModule) {
    heicDecodeModule = await import("heic-decode");
  }
  return heicDecodeModule;
}

export function isSafariHeicSupported(): boolean {
  const ua = navigator.userAgent;
  const isSafari = /Safari/i.test(ua) && !/Chrome/i.test(ua) && !/Chromium/i.test(ua);
  if (!isSafari) return false;
  const match = ua.match(/Version\/(\d+)/);
  const first = match?.[1];
  return first ? parseInt(first, 10) >= 17 : false;
}

export async function decodeHeicToCanvas(
  file: File
): Promise<HTMLCanvasElement | OffscreenCanvas | null> {
  try {
    const decoder = await getDecoder();
    const buffer = await file.arrayBuffer();
    const { width, height, data } = await decoder.default({
      buffer: new Uint8Array(buffer),
    });

    const useOffscreen = typeof OffscreenCanvas !== "undefined";
    const canvas = useOffscreen
      ? new OffscreenCanvas(width, height)
      : document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
    const imageData = new ImageData(
      new Uint8ClampedArray(data.buffer as ArrayBuffer, data.byteOffset, data.byteLength),
      width,
      height
    );
    ctx.putImageData(imageData, 0, 0);

    return canvas;
  } catch {
    return null;
  }
}
