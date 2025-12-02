// app/components/StructuredData.tsx
export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jader Adriel",
    url: "https://jaderadriel.com",
    jobTitle: "Fullstack Developer",
    sameAs: [
      "https://github.com/jaderAdriel",
      "www.linkedin.com/in/jader-adriel-30a719213",
    ],
    knowsAbout: ["Web Development", "C#", ".NET", "React", "Tailwind", "Django", "Python", "Postgres"],
    description: "Desenvolvedor Fullstack e estudante apaixonado por construir soluções de software práticas e eficientes."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}