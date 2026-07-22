"use client";

type Project = {
  name: string;
  url: string;
  description: string;
  tagline: string;
  image: string;
  accent?: string;
};

const PROJECTS: Project[] = [
  {
    name: "Firmify",
    url: "https://firmify.bg",
    description: "Automated company registration in Bulgaria",
    tagline: "Register your EOOD or OOD online.",
    image: "/promo/firmify.svg",
    accent: "#2563eb",
  },
  {
    name: "Storykind",
    url: "https://storykind.tech",
    description: "Personalized AI-powered children's stories",
    tagline: "Magical stories, crafted for your child.",
    image: "/promo/storykind.svg",
    accent: "#7C5CFC",
  },
];

export function MakerPromo() {
  if (PROJECTS.length === 0) return null;

  return (
    <section className="maker-promo" aria-labelledby="maker-promo-title">
      <p className="maker-promo-label" id="maker-promo-title">Also by the maker</p>
      <div className="maker-promo-grid">
        {PROJECTS.map((p) => (
          <a
            key={p.url}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="maker-promo-card"
            style={{ "--promo-accent": p.accent } as React.CSSProperties}
          >
            <div className="maker-promo-image">
              <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" />
              <div className="maker-promo-shine" aria-hidden="true" />
            </div>
            <div className="maker-promo-body">
              <span className="maker-promo-name">
                <span className="maker-promo-dot" aria-hidden="true" />
                {p.name}
              </span>
              <span className="maker-promo-desc">{p.tagline}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
