// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

const baseUrl = process.env.SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  title: {
    template: "%s | Jader Adriel",
    default: "Jader Adriel | Desenvolvedor Fullstack",
  },
  description: "Portfólio de Jader Adriel, Desenvolvedor Fullstack e estudante de Análise e Desenvolvimento de Sistemas. Especialista em soluções web eficientes.",
  metadataBase: new URL(baseUrl), // Substitua pelo seu domínio real
  keywords: ["Desenvolvedor Fullstack", "React", "Next.js", "Node.js", "Jader Adriel", "Portfólio"],
  authors: [{ name: "Jader Adriel", url: "https://github.com/jaderAdriel" }],
  creator: "Jader Adriel",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: baseUrl,
    siteName: "Jader Adriel Portfolio",
    title: "Jader Adriel | Desenvolvedor Fullstack",
    description: "Transformando ideias em código. Veja meus projetos e habilidades.",
    images: [
      {
        url: `${baseUrl}/jader.png`, // Adicione uma imagem 1200x630px na pasta public
        width: 1200,
        height: 630,
        alt: "Jader Adriel - Desenvolvedor Fullstack",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} bg-neutral-950 text-neutral-100 antialiased`}>
        {children}
      </body>
    </html >
  );
}