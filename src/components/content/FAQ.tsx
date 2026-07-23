export function FAQ() {
  const items = [
    {
      q: "Are my images uploaded to your servers?",
      a: "No. All image processing happens entirely in your browser. Your files never leave your device.",
    },
    {
      q: "Do I need to create an account?",
      a: "No. Local2PDF is free to use without any account, signup, or email address.",
    },
    {
      q: "Is there a watermark on the output?",
      a: "No. There is no watermark, branding, or any other marking added to your PDF.",
    },
    {
      q: "How many images can I convert at once?",
      a: "The free version supports up to 25 pages per conversion. You can run unlimited conversions.",
    },
    {
      q: "Which image formats are supported?",
      a: "JPEG, PNG, WebP, and HEIC images are supported.",
    },
    {
      q: "What page sizes are available?",
      a: "You can choose A4, A3, A5, US Letter, US Legal, fit to image, or enter custom dimensions.",
    },
    {
      q: "Can I use this offline?",
      a: "Yes. After your first visit, JPG, PNG, and WebP conversion works offline.",
    },
    {
      q: "Is this tool free?",
      a: "Yes. Local2PDF is free to use with no hidden costs. The site is supported by advertising placed away from the tool controls.",
    },
  ];

  return (
    <section className="faq" aria-labelledby="faq-title">
      <h2 id="faq-title">Frequently asked questions</h2>
      <div className="faq-list">
        {items.map((item, i) => (
          <details key={i} className="faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
