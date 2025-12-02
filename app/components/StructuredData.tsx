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
      "https://www.linkedin.com/in/seu-linkedin", // Adicione seu LinkedIn
    ],
    knowsAbout: ["Web Development", "Next.js", "React", "Node.js", "GIS Data"],
    description: "Desenvolvedor Fullstack e estudante apaixonado por construir soluções de software práticas e eficientes."
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}