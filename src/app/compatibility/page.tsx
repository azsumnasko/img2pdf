import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check Browser Support for Private PDF Tools",
  description:
    "Check which browsers support Local2PDF tools. Chrome, Firefox, Safari, and Edge 90+ are fully supported. All processing happens locally in your browser.",
  alternates: { canonical: "https://local2pdf.com/compatibility" },
  openGraph: {
    title: "Check Browser Support for Private PDF Tools",
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
  twitter: {
    card: "summary_large_image",
    title: "Check Browser Support for Private PDF Tools",
    description:
      "Check which browsers support Local2PDF tools. Chrome, Firefox, Safari, and Edge 90+ are fully supported. All processing happens locally in your browser.",
  },
};

export default function CompatibilityPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Browser Compatibility",
              description:
                "Check which browsers support Local2PDF tools. Chrome, Firefox, Safari, and Edge 90+ are fully supported. All processing happens locally in your browser.",
              url: "https://local2pdf.com/compatibility",
              publisher: {
                "@id": "https://local2pdf.com/#organization",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://local2pdf.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Browser Compatibility",
                },
              ],
            },
          ]),
        }}
      />
      <h1 className="mb-8 text-3xl font-bold">Browser Compatibility</h1>

      <p className="mb-8 text-muted-foreground">
        Local2PDF runs entirely in your browser using modern web APIs. The table below is the
        support matrix for the current tools: minimum version, how HEIC photos are decoded, and
        what still works after the app shell has been cached.
      </p>

      <div className="mb-12 overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3 pr-4 font-semibold">Browser</th>
              <th className="py-3 px-4 font-semibold">Minimum version</th>
              <th className="py-3 px-4 font-semibold">HEIC</th>
              <th className="py-3 px-4 font-semibold">Offline after first visit</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 pr-4">Chrome</td>
              <td className="py-3 px-4">90</td>
              <td className="py-3 px-4">WebAssembly decoder</td>
              <td className="py-3 px-4">JPG, PNG, and WebP</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 pr-4">Firefox</td>
              <td className="py-3 px-4">90</td>
              <td className="py-3 px-4">WebAssembly decoder</td>
              <td className="py-3 px-4">JPG, PNG, and WebP</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 pr-4">Safari</td>
              <td className="py-3 px-4">15</td>
              <td className="py-3 px-4">Native decode</td>
              <td className="py-3 px-4">JPG, PNG, and WebP</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 pr-4">Edge</td>
              <td className="py-3 px-4">90</td>
              <td className="py-3 px-4">WebAssembly decoder</td>
              <td className="py-3 px-4">JPG, PNG, and WebP</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 pr-4">Mobile Safari</td>
              <td className="py-3 px-4">iOS 15</td>
              <td className="py-3 px-4">Native decode</td>
              <td className="py-3 px-4">JPG, PNG, and WebP</td>
            </tr>
            <tr className="border-b">
              <td className="py-3 pr-4">Mobile Chrome</td>
              <td className="py-3 px-4">Android, Chrome 90</td>
              <td className="py-3 px-4">WebAssembly decoder</td>
              <td className="py-3 px-4">JPG, PNG, and WebP</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mb-8 text-muted-foreground">
        Chrome 90, Firefox 90, and Edge 90 are the desktop floor because those versions ship the
        File API, Canvas, WebAssembly, and Web Workers the tools use. Safari 15 is the floor on
        Apple devices for the same reason, with the extra benefit that HEIC is decoded by the
        system instead of a bundled decoder. Older browsers can load the page and then fail when
        a tool asks for one of those APIs. If a job fails, update the browser before you try a
        different converter.
      </p>
      <p className="mb-8 text-muted-foreground">
        Offline support starts after the first successful visit, when the service worker has
        cached the application shell. JPG, PNG, and WebP conversion can then run without a
        network. HEIC on Chrome, Firefox, and Edge needs the WebAssembly decoder from that first
        visit, so open a HEIC tool once while you are online. PDF tools that render pages also
        expect the PDF.js worker to be cached. A first visit with no network cannot install that
        shell.
      </p>
      <p className="mb-8 text-muted-foreground">
        Phone browsers follow the same matrix. Mobile Safari on iOS 15 or newer decodes HEIC
        natively, which is the practical path for iPhone photos. Mobile Chrome on Android uses
        the WebAssembly decoder. Memory, not a page cap, limits large PDFs on a phone. The
        25-image rule applies only to image-to-PDF and the format pages that share that
        converter.
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
