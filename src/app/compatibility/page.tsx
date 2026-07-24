import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browser Compatibility — Local2PDF",
  description:
    "Check which browsers support Local2PDF tools. Chrome, Firefox, Safari, and Edge 90+ are fully supported. All processing happens locally in your browser.",
  alternates: { canonical: "https://local2pdf.com/compatibility" },
  openGraph: {
    title: "Browser Compatibility — Local2PDF",
    description:
      "Check which browsers support Local2PDF tools. Chrome, Firefox, Safari, and Edge 90+ are fully supported.",
    url: "https://local2pdf.com/compatibility",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Local2PDF — Private PDF tools in your browser",
      },
    ],
  },
};

export default function CompatibilityPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Browser Compatibility</h1>

      <p className="mb-8 text-muted-foreground">
        Local2PDF runs entirely in your browser using modern web APIs. Below is a
        breakdown of which platforms and features are supported.
      </p>

      <div className="mb-12 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3 pr-4 font-semibold">Feature</th>
              <th className="py-3 px-4 font-semibold">Chrome 90+</th>
              <th className="py-3 px-4 font-semibold">Firefox 90+</th>
              <th className="py-3 px-4 font-semibold">Safari 15+</th>
              <th className="py-3 px-4 font-semibold">Edge 90+</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 pr-4">File API</td>
              <td className="py-3 px-4 text-green-600">Supported</td>
              <td className="py-3 px-4 text-green-600">Supported</td>
              <td className="py-3 px-4 text-green-600">Supported</td>
              <td className="py-3 px-4 text-green-600">Supported</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 pr-4">Canvas</td>
              <td className="py-3 px-4 text-green-600">Supported</td>
              <td className="py-3 px-4 text-green-600">Supported</td>
              <td className="py-3 px-4 text-green-600">Supported</td>
              <td className="py-3 px-4 text-green-600">Supported</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 pr-4">WebAssembly</td>
              <td className="py-3 px-4 text-green-600">Supported</td>
              <td className="py-3 px-4 text-green-600">Supported</td>
              <td className="py-3 px-4 text-green-600">Supported</td>
              <td className="py-3 px-4 text-green-600">Supported</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 pr-4">Web Workers</td>
              <td className="py-3 px-4 text-green-600">Supported</td>
              <td className="py-3 px-4 text-green-600">Supported</td>
              <td className="py-3 px-4 text-green-600">Supported</td>
              <td className="py-3 px-4 text-green-600">Supported</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border p-5">
          <h2 className="mb-2 text-lg font-semibold">HEIC Support</h2>
          <p className="text-muted-foreground">
            HEIC images are natively supported in <strong>Safari</strong>.
            On <strong>Chrome</strong>, <strong>Firefox</strong>, and{" "}
            <strong>Edge</strong>, HEIC conversion is handled via a
            WebAssembly-based decoder that runs entirely in your browser.
          </p>
        </div>

        <div className="rounded-lg border p-5">
          <h2 className="mb-2 text-lg font-semibold">PDF Tools</h2>
          <p className="text-muted-foreground">
            All PDF tools require the Canvas API for page rendering and
            preview. Any browser that supports Canvas — Chrome, Firefox,
            Safari, and Edge 90+ — can use every PDF tool without
            restrictions.
          </p>
        </div>
      </div>
    </main>
  );
}
