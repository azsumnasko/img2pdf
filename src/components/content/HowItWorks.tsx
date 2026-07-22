export function HowItWorks() {
  return (
    <section className="how-it-works" aria-labelledby="how-it-works-title">
      <h2 id="how-it-works-title">How it works</h2>
      <ol className="steps">
        <li className="step">
          <span className="step-number" aria-hidden="true">1</span>
          <div>
            <h3>Select your images</h3>
            <p>Choose up to 25 JPG, PNG, WebP, or HEIC images from your device. Use drag and drop, the file picker, paste from clipboard, or your camera on mobile.</p>
          </div>
        </li>
        <li className="step">
          <span className="step-number" aria-hidden="true">2</span>
          <div>
            <h3>Arrange and adjust</h3>
            <p>Reorder pages, rotate images, and choose page size, orientation, margins, and quality settings.</p>
          </div>
        </li>
        <li className="step">
          <span className="step-number" aria-hidden="true">3</span>
          <div>
            <h3>Convert and download</h3>
            <p>Click Convert to create your PDF. Everything happens on your device. No upload, no signup, no watermark.</p>
          </div>
        </li>
      </ol>
    </section>
  );
}
