export function HowItWorks() {
  return (
    <section className="how-it-works" aria-labelledby="how-it-works-title">
      <h2 id="how-it-works-title">How it works</h2>
      <ol className="steps">
        <li className="step">
          <span className="step-number" aria-hidden="true">1</span>
          <div>
            <h3>Choose a PDF tool</h3>
            <p>Pick from a variety of tools: convert images to PDF, merge or split PDFs, rotate or reorder pages, extract text, or export PDF pages as images.</p>
          </div>
        </li>
        <li className="step">
          <span className="step-number" aria-hidden="true">2</span>
          <div>
            <h3>Select files from your device</h3>
            <p>Add PDF documents and images from your device. Use drag and drop, the file picker, paste from clipboard, or your camera on mobile.</p>
          </div>
        </li>
        <li className="step">
          <span className="step-number" aria-hidden="true">3</span>
          <div>
            <h3>Make your changes locally</h3>
            <p>Adjust page order, orientation, margins, quality, and other settings. Everything is processed right in your browser &mdash; no files are uploaded.</p>
          </div>
        </li>
        <li className="step">
          <span className="step-number" aria-hidden="true">4</span>
          <div>
            <h3>Download the result</h3>
            <p>Get your converted, merged, or modified file instantly. No signup, no watermark, no waiting &mdash; everything stays on your device.</p>
          </div>
        </li>
      </ol>
    </section>
  );
}
