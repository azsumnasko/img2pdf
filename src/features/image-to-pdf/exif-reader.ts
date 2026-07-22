export type ExifOrientation = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const ORIENTATION_TO_DEGREES: Record<ExifOrientation, number> = {
  1: 0,
  2: 0,   // flip horizontal, no rotation
  3: 180,
  4: 0,   // flip vertical, no rotation
  5: 90,  // flip H + 90 CW
  6: 90,
  7: 270, // flip V + 90 CW
  8: 270,
};

const ORIENTATION_FLIP: Record<ExifOrientation, { flipH: boolean; flipV: boolean }> = {
  1: { flipH: false, flipV: false },
  2: { flipH: true, flipV: false },
  3: { flipH: false, flipV: false },
  4: { flipH: false, flipV: true },
  5: { flipH: false, flipV: false },
  6: { flipH: false, flipV: false },
  7: { flipH: false, flipV: false },
  8: { flipH: false, flipV: false },
};

export function parseExifOrientation(buffer: ArrayBuffer): ExifOrientation {
  const v = new DataView(buffer);
  if (v.byteLength < 2 || v.getUint16(0) !== 0xffd8) return 1;

  let off = 2;
  const len = v.byteLength;

  while (off < len - 2) {
    const marker = v.getUint16(off);
    if (marker === 0xffe1) {
      if (off + 10 > len) return 1;
      if (v.getUint32(off + 4) !== 0x45786966) return 1; // "Exif"
      if (v.getUint16(off + 8) !== 0x0000) return 1;

      const tiff = off + 10;
      if (tiff + 8 > len) return 1;

      const le = v.getUint16(tiff) === 0x4949;
      if (v.getUint16(tiff + 2, le) !== 0x002a) return 1;

      let ifd = tiff + v.getUint32(tiff + 4, le);
      if (ifd + 2 > len) return 1;
      const n = v.getUint16(ifd, le);
      ifd += 2;

      for (let i = 0; i < n; i++, ifd += 12) {
        if (ifd + 12 > len) return 1;
        if (v.getUint16(ifd, le) === 0x0112) {
          const val = v.getUint16(ifd + 8, le);
          return (val >= 1 && val <= 8 ? val : 1) as ExifOrientation;
        }
      }
      return 1;
    }
    if (marker === 0xffd8) { off += 2; continue; }
    if ((marker & 0xfff0) === 0xffd0) { off += 2; continue; }
    if (marker === 0xffd9) return 1;
    if (off + 4 > len) return 1;
    const segLen = v.getUint16(off + 2);
    if (segLen < 2) return 1;
    off += 2 + segLen;
  }
  return 1;
}

export function applyExifOrientation(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  orientation: ExifOrientation,
  width: number,
  height: number
): { outWidth: number; outHeight: number } {
  if (orientation === 1) return { outWidth: width, outHeight: height };

  const needsSwap = orientation >= 5;
  const outW = needsSwap ? height : width;
  const outH = needsSwap ? width : height;

  ctx.translate(outW / 2, outH / 2);

  switch (orientation) {
    case 2: ctx.scale(-1, 1); break;
    case 3: ctx.rotate(Math.PI); break;
    case 4: ctx.scale(1, -1); break;
    case 5: ctx.scale(-1, 1); ctx.rotate(Math.PI / 2); break;
    case 6: ctx.rotate(Math.PI / 2); break;
    case 7: ctx.scale(1, -1); ctx.rotate(Math.PI / 2); break;
    case 8: ctx.rotate(-Math.PI / 2); break;
  }

  ctx.translate(-outW / 2, -outH / 2);
  return { outWidth: outW, outHeight: outH };
}
