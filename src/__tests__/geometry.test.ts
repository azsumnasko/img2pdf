import { describe, it, expect } from "vitest";
import {
  computeContainPlacement,
  computeCoverPlacement,
  mmToPoints,
  getPageSizePoints,
} from "@/features/image-to-pdf/geometry";

describe("geometry", () => {
  it("converts mm to points", () => {
    expect(mmToPoints(25.4)).toBeCloseTo(72);
    expect(mmToPoints(210)).toBeCloseTo(595.276, 1);
    expect(mmToPoints(297)).toBeCloseTo(841.89, 1);
  });

  it("gets A4 page size in points", () => {
    const a4 = getPageSizePoints("a4");
    expect(a4.width).toBeCloseTo(595.276, 1);
    expect(a4.height).toBeCloseTo(841.89, 1);
  });

  it("gets US Letter page size in points", () => {
    const letter = getPageSizePoints("letter");
    // 8.5 * 72 = 612, 11 * 72 = 792
    expect(letter.width).toBeCloseTo(612, 0);
    expect(letter.height).toBeCloseTo(792, 0);
  });

  it("computes contain placement - landscape image in portrait page", () => {
    const result = computeContainPlacement(1600, 900, 500, 700, 10, 10);
    // Scale = min(500/1600, 700/900) = min(0.3125, 0.7778) = 0.3125
    // rw = 1600 * 0.3125 = 500, rh = 900 * 0.3125 = 281.25
    expect(result.renderWidth).toBeCloseTo(500, 0);
    expect(result.renderHeight).toBeCloseTo(281.25, 1);
    // x = 10 + (500 - 500)/2 = 10
    expect(result.x).toBeCloseTo(10, 0);
    // y = 10 + (700 - 281.25)/2 = 10 + 209.375 = 219.375
    expect(result.y).toBeCloseTo(219.375, 1);
  });

  it("computes cover placement - portrait image in landscape area", () => {
    const result = computeCoverPlacement(900, 1600, 700, 500, 10, 10);
    // Scale = max(700/900, 500/1600) = max(0.7778, 0.3125) = 0.7778
    // rw = 900 * 0.7778 = 700, rh = 1600 * 0.7778 = 1244.44
    expect(result.renderWidth).toBeCloseTo(700, 0);
    expect(result.renderHeight).toBeCloseTo(1244.44, 0);
  });
});
