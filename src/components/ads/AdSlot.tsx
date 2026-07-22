"use client";

type AdSlotProps = {
  id: string;
  type?: "content" | "rail";
};

const SLOT_DIMENSIONS: Record<string, { minHeight: number; maxWidth: number }> = {
  content: { minHeight: 100, maxWidth: 728 },
  rail: { minHeight: 250, maxWidth: 300 },
};

export function AdSlot({ id, type = "content" }: AdSlotProps) {
  const dims = SLOT_DIMENSIONS[type]!;

  return (
    <div
      className={`ad-slot ad-slot--${type}`}
      data-ad-slot={id}
      role="complementary"
      aria-label="Advertisement"
      style={{
        minHeight: `${dims.minHeight}px`,
        maxWidth: type === "rail" ? `${dims.maxWidth}px` : undefined,
      }}
    >
      <span className="ad-label">Advertisement</span>
      <div className="ad-placeholder" style={{ minHeight: `${dims.minHeight}px` }}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXX"
          data-ad-slot={id}
          data-ad-format={type === "rail" ? "vertical" : "auto"}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
