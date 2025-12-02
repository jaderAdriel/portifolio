// app/page.tsx
'use client'; // Necessário para animações do Framer Motion, mas o SEO estático do layout.tsx prevalece.
import Image from "next/image";

import { motion } from "framer-motion";
import StructuredData from "./components/StructuredData";
import { Terminal, Code2, Database, Github, Server, Braces, Layers, Mail, Container } from "lucide-react";

const skills = [
  { name: "C#", icon: "/icons/skills/csharp-svgrepo-com.svg" },
  { name: "Django", icon: "/icons/skills/django-svgrepo-com.svg" },
  { name: ".NET", icon: "/icons/skills/dotnet-svgrepo-com.svg" },
  { name: "HTML5", icon: "/icons/skills/html5-01-svgrepo-com.svg" },
  { name: "JavaScript", icon: "/icons/skills/js02-svgrepo-com.svg" },
  { name: "Laravel", icon: "/icons/skills/laravel-svgrepo-com.svg" },
  { name: "Linux", icon: "/icons/skills/os-linux-1-svgrepo-com.svg" },
  { name: "PHP", icon: "/icons/skills/php01-svgrepo-com.svg" },
  { name: "PostgreSQL", icon: "/icons/skills/dbs-postgresql-svgrepo-com.svg" },
  { name: "MySQL", icon: "/icons/skills/dbs-mysql-svgrepo-com.svg" },
  { name: "Python", icon: "/icons/skills/python-svgrepo-com.svg" },
  { name: "Vue.js", icon: "/icons/skills/vue-16-svgrepo-com.svg" },
  { name: "Git", icon: "/icons/skills/vc-git-svgrepo-com.svg" },
  { name: "Docker", icon: "/icons/skills/docker.svg" },
  { name: "Node.js", icon: "/icons/skills/nodejs02-svgrepo-com.svg" },
  { name: "TailwindCSS", icon: "/icons/skills/tailwind-svgrepo-com.svg" },
];


export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <>
      <StructuredData />
      <main className="flex flex-col items-center w-full overflow-x-hidden">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
          <motion.div {...fadeInUp}>
            <span className="text-emerald-400 font-mono mb-4 block">Olá, meu nome é</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
              Jader Adriel.
            </h1>
            <h2 className="text-3xl md:text-5xl font-semibold text-neutral-400 mb-8">
              Eu construo soluções para a web.
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto text-lg mb-10 leading-relaxed">
              Sou um Desenvolvedor Fullstack e estudante de Análise e Desenvolvimento de Sistemas.
              Foco em criar software eficiente, escalável e com código limpo.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="#contact" className="px-8 py-3 rounded border border-emerald-400 text-emerald-400 hover:bg-emerald-400/10 transition-colors">
                Entre em contato
              </a>
              <a href="https://github.com/jaderAdriel" target="_blank" rel="noopener noreferrer" className="p-3 rounded border border-neutral-700 hover:border-white transition-colors">
                <Github />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 w-full max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <span className="text-emerald-400 font-mono text-xl mr-2">01.</span> Sobre Mim
              </h2>
              <div className="text-neutral-400 space-y-4">
                <p>
                  Atualmente estudo Análise e Desenvolvimento de Sistemas no IF Baiano e sou apaixonado por tecnologia.
                </p>
                <p>
                  Meu foco está no desenvolvimento de aplicações fullstack, explorando desde scripts de automação até sistemas complexos envolvendo dados GIS.
                </p>
                <p>
                  Estou sempre em busca de novos desafios que me permitam aplicar meus conhecimentos em cenários do mundo real.
                </p>
              </div>
            </div>
            {/* Foto ou Ilustração */}
            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-400 rounded translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
              <div className="relative bg-neutral-900 rounded border border-neutral-700 p-2 aspect-square flex items-center justify-center">
                <Code2 size={64} className="text-emerald-400" />
              </div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 w-full max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center">
            <span className="text-emerald-400 font-mono text-xl mr-2">02.</span> Tecnologias
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                whileHover={{ y: -5 }}
                className="bg-neutral-900 p-6 rounded border border-neutral-800 hover:border-emerald-400/50 transition-colors flex flex-col items-center gap-4"
              >
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={40}
                  height={40}
                  className="opacity-90"
                />
                <span className="font-mono text-sm">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 w-full max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 flex items-center">
            <span className="text-emerald-400 font-mono text-xl mr-2">03.</span> Projetos
          </h2>
          <div className="grid gap-8">
            
            <article className="bg-neutral-900 p-8 rounded border border-neutral-800 relative group hover:-translate-y-2 transition-transform">
              <div className="flex justify-between items-start mb-6">
                <div className="text-emerald-400">
                   <Code2 size={40} />
                </div>
                <div className="flex gap-4">
                  <a href="https://github.com/jaderAdriel/led-switch-esp8266" target="_blank" className="hover:text-emerald-400 transition-colors">
                    <Github size={20} />
                  </a>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">
                IoT Led Switch (ESP8266)
              </h3>
              <p className="text-neutral-400 mb-6">
                Sistema de automação para controle de LEDs utilizando microcontrolador ESP8266. Demonstra integração entre hardware e software web.
              </p>
              <ul className="flex gap-4 text-xs font-mono text-neutral-500">
                <li>C++</li>
                <li>IoT</li>
                <li>Web Server</li>
              </ul>
            </article>

          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 w-full max-w-4xl mx-auto text-center mb-20">
          <span className="text-emerald-400 font-mono mb-4 block">04. O que vem a seguir?</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Entre em Contato</h2>
          <p className="text-neutral-400 max-w-xl mx-auto mb-10">
            Estou sempre aberto a novas oportunidades e colaborações.
            Seja para discutir tecnologia, projetos GIS ou apenas dar um oi, minha caixa de entrada está aberta!
          </p>
          <a 
            href="mailto:jaderadriel7@gmail.com" 
            className="inline-flex items-center gap-2 px-8 py-4 rounded border border-emerald-400 text-emerald-400 hover:bg-emerald-400/10 transition-colors font-mono"
          >
            <Mail size={18} />
            Diga Olá
          </a>
        </section>

        <footer className="w-full py-6 text-center text-neutral-500 text-sm font-mono">
          <p>Design & Construção por Jader Adriel</p>
          <p className="mt-2">Built with Next.js 14 & Tailwind</p>
        </footer>
      </main>
    </>
  );
}