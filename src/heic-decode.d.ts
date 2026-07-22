declare module "heic-decode" {
  interface HeicDecodeOptions {
    buffer: Uint8Array;
  }

  interface HeicDecodeResult {
    width: number;
    height: number;
    data: Uint8ClampedArray;
  }

  export default function decode(options: HeicDecodeOptions): Promise<HeicDecodeResult>;
}
