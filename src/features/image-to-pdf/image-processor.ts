import { THUMBNAIL_MAX_DIMENSION } from "./config";

export async function generateThumbnail(
  file: File
): Promise<{ objectUrl: string; width: number; height: number } | null> {
  let objectUrl: string | undefined;
  try {
    objectUrl = URL.createObjectURL(file);
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Failed to load"));
      image.src = objectUrl!;
    });

    const { naturalWidth: w, naturalHeight: h } = img;

    let tw = w;
    let th = h;
    const maxDim = THUMBNAIL_MAX_DIMENSION;
    if (w > maxDim || h > maxDim) {
      const scale = Math.min(maxDim / w, maxDim / h);
      tw = Math.round(w * scale);
      th = Math.round(h * scale);
    }

    const canvas = document.createElement("canvas");
    canvas.width = tw;
    canvas.height = th;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, tw, th);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Failed to encode"))),
        "image/jpeg",
        0.7
      );
    });

    const thumbUrl = URL.createObjectURL(blob);
    return { objectUrl: thumbUrl, width: tw, height: th };
  } catch {
    return null;
  } finally {
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  }
}

export function revokeThumbnail(url: string): void {
  try {
    URL.revokeObjectURL(url);
  } catch {
    // already revoked or invalid
  }
}
