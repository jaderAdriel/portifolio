const projetos = [
  {
    nome: "Vizinho d'Água",
    desc: "Sistema de alerta de desabastecimento para moradores.",
    link: "https://github.com/seuusuario/vizinho-da-agua",
  },
  {
    nome: "Outro Projeto",
    desc: "Descrição curta do projeto.",
    link: "https://github.com/",
  },
];

export default function Projetos() {
  return (
    <section className="max-w-3xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-6">Projetos</h1>

      <ul className="space-y-6">
        {projetos.map((p) => (
          <li key={p.nome} className="border border-zinc-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{p.nome}</h2>
            <p className="text-zinc-400">{p.desc}</p>
            <a
              href={p.link}
              className="text-blue-400 hover:underline mt-2 inline-block"
              target="_blank"
            >
              Ver no GitHub →
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
