// app/page.tsx
'use client';

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Github,
  Mail,
  Phone,
  ExternalLink,
  Database,
  Cpu,
  Terminal,
  Check,
  Copy,
  MapPin,
  TrendingUp,
  Clock,
  Award,
  Briefcase,
  Server,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Linkedin,
  ThumbsUp,
  MessageSquare,
  Share2
} from "lucide-react";

// Types
interface Skill {
  name: string;
  icon?: string;
  category: "backend" | "database" | "devops" | "tools";
}

interface Project {
  id: string;
  title: string;
  context: string;
  description: string;
  techs: string[];
  images: { src: string; caption: string }[];
  responsibilities: string[];
  impact: {
    label: string;
    value: string;
    description: string;
  }[];
  link?: string;
}

const skills: Skill[] = [
  // Backend
  { name: "Python", icon: "/icons/skills/python-svgrepo-com.svg", category: "backend" },
  { name: "Django", icon: "/icons/skills/django-svgrepo-com.svg", category: "backend" },
  { name: "PHP", icon: "/icons/skills/php01-svgrepo-com.svg", category: "backend" },
  { name: "Laravel", icon: "/icons/skills/laravel-svgrepo-com.svg", category: "backend" },
  { name: "C#", icon: "/icons/skills/csharp-svgrepo-com.svg", category: "backend" },
  { name: ".NET", icon: "/icons/skills/dotnet-svgrepo-com.svg", category: "backend" },
  
  // Database
  { name: "PostgreSQL", icon: "/icons/skills/dbs-postgresql-svgrepo-com.svg", category: "database" },
  { name: "MySQL", icon: "/icons/skills/dbs-mysql-svgrepo-com.svg", category: "database" },
  { name: "Redis", category: "database" },
  
  // DevOps / Infra
  { name: "Docker", icon: "/icons/skills/docker.svg", category: "devops" },
  { name: "Linux", icon: "/icons/skills/os-linux-1-svgrepo-com.svg", category: "devops" },
  { name: "AWS S3", category: "devops" },
  
  // Tools
  { name: "Git", icon: "/icons/skills/vc-git-svgrepo-com.svg", category: "tools" },
  { name: "GitHub", icon: "/icons/skills/vc-git-svgrepo-com.svg", category: "tools" } // fallback or icon
];

const projects: Project[] = [
  {
    id: "sirus",
    title: "SIRUS — Regulação Médica (SAMU)",
    context: "Plataforma voltada para digitalização e automação de processos de atendimento emergencial e regulação médica em parceria com o SAMU.",
    description: "Desenvolvimento Full Stack desde a concepção do sistema de regulação médica do SAMU, atuando desde a modelagem de dados até a infraestrutura local, testes e deploy em produção.",
    techs: ["Django", "PostgreSQL", "Docker", "GIS/OSM", "pg_trgm", "Linux"],
    images: [
      { src: "/images/sirus/sirus-reuniao-2.jpeg", caption: "sirus.app.br/reuniao-equipe-samu" },
      { src: "/images/sirus/sirus-reuniao-1.jpeg", caption: "sirus.app.br/reuniao-equipe-3" },
      { src: "/images/linkedin/post2.gif", caption: "sirus.app.br/regula-mapa" },
      { src: "/images/sirus/commit-stats.png", caption: "sirus.app.br/commit-stats" },
      { src: "/images/sirus/sirus-reuniao-3.jpeg", caption: "sirus.app.br/reuniao-equipe-1" },
    ],
    link: "https://sirus.app.br",
    responsibilities: [
      "Desenvolvimento Full Stack ponta a ponta desde o início (dia 1) do projeto, implementando CRUDs e APIs do fluxo de atendimento SAMU.",
      "Análise, levantamento de requisitos junto a médicos reguladores e apoio prático na implantação presencial do sistema.",
      "Modelagem e normalização de dados espaciais com OpenStreetMap e PostGIS (busca geográfica de endereços em menos de 80ms).",
      "Otimização avançada da containerização Docker, reduzindo o tamanho final da imagem do sistema pela metade (50%).",
      "Refatoração de rotinas legadas, escrita de testes automatizados e otimização de consultas SQL complexas."
    ],
    impact: [
      { label: "Velocidade de Busca", value: "80ms", description: "Tempo de resposta de busca de endereço reduzido de 3s para 80ms" },
      { label: "Redução de Latência", value: "97.3%", description: "Melhoria na velocidade de resposta em chamadas críticas" },
      { label: "Modernização SAMU", value: "100% Digital", description: "Substituição de registros físicos por logs digitais auditáveis" }
    ]
  },
  {
    id: "sertaopdv",
    title: "SertãoPDV — Ponto de Venda & Comandas",
    context: "Sistema de PDV comercial e gestão de comandas para bares e restaurantes em ambiente de produção com clientes reais.",
    description: "Desenvolvimento Full Stack de sistema comercial de PDV e gestão de comandas ativo em clientes reais, participando de todo o ciclo de vida da aplicação.",
    techs: ["Laravel", "PostgreSQL", "MySQL", "Redis", "Docker", "AWS S3", "VPS Linux"],
    images: [
      { src: "/images/sertaopdv/dashboard.png", caption: "sertaopdv.app/dashboard" },
      { src: "/images/sertaopdv/implementacao.jpeg", caption: "sertaopdv.app/implementacao" },
      { src: "/images/sertaopdv/frente-caixa.png", caption: "sertaopdv.app/frente-caixa" },
      { src: "/images/sertaopdv/criar-comanda.png", caption: "sertaopdv.app/nova-comanda" },
      { src: "/images/sertaopdv/historico-comanda.png", caption: "sertaopdv.app/historico" }
    ],
    responsibilities: [
      "Desenvolvimento Full Stack desde a fase inicial, modelando o banco de dados e implementando o controle de comandas e fluxo de caixa.",
      "Levantamento de requisitos de usabilidade junto a clientes e testes de integração com hardware local (impressão térmica).",
      "Implementação de APIs REST seguras em Laravel e integração para persistência e distribuição de mídias no AWS S3.",
      "Configuração e automatização do ambiente local, deploys em VPS Linux e testes de estresse em consultas PostgreSQL/MySQL."
    ],
    impact: [
      { label: "Operação Real", value: "24/7 Ativo", description: "Infraestrutura resiliente rodando continuamente para estabelecimentos comerciais" },
      { label: "Tempo de Resposta", value: "Sub-100ms", description: "Consultas otimizadas e cache inteligente para operações de caixa rápidas" },
      { label: "Armazenamento", value: "AWS S3", description: "Desacoplamento de arquivos estáticos reduzindo custos de VPS" }
    ]
  },
  {
    id: "guavet",
    title: "Guavet — Clínica Veterinária 24h",
    context: "Landing page institucional focada em conversão e agendamentos para clínica veterinária 24h em Guanambi-BA.",
    description: "Landing page institucional para clínica veterinária 24h, focada em design responsivo e acessibilidade.",
    techs: ["HTML5", "Vanilla CSS", "JavaScript", "SEO", "Responsive Design"],
    images: [{ src: "/images/tela-inicio-guavet.png", caption: "guavet.com/home" }],
    link: "https://guavet.com",
    responsibilities: [
      "Desenvolvimento de interface fluida e responsiva com HTML5, CSS e JS.",
      "Estruturação básica de SEO técnico on-page para buscas locais.",
      "Otimização de performance e tempo de carregamento de mídias.",
      "Configuração básica de hospedagem e domínio do projeto."
    ],
    impact: [
      { label: "Mobile First", value: "100%", description: "Experiência de carregamento ideal em conexões 3G/4G" },
      { label: "SEO Score", value: "A+", description: "Excelente posicionamento orgânico para buscas locais em Guanambi-BA" },
      { label: "Conversão", value: "Direta", description: "Fluxo otimizado para chamadas de emergência e agendamento de consultas" }
    ]
  }
];

const experiences = [
  {
    role: "Estagiário Full Stack",
    company: "VISDOM Tecnologia da Informação",
    period: "Ago de 2025 – Abr de 2026",
    link: "https://www.visdom.com.br/",
    bullets: [
      "Criação e manutenção de módulos no backend e frontend.",
      "Resolução de bugs e melhorias de performance nas aplicações web.",
      "Desenvolvimento utilizando Laravel, Vue.js e banco de dados MongoDB."
    ],
    skills: ["Laravel", "PHP", "Vue.js", "MongoDB", "JavaScript", "Git", "HTML", "CSS"]
  },
  {
    role: "Desenvolvedor Full Stack",
    company: "SIRUS",
    period: "Mar de 2024 – Mar de 2025",
    link: "https://sirus.app.br",
    bullets: [
      "Atuação como desenvolvedor Full Stack desde a concepção inicial do sistema, participando da modelagem de dados, escrita de CRUDs e criação de APIs.",
      "Levantamento e análise de requisitos operacionais técnicos, atuando ativamente na homologação e implantação presencial da plataforma.",
      "Otimização e reestruturação da infraestrutura Docker do projeto, reduzindo o tamanho final das imagens em 50%.",
      "Modelagem espacial geográfica (PostGIS/OpenStreetMap) e fonética no PostgreSQL, reduzindo tempo de buscas de endereços críticas para menos de 100ms."
    ],
    skills: ["Python", "Django", "PostgreSQL", "GIS", "Docker", "Linux", "Git", "HTML", "CSS"]
  }
];

const education = [
  {
    degree: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    institution: "Instituto Federal de Educação, Ciência e Tecnologia Baiano",
    period: "Fev de 2024 – Ago de 2026",
    description: "Tecnologia da Informação, Análise de Sistemas e Desenvolvimento de Software. Aprendizado teórico-prático com foco em engenharia de sistemas modernos.",
    competencies: ["Desenvolvimento de software", "Banco de dados"],
    extraCompetencies: 9
  },
  {
    degree: "Curso Técnico Integrado em Informática",
    institution: "Instituto Federal de Educação, Ciência e Tecnologia Baiano",
    period: "Mar de 2020 – Set de 2023",
    description: "Curso de informática integrado ao ensino médio. Base sólida de lógica, arquitetura, redes de computadores e programação de computadores.",
    competencies: ["Desenvolvimento de software", "SQL"],
    extraCompetencies: 14
  }
];

interface LinkedinPost {
  id: string;
  title: string;
  date: string;
  preview: string;
  hashtags: string;
  image?: string;
  link: string;
}

const linkedinPosts: LinkedinPost[] = [
  {
    id: "restic-aws",
    title: "Estratégia de Backup com AWS S3 & Restic",
    date: "há 1 semana",
    preview: "Hoje tirei um tempo para melhorar a estratégia de backup do meu SaaS. Em vez de depender apenas do servidor, agora os backups são enviados automaticamente para a AWS S3 utilizando Restic...",
    hashtags: "#AWS #S3 #Restic #Docker #Laravel #DevOps",
    image: "/images/linkedin/post1.jpeg",
    link: "https://www.linkedin.com/posts/jader-adriel-30a719213_aws-s3-restic-share-7472020806227685377-pbl4/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADYIk3oBjDEuyGsbwy7K5_tpF8SYPFmxLTc"
  },
  {
    id: "sirus-osm",
    title: "Busca de Endereços em < 100ms no SIRUS",
    date: "há 3 semanas",
    preview: "Como reduzi o tempo de busca de endereços no SIRUS para menos de 100 ms utilizando OpenStreetMap, PostGIS e PostgreSQL. Durante o desenvolvimento do SIRUS, sistema de regulação médica desenvolvido em parceria com o SAMU...",
    hashtags: "#PostgreSQL #PostGIS #OpenStreetMap #Python #Django #Backend #SoftwareEngineering #GeoSpatial #SAMU",
    image: "/images/linkedin/post2.gif",
    link: "https://www.linkedin.com/posts/jader-adriel-30a719213_postgresql-postgis-openstreetmap-ugcPost-7469546072802156544-vKqY/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADYIk3oBjDEuyGsbwy7K5_tpF8SYPFmxLTc"
  }
];

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "backend" | "database" | "devops" | "tools">("all");
  const [activeJornadaTab, setActiveJornadaTab] = useState<"experience" | "education">("experience");
  const [menuOpen, setMenuOpen] = useState(false);
  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({
    sirus: 0,
    sertaopdv: 0,
    guavet: 0,
  });
  const [selectedCert, setSelectedCert] = useState<{ src: string; title: string; validationLink?: string } | null>(null);

  const intervalsRef = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  const startAutoplay = useCallback((projectId: string) => {
    if (intervalsRef.current[projectId]) {
      clearInterval(intervalsRef.current[projectId]);
    }
    const project = projects.find((p) => p.id === projectId);
    if (!project || project.images.length <= 1) return;

    intervalsRef.current[projectId] = setInterval(() => {
      setCarouselIndices((prev) => {
        const current = prev[projectId] ?? 0;
        return {
          ...prev,
          [projectId]: (current + 1) % project.images.length,
        };
      });
    }, 60 * 1000); // 60 segundos
  }, []);

  const nextImage = (projectId: string, maxImages: number) => {
    setCarouselIndices((prev) => {
      const current = prev[projectId] ?? 0;
      return {
        ...prev,
        [projectId]: (current + 1) % maxImages,
      };
    });
    startAutoplay(projectId);
  };

  const prevImage = (projectId: string, maxImages: number) => {
    setCarouselIndices((prev) => {
      const current = prev[projectId] ?? 0;
      return {
        ...prev,
        [projectId]: (current - 1 + maxImages) % maxImages,
      };
    });
    startAutoplay(projectId);
  };

  const goToImage = (projectId: string, imgIdx: number) => {
    setCarouselIndices((prev) => ({
      ...prev,
      [projectId]: imgIdx,
    }));
    startAutoplay(projectId);
  };

  useEffect(() => {
    projects.forEach((project) => {
      if (project.images.length > 1) {
        startAutoplay(project.id);
      }
    });

    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, [startAutoplay]);

  const copyEmail = () => {
    navigator.clipboard.writeText("jaderadriel7@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredSkills = activeTab === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeTab);

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-100 overflow-x-hidden font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-400">
      
      {/* Background decoration */}
      <div className="absolute inset-0 glow-grid pointer-events-none opacity-40 z-0" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[40%] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none z-0" />

      {/* Header */}
      <header className="sticky top-0 w-full bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-bold font-mono tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            JA<span className="text-emerald-400">.</span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
            <a href="#about" className="hover:text-emerald-400 transition-colors">Sobre</a>
            <a href="#projects" className="hover:text-emerald-400 transition-colors">Projetos</a>
            <a href="#experience" className="hover:text-emerald-400 transition-colors">Experiência</a>
            <a href="#certifications" className="hover:text-emerald-400 transition-colors">Qualificações</a>
            <a href="#linkedin" className="hover:text-emerald-400 transition-colors">LinkedIn</a>
            <a href="#stack" className="hover:text-emerald-400 transition-colors">Stack</a>
            <a href="#contact" className="hover:text-emerald-400 transition-colors">Contato</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/jaderAdriel"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all"
            >
              <Github size={18} />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="#contact"
              className="px-4 py-2 rounded-lg bg-emerald-500 text-neutral-950 text-sm font-semibold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/10"
            >
              Falar Comigo
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-neutral-900 bg-neutral-950/95 backdrop-blur-lg px-6 py-4"
            >
              <nav className="flex flex-col gap-4 text-sm font-medium text-neutral-400">
                <a href="#about" onClick={() => setMenuOpen(false)} className="hover:text-emerald-400 transition-colors">Sobre</a>
                <a href="#projects" onClick={() => setMenuOpen(false)} className="hover:text-emerald-400 transition-colors">Projetos</a>
                <a href="#experience" onClick={() => setMenuOpen(false)} className="hover:text-emerald-400 transition-colors">Experiência</a>
                <a href="#certifications" onClick={() => setMenuOpen(false)} className="hover:text-emerald-400 transition-colors">Qualificações</a>
                <a href="#linkedin" onClick={() => setMenuOpen(false)} className="hover:text-emerald-400 transition-colors">LinkedIn</a>
                <a href="#stack" onClick={() => setMenuOpen(false)} className="hover:text-emerald-400 transition-colors">Stack</a>
                <a href="#contact" onClick={() => setMenuOpen(false)} className="hover:text-emerald-400 transition-colors">Contato</a>
                <div className="flex gap-4 items-center mt-2 pt-4 border-t border-neutral-900">
                  <a
                    href="https://github.com/jaderAdriel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-400 hover:text-white"
                  >
                    <Github size={18} /> GitHub
                  </a>
                  <a
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-lg bg-emerald-500 text-neutral-950 text-sm font-semibold hover:bg-emerald-400 transition-colors"
                  >
                    Falar Comigo
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-20 relative">
          <div className="max-w-4xl">
            {/* Top Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-950/20 text-emerald-400 text-xs font-mono mb-6"
            >
              <Sparkles size={12} className="animate-pulse" />
              <span>Desenvolvedor Full Stack • Formando em ADS</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4"
            >
              Jader Adriel<span className="text-emerald-400">.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold text-neutral-400 mb-8 bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-neutral-400 to-neutral-600"
            >
              Desenvolvimento web focado em praticidade e desempenho.
            </motion.h2>

            {/* Pitch */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-neutral-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
            >
              Sou desenvolvedor Full Stack, em fase de conclusão do curso de Análise e Desenvolvimento de Sistemas. Foco em criar sistemas organizados, otimização de consultas SQL e integração com Docker e Linux.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 items-center mb-16"
            >
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-lg bg-emerald-500 text-neutral-950 font-semibold hover:bg-emerald-400 transition-all flex items-center gap-2 group shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20"
              >
                Ver Projetos 
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={copyEmail}
                className="px-6 py-3.5 rounded-lg border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 hover:border-neutral-700 transition-all flex items-center gap-2 text-neutral-300 font-medium cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-emerald-400" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copiar Email</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Hero Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl border border-neutral-900 bg-neutral-950/40 backdrop-blur-sm p-5 rounded-2xl relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 rounded-2xl pointer-events-none" />
              
              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 shrink-0">
                  <Mail size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">Email</p>
                  <a href="mailto:jaderadriel7@gmail.com" className="text-xs font-semibold text-neutral-200 hover:text-emerald-450 transition-colors block truncate">
                    jaderadriel7@gmail.com
                  </a>
                </div>
              </div>

              {/* Telefone / WhatsApp */}
              <div className="flex items-center gap-3 border-l border-neutral-900/60 pl-3 md:pl-4">
                <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400 shrink-0">
                  <Phone size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">WhatsApp</p>
                  <a href="https://wa.me/5577999623204" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-neutral-200 hover:text-cyan-400 transition-colors block truncate">
                    +55 (77) 99962-3204
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-3 border-t border-neutral-900/60 pt-3 md:border-t-0 md:pt-0 md:border-l md:pl-4">
                <div className="p-2.5 bg-[#0a66c2]/10 rounded-xl border border-[#0a66c2]/20 text-[#0a66c2] shrink-0">
                  <Linkedin size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">LinkedIn</p>
                  <a href="https://www.linkedin.com/in/jader-adriel-30a719213" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-neutral-200 hover:text-emerald-400 transition-colors block truncate">
                    jader-adriel
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-center gap-3 border-t border-l border-neutral-900/60 pt-3 pl-3 md:border-t-0 md:pt-0 md:pl-4">
                <div className="p-2.5 bg-neutral-850 rounded-xl border border-neutral-800 text-neutral-300 shrink-0">
                  <Github size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">GitHub</p>
                  <a href="https://github.com/jaderAdriel" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-neutral-200 hover:text-emerald-400 transition-colors block truncate">
                    jaderAdriel
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 border-t border-neutral-900 scroll-mt-16">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            
            <div className="md:col-span-3">
              <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 block">01. Sobre mim</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Criando soluções web eficientes</h2>
              
              <div className="text-neutral-400 space-y-5 leading-relaxed">
                <p>
                  Sou desenvolvedor Full Stack, na fase de conclusão (pendente apenas o TCC) do curso de Análise e Desenvolvimento de Sistemas no IF Baiano. Tenho experiência prática colaborando no desenvolvimento de sistemas de regulação médica e de ponto de venda (PDV).
                </p>
                <p>
                  Tenho facilidade e gosto de trabalhar com o <strong className="text-neutral-200">desenvolvimento backend e otimização de consultas em bancos de dados relacionais</strong>. Já atuei resolvendo problemas de lentidão de queries e organizando a containerização com Docker.
                </p>
                <p>
                  Busco sempre aplicar boas práticas de design de software para construir sistemas práticos, eficientes e fáceis de manter.
                </p>
              </div>
            </div>

            <div className="md:col-span-2 relative">
              <div className="relative mx-auto max-w-[280px] md:max-w-none aspect-square group">
                {/* Glow border background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-2xl opacity-10 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                
                {/* Card representation */}
                <div className="relative h-full w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
                  {/* Decorative mesh */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                  
                  <div className="flex justify-between items-start">
                    <div className="flex gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/70" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <span className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <Terminal size={20} className="text-neutral-600" />
                  </div>

                  <div className="space-y-4 font-mono text-xs text-neutral-400 my-8">
                    <p className="text-emerald-400"># info.json</p>
                    <p className="text-neutral-300">
                      {`{`}
                      <br />
                      &nbsp;&nbsp;<span className="text-cyan-400">&quot;name&quot;</span>: &quot;Jader Adriel&quot;,
                      <br />
                      &nbsp;&nbsp;<span className="text-cyan-400">&quot;role&quot;</span>: &quot;Full Stack Developer&quot;,
                      <br />
                      &nbsp;&nbsp;<span className="text-cyan-400">&quot;focus&quot;</span>: [&quot;Backend&quot;, &quot;Architecture&quot;, &quot;DBs&quot;],
                      <br />
                      &nbsp;&nbsp;<span className="text-cyan-400">&quot;location&quot;</span>: &quot;Bahia, Brasil&quot;,
                      <br />
                      &nbsp;&nbsp;<span className="text-cyan-400">&quot;status&quot;</span>: &quot;Pronto para criar impacto&quot;
                      <br />
                      {`}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-neutral-800/80 pt-4">
                    <MapPin size={16} className="text-emerald-400" />
                    <span className="text-xs text-neutral-400 font-mono">Guanambi, BA</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 border-t border-neutral-900 scroll-mt-16">
          <div className="mb-16">
            <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 block">02. Projetos em Destaque</span>
            <h2 className="text-3xl md:text-4xl font-bold">Aplicações reais, performance comprovada</h2>
            <p className="text-neutral-400 mt-2 max-w-xl">
              Cada projeto reflete a aplicação de boas práticas de design, arquitetura de APIs e otimização profunda de dados.
            </p>
          </div>

          <div className="flex flex-col gap-24">
            {projects.map((project, index) => {
              const activeImgIdx = carouselIndices[project.id] ?? 0;
              const activeImg = project.images[activeImgIdx] ?? project.images[0];
              const hasMultipleImages = project.images.length > 1;

              return (
                <motion.article 
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`grid lg:grid-cols-12 gap-8 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                >
                {/* Project Details */}
                <div className={`lg:col-span-6 space-y-6 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-neutral-900 border border-neutral-800 text-neutral-300">
                      {project.context}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-neutral-400 leading-relaxed">
                    {project.description}
                  </p>

                  {/* List of Responsibilities */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-mono text-neutral-500 uppercase tracking-widest">Contribuições Técnicas:</h4>
                    <ul className="grid gap-2 text-sm text-neutral-300">
                      {project.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack pills */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techs.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-900 text-neutral-400 border border-neutral-850">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Metrics grid inside project card */}
                  <div className="grid grid-cols-3 gap-4 border border-neutral-900 bg-neutral-950/60 p-4 rounded-xl">
                    {project.impact.map((metric, i) => (
                      <div key={i} className="text-center border-r last:border-r-0 border-neutral-900">
                        <p className="text-xs font-mono text-neutral-500 mb-1">{metric.label}</p>
                        <p className="text-lg md:text-xl font-bold text-white">{metric.value}</p>
                        <p className="text-[10px] text-neutral-400 px-1 mt-0.5 line-clamp-2">{metric.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Explicit Project URL button */}
                  {project.link && (
                    <div className="pt-2 flex">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 group w-fit cursor-pointer"
                      >
                        <span>Acessar Plataforma</span>
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Project Image Mockup */}
                <div className={`lg:col-span-6 relative group ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                  
                  <div className="relative overflow-hidden rounded-2xl border border-neutral-900 group-hover:border-emerald-500/30 transition-colors duration-500 shadow-2xl bg-neutral-900/40">
                    {/* Simulated browser header */}
                    <div className="h-7 bg-neutral-950 border-b border-neutral-900 px-4 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500/60" />
                        <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
                        <span className="w-2 h-2 rounded-full bg-green-500/60" />
                      </div>
                      <div className="flex-1 max-w-[65%] mx-auto bg-neutral-900/40 border border-neutral-850 rounded px-2.5 py-0.5 text-center flex items-center justify-center gap-1 overflow-hidden h-4.5">
                        <span className="text-[9px] text-neutral-500 font-mono truncate">{activeImg.caption}</span>
                      </div>
                      <div className="w-12" /> {/* Empty spacer to balance layout */}
                    </div>

                    {/* Simulated browser page */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                      <AnimatePresence initial={false} mode="wait">
                        <motion.div
                          key={activeImgIdx}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          className="relative w-full h-full"
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={activeImg.src}
                              alt={`${project.title} - ${activeImg.caption}`}
                              fill
                              className="object-cover object-top transition-transform duration-500 hover:scale-[1.01] filter brightness-90 hover:brightness-100"
                              sizes="(max-width: 1024px) 100vw, 500px"
                              priority={index === 0 && activeImgIdx === 0}
                              unoptimized={activeImg.src.endsWith(".gif")}
                            />
                          </div>
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation buttons for Carousel (Only if multiple images) */}
                      {hasMultipleImages && (
                        <>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              prevImage(project.id, project.images.length);
                            }}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-950/75 hover:bg-neutral-900/95 text-neutral-350 hover:text-white border border-neutral-800/80 backdrop-blur-sm flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 cursor-pointer shadow-lg hover:scale-105 z-20"
                            aria-label="Imagem anterior"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              nextImage(project.id, project.images.length);
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-neutral-950/75 hover:bg-neutral-900/95 text-neutral-350 hover:text-white border border-neutral-800/80 backdrop-blur-sm flex items-center justify-center transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 cursor-pointer shadow-lg hover:scale-105 z-20"
                            aria-label="Próxima imagem"
                          >
                            <ChevronRight size={16} />
                          </button>

                          {/* Pagination indicators */}
                          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5 z-20">
                            <div className="flex gap-1 py-1 px-2 rounded-full bg-neutral-950/50 backdrop-blur-md border border-neutral-800/30">
                              {project.images.map((_, imgIdx) => (
                                <button
                                  key={imgIdx}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    goToImage(project.id, imgIdx);
                                  }}
                                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                    imgIdx === activeImgIdx 
                                      ? "bg-emerald-400 w-3" 
                                      : "bg-neutral-500 hover:bg-neutral-300 w-1.5"
                                  }`}
                                  aria-label={`Ir para imagem ${imgIdx + 1}`}
                                />
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

              </motion.article>
            );
            })}
          </div>
        </section>

        {/* Experience & Education Section */}
        <section id="experience" className="py-24 border-t border-neutral-900 scroll-mt-16">
          <div className="grid md:grid-cols-3 gap-12">
            
            <div className="space-y-6">
              <div>
                <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 block">03. Jornada</span>
                <h2 className="text-3xl font-bold">Jornada Profissional</h2>
                <p className="text-neutral-400 mt-4 leading-relaxed">
                  Minha trajetória combina a engenharia de software aplicada no mercado com uma base acadêmica e técnica sólida.
                </p>
              </div>

              {/* Tab Selector */}
              <div className="flex flex-col gap-2 p-1.5 rounded-xl border border-neutral-900 bg-neutral-950/50 w-full">
                <button
                  onClick={() => setActiveJornadaTab("experience")}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer text-left flex items-center gap-3.5 ${
                    activeJornadaTab === "experience"
                      ? "bg-emerald-500 text-neutral-950"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900/30"
                  }`}
                >
                  <Briefcase size={16} />
                  <span>Experiência Profissional</span>
                </button>
                <button
                  onClick={() => setActiveJornadaTab("education")}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all cursor-pointer text-left flex items-center gap-3.5 ${
                    activeJornadaTab === "education"
                      ? "bg-emerald-500 text-neutral-950"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900/30"
                  }`}
                >
                  <Award size={16} />
                  <span>Formação Acadêmica</span>
                </button>
              </div>
            </div>

            {/* Right Column: Timeline rendering based on active tab */}
            <div className="md:col-span-2 relative min-h-[300px]">
              {/* Timeline background vertical line */}
              <div className="absolute left-4 top-2 bottom-2 w-[1px] bg-neutral-800" />
              
              <AnimatePresence mode="wait">
                {activeJornadaTab === "experience" ? (
                  <motion.div
                    key="experience-timeline"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-12"
                  >
                    {experiences.map((exp, i) => (
                      <div key={i} className="relative pl-12 group">
                        {/* Timeline dot */}
                        <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2 border-emerald-500 bg-neutral-950 group-hover:bg-emerald-400 transition-colors duration-300 shadow-sm" />
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex flex-wrap items-baseline gap-x-2.5">
                              <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                              {exp.link ? (
                                <a 
                                  href={exp.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-emerald-400 font-mono text-sm hover:underline hover:text-emerald-350 flex items-center gap-0.5"
                                >
                                  @ {exp.company}
                                  <ArrowUpRight size={12} className="opacity-70" />
                                </a>
                              ) : (
                                <span className="text-emerald-400 font-mono text-sm">@ {exp.company}</span>
                              )}
                            </div>
                            <p className="text-xs text-neutral-500 font-mono mt-1">{exp.period}</p>
                          </div>

                          <ul className="space-y-2 text-sm text-neutral-400">
                            {exp.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="text-emerald-400 shrink-0 select-none">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {exp.skills.map((skill) => (
                              <span key={skill} className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-neutral-900 border border-neutral-850 text-neutral-400">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="education-timeline"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-12"
                  >
                    {education.map((edu, i) => (
                      <div key={i} className="relative pl-12 group">
                        {/* Timeline dot */}
                        <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full border-2 border-emerald-500 bg-neutral-950 group-hover:bg-emerald-400 transition-colors duration-300 shadow-sm" />
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex flex-col gap-0.5">
                              <h3 className="text-xl font-bold text-white leading-tight">{edu.degree}</h3>
                              <span className="text-emerald-400 font-mono text-sm mt-1">@ {edu.institution}</span>
                            </div>
                            <p className="text-xs text-neutral-500 font-mono mt-1">{edu.period}</p>
                          </div>

                          <p className="text-sm text-neutral-400 leading-relaxed">
                            {edu.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-1.5 pt-2">
                            {edu.competencies.map((comp) => (
                              <span key={comp} className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-neutral-900 border border-neutral-850 text-neutral-350">
                                {comp}
                              </span>
                            ))}
                            {edu.extraCompetencies && (
                              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-emerald-950/20 border border-emerald-500/20 text-emerald-400">
                                +{edu.extraCompetencies} competências
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* Qualifications Section */}
        <section id="certifications" className="py-24 border-t border-neutral-900 scroll-mt-16">
          <div className="mb-16">
            <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 block">04. Qualificações</span>
            <h2 className="text-3xl font-bold">Certificações e Conquistas</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            
            {/* OBI Badge (Main Highlight) */}
            <div className="glow-card p-6 rounded-2xl flex flex-col justify-between border border-neutral-900 bg-neutral-950/40 h-full group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 text-yellow-400">
                    <Award size={24} />
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-semibold text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">Top 174</span>
                    <p className="text-[8px] text-neutral-500 font-mono mt-0.5 uppercase tracking-wider">Nacional</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-450 transition-colors">Olimpíada de Informática (OBI)</h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed min-h-[60px]">
                    Destaque nacional em resolução de problemas lógicos complexos e algoritmos de computação. Competição promovida pela Sociedade Brasileira de Computação (SBC).
                  </p>
                </div>
              </div>

              {/* Certificate preview */}
              <div className="relative aspect-[1.414/1] w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 my-4 cursor-pointer group/thumb"
                onClick={() => setSelectedCert({
                  src: "/images/curriculos/certificado-obi.jpeg",
                  title: "Olimpíada Brasileira de Informática (OBI 2021)"
                })}
              >
                <Image
                  src="/images/curriculos/certificado-obi.jpeg"
                  alt="Certificado OBI 2021"
                  fill
                  className="object-cover object-center group-hover/thumb:scale-105 transition-transform duration-300 filter brightness-90 group-hover/thumb:brightness-100"
                  sizes="280px"
                />
                <div className="absolute inset-0 bg-neutral-950/45 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs text-white font-semibold backdrop-blur-[1px]">
                  <Sparkles size={14} className="text-yellow-400" />
                  <span>Visualizar</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex flex-wrap gap-1 mt-auto">
                {["Lógica", "Grafos", "Buscas", "Algoritmos"].map((skill) => (
                  <span key={skill} className="px-2 py-0.5 rounded text-[9px] font-mono bg-neutral-900 border border-neutral-850 text-neutral-400">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Java Completo */}
            <div className="glow-card p-6 rounded-2xl flex flex-col justify-between border border-neutral-900 bg-neutral-950/40 h-full group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 w-fit">
                    <Code2 size={24} />
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/20">Curso Livre</span>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-450 transition-colors">Java COMPLETO — POO</h3>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed min-h-[60px]">
                    Curso intensivo cobrindo os fundamentos de programação orientada a objetos (POO), coleções, concorrência e projetos Java estruturados na Udemy.
                  </p>
                </div>
              </div>

              {/* Certificate preview */}
              <div className="relative aspect-[1.414/1] w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 my-4 cursor-pointer group/thumb"
                onClick={() => setSelectedCert({
                  src: "/images/curriculos/java-udemy.jpg",
                  title: "Java COMPLETO Programação Orientada a Objetos — Udemy",
                  validationLink: "https://www.udemy.com/certificate/UC-2ae846ab-d06c-416e-9bff-0270298853da" // Substitua pelo seu ID de validação real
                })}
              >
                <Image
                  src="/images/curriculos/java-udemy.jpg"
                  alt="Certificado Java Udemy"
                  fill
                  className="object-cover object-center group-hover/thumb:scale-105 transition-transform duration-300 filter brightness-90 group-hover/thumb:brightness-100"
                  sizes="280px"
                />
                <div className="absolute inset-0 bg-neutral-950/45 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs text-white font-semibold backdrop-blur-[1px]">
                  <Sparkles size={14} className="text-emerald-400" />
                  <span>Visualizar</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between mt-auto w-full">
                <div className="flex flex-wrap gap-1">
                  {["Java", "POO", "Estruturas", "Coleções"].map((skill) => (
                    <span key={skill} className="px-2 py-0.5 rounded text-[9px] font-mono bg-neutral-900 border border-neutral-850 text-neutral-400">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <a
                  href="https://www.udemy.com/certificate/UC-2ae846ab-d06c-416e-9bff-0270298853da" // Substitua pelo seu link real
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-455 hover:text-emerald-350 hover:underline flex items-center gap-0.5 font-mono shrink-0 ml-2"
                  onClick={(e) => e.stopPropagation()} // Impede abrir o modal de imagem ao clicar no link
                >
                  <span>Validar</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Estartando Devs */}
            <div className="glow-card p-6 rounded-2xl flex flex-col justify-between border border-neutral-900 bg-neutral-950/40 h-full group">
              <div className="space-y-4">
                <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400 w-fit">
                  <Server size={24} />
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-500/20">Formação</span>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">Desenvolvimento Backend</h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed min-h-[60px]">
                  Formação focada em C#, .NET Framework, bancos de dados SQL, testes unitários, boas práticas e arquitetura limpa com princípios SOLID, metodologias ágeis (Scrum) e CI/CD.
                </p>
              </div>

              {/* Certificate preview */}
              <div className="relative aspect-[1.414/1] w-full rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950 my-4 cursor-pointer group/thumb"
                onClick={() => setSelectedCert({
                  src: "/images/curriculos/certificado-backend-estartando.jpeg",
                  title: "Curso Desenvolvimento Backend — Estartando Devs"
                })}
              >
                <Image
                  src="/images/curriculos/certificado-backend-estartando.jpeg"
                  alt="Certificado Estartando Devs"
                  fill
                  className="object-cover object-center group-hover/thumb:scale-105 transition-transform duration-300 filter brightness-90 group-hover/thumb:brightness-100"
                  sizes="280px"
                />
                <div className="absolute inset-0 bg-neutral-950/45 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs text-white font-semibold backdrop-blur-[1px]">
                  <Sparkles size={14} className="text-cyan-400" />
                  <span>Visualizar</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex flex-wrap gap-1 mt-auto">
                {["C#", ".NET", "SOLID", "SQL", "Testes", "CI/CD", "Docker", "Git", "Scrum"].map((skill) => (
                  <span key={skill} className="px-2 py-0.5 rounded text-[9px] font-mono bg-neutral-900 border border-neutral-850 text-neutral-400">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* LinkedIn Section */}
        <section id="linkedin" className="py-24 border-t border-neutral-900 scroll-mt-16">
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 block">05. Destaques do LinkedIn</span>
              <h2 className="text-3xl md:text-4xl font-bold">Compartilhando Conhecimento</h2>
              <p className="text-neutral-400 mt-2 max-w-xl">
                Artigos e insights que publico sobre engenharia de software, desafios de infraestrutura e soluções de backend.
              </p>
            </div>
            <a
              href="https://www.linkedin.com/in/jader-adriel-30a719213"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg border border-neutral-800 bg-neutral-900/40 hover:bg-neutral-900 hover:border-neutral-700 text-sm font-semibold transition-all flex items-center gap-2 text-neutral-300 cursor-pointer"
            >
              <Linkedin size={18} className="text-[#0a66c2]" />
              <span>Ver Perfil Completo</span>
              <ArrowUpRight size={14} className="opacity-60" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {linkedinPosts.map((post) => (
              <article 
                key={post.id}
                className="glow-card rounded-2xl border border-neutral-900 bg-neutral-900/30 flex flex-col justify-between overflow-hidden relative group"
              >
                <div className="p-6 space-y-4">
                  {/* LinkedIn Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border border-neutral-800 shrink-0">
                        <Image
                          src="/images/eu.png"
                          alt="Jader Adriel"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">Jader Adriel</h4>
                        <p className="text-[11px] text-neutral-400">Full Stack Developer</p>
                        <p className="text-[10px] text-neutral-500 font-mono mt-0.5">{post.date} • LinkedIn</p>
                      </div>
                    </div>
                    
                    <Linkedin size={20} className="text-[#0a66c2]" />
                  </div>

                  {/* Title & Preview */}
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-neutral-200 group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed font-sans">
                      {post.preview}
                    </p>
                  </div>

                  {/* Hashtags */}
                  <div className="text-xs font-mono text-emerald-400/80 tracking-wide">
                    {post.hashtags}
                  </div>

                  {/* Post Media */}
                  {post.image && (
                    <div className="relative rounded-xl overflow-hidden border border-neutral-850 mt-2 bg-neutral-950 aspect-video max-h-[260px]">
                      <Image
                        src={post.image}
                        alt="LinkedIn Post Preview Media"
                        fill
                        className="object-cover group-hover:scale-[1.01] transition-transform duration-300"
                        unoptimized={post.image.endsWith(".gif")}
                      />
                    </div>
                  )}
                </div>

                {/* LinkedIn Footer - Single Call to Action */}
                <div className="px-6 pb-6 pt-2">
                  <a 
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-lg border border-neutral-800 bg-neutral-950/60 hover:bg-neutral-900 hover:border-neutral-700 text-xs font-semibold font-mono text-neutral-300 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <span>Ler Publicação Completa</span>
                    <ArrowUpRight size={14} className="opacity-60" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Stack & Habilidades */}
        <section id="stack" className="py-24 border-t border-neutral-900 scroll-mt-16">
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-3 block">06. Tecnologias</span>
              <h2 className="text-3xl font-bold">Stack Tecnológico</h2>
              <p className="text-neutral-400 mt-2 max-w-md">
                Conjunto de tecnologias utilizadas ativamente para construir soluções modernas, de APIs a fluxos de deploy.
              </p>
            </div>

            {/* Tabs for categories */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-xl border border-neutral-900 bg-neutral-950/50 w-fit">
              {(["all", "backend", "database", "devops", "tools"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer ${
                    activeTab === tab 
                      ? "bg-emerald-500 text-neutral-950 font-bold" 
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {tab === "all" ? "Todos" : tab === "database" ? "Bancos" : tab}
                </button>
              ))}
            </div>
          </div>

          <motion.div 
            layout 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  key={skill.name}
                  className="p-5 rounded-xl border border-neutral-900 bg-neutral-950/40 hover:border-emerald-500/20 hover:bg-neutral-900/30 flex items-center gap-3.5 transition-all group duration-300"
                >
                  {skill.icon ? (
                    <div className="relative w-8 h-8 opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 transition-colors shrink-0">
                      {skill.category === "database" ? <Database size={16} /> : <Server size={16} />}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors">{skill.name}</p>
                    <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">{skill.category}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 border-t border-neutral-900 text-center relative scroll-mt-16 mb-12">
          
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-emerald-400 font-mono text-sm tracking-widest uppercase block">07. Contato</span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Vamos construir algo incrível?</h2>
            
            <p className="text-neutral-400 leading-relaxed max-w-lg mx-auto">
              Estou sempre aberto a novas oportunidades, parcerias e bate-papos técnicos. Seja para discutir APIs REST, arquitetura distribuída ou performance em bancos de dados.
            </p>

            <div className="flex flex-col items-center gap-4 pt-6">
              {/* Copyable email card */}
              <div className="p-4 rounded-xl border border-neutral-900 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-between gap-6 w-full max-w-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
                    <Mail size={18} />
                  </div>
                  <span className="text-sm font-mono text-neutral-300">jaderadriel7@gmail.com</span>
                </div>
                
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct email & social CTA */}
              <div className="flex items-center justify-center gap-4 mt-2">
                <a
                  href="mailto:jaderadriel7@gmail.com"
                  className="px-6 py-3.5 rounded-lg bg-emerald-500 text-neutral-950 font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/10"
                >
                  Enviar Email
                </a>
                
                <a
                  href="https://github.com/jaderAdriel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-lg border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 hover:border-neutral-700 transition-all flex items-center gap-2 text-neutral-300 font-medium"
                >
                  <Github size={18} />
                  <span>GitHub</span>
                  <ArrowUpRight size={14} className="opacity-50" />
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900/60 bg-neutral-950/80 py-8 text-center text-neutral-500 text-xs font-mono relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Jader Adriel. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <a href="https://github.com/jaderAdriel" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">GitHub</a>
            <span>•</span>
            <a href="mailto:jaderadriel7@gmail.com" className="hover:text-emerald-400 transition-colors">Contato</a>
          </div>
        </div>
      </footer>

      {/* Lightbox Modal for Certificates */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 bg-neutral-950/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Modal Content container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col cursor-default"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-neutral-800 bg-neutral-950/40">
                <h3 className="text-sm font-semibold text-neutral-200">{selectedCert.title}</h3>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-850 transition-all cursor-pointer"
                  aria-label="Fechar modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body (Image) */}
              <div className="relative aspect-[1.414/1] w-full max-h-[70vh] bg-neutral-950 flex items-center justify-center p-2 overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={selectedCert.src}
                    alt={selectedCert.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-neutral-800 bg-neutral-950/40 flex flex-wrap gap-3 items-center justify-between">
                <p className="text-[11px] text-neutral-500 font-mono">Clique fora para fechar</p>
                
                <div className="flex items-center gap-3">
                  {selectedCert.validationLink && (
                    <a
                      href={selectedCert.validationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/10"
                    >
                      <ExternalLink size={14} />
                      <span>Validar Credencial</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-4 py-2 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}