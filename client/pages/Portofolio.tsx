"use client";

import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ExternalLink,
  Filter,
  Globe,
  ShoppingBag,
  Layout,
} from "lucide-react";

type Category = "Toate" | "Landing" | "Business" | "eCommerce";

type Project = {
  id: string;
  title: string;
  category: Exclude<Category, "Toate">;
  desc: string;
  tags: string[];
  cover?: string;
  accent: "orange" | "cyan";

  demoUrl: string;
  detailsUrl: string;
  external?: boolean;
};
const Navbar = () => (
  <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
      <Link to="/" className="flex items-center gap-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
          <span className="text-white font-semibold">W</span>
        </div>
        <span className="text-white/90 font-semibold tracking-tight">
          Web Studio
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        <Link
          to="/"
          className="text-white/80 hover:text-white transition-colors"
        >
          Acasă
        </Link>
        <Link
          to="/servicii"
          className="text-white/80 hover:text-white transition-colors"
        >
          Servicii
        </Link>
        <span className="text-white">Portofoliu</span>
        <a
          href="#contact"
          className="text-white/80 hover:text-white transition-colors"
        >
          Contact
        </a>
      </nav>

      <Link to="/oferta">
        <Button className="bg-orange-500 hover:bg-orange-500/90 text-black rounded-xl px-5 h-10">
          Cere ofertă
        </Button>
      </Link>
    </div>
  </header>
);

function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-sm transition",
        active
          ? "bg-white/10 text-white ring-1 ring-white/15"
          : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 ring-1 ring-white/10",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const accent = p.accent === "orange" ? "bg-orange-500/14" : "bg-cyan-500/12";
  const ring =
    p.accent === "orange" ? "ring-orange-500/25" : "ring-cyan-500/20";

  const badge =
    p.category === "Landing"
      ? { icon: <Layout className="h-4 w-4" />, label: "Landing Page" }
      : p.category === "Business"
        ? { icon: <Globe className="h-4 w-4" />, label: "Website Business" }
        : {
            icon: <ShoppingBag className="h-4 w-4" />,
            label: "Magazin Online",
          };

  const DemoLink = p.external ? "a" : Link;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition-colors">
      <div
        className={[
          "pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          accent,
        ].join(" ")}
      />

      <div className="relative mb-6 overflow-hidden rounded-xl border border-white/10 bg-black/30">
        {p.cover ? (
          <img
            src={p.cover}
            alt={p.title}
            className="h-44 w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-44 w-full grid place-items-center">
            <div
              className={["h-16 w-16 rounded-2xl ring-1", ring, accent].join(
                " ",
              )}
            />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:60px_60px]" />
      </div>

      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/75 ring-1 ring-white/10">
          {badge.icon}
          {badge.label}
        </div>

        {/* DEMO */}
        <DemoLink
          to={!p.external ? p.demoUrl : undefined}
          href={p.external ? p.demoUrl : undefined}
          target={p.external ? "_blank" : undefined}
          rel={p.external ? "noreferrer" : undefined}
          className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white transition"
          title="Demo"
        >
          Demo <ExternalLink className="h-3.5 w-3.5" />
        </DemoLink>
      </div>

      <h3 className="text-lg font-semibold text-white">{p.title}</h3>
      <p className="mt-2 text-sm text-white/60 leading-relaxed">{p.desc}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span
            key={t}
            className="text-xs rounded-full bg-white/5 text-white/70 px-3 py-1 ring-1 ring-white/10"
          >
            {t}
          </span>
        ))}
      </div>

      {/* VEZI DETALII */}
    </div>
  );
}

export default function Portfolio() {
  const [cat, setCat] = useState<Category>("Toate");

  const projects = useMemo<Project[]>(
    () => [
      {
        id: "p1",
        title: "Cuptorul Dumitraș",
        category: "Business",
        desc: "Landing page orientată pe conversii: servicii, rezultate, CTA clar și contact rapid.",
        tags: ["Mobile-first", "CTA", "SEO basic"],
        accent: "orange",
        cover: "/images/portofolio/Cuptorul_Dumitras.png",
        demoUrl: "https://cuptorul-dumitras-3k3z.vercel.app/",
        detailsUrl: "/portofoliu/p1",
        external: true,
      },
      {
        id: "p2",
        title: "Elaborare teze",
        category: "Landing",
        desc: "Site business cu pagină clară, structură profesională, optimizare viteză și formulare.",
        tags: ["1 pagină", "UX modern", "Performance"],
        accent: "cyan",
        cover: "/images/portofolio/teza.png",
        demoUrl: "https://xn--tez-cpa.com/",
        detailsUrl: "/portofoliu/p1",
        external: true,
      },
      {
        id: "p3",
        title: "Magazin Online – Ceasuri",
        category: "eCommerce",
        desc: "Catalog + categorii, pagini produs, coș și comandă. Layout curat și ușor de folosit.",
        tags: ["Catalog", "Checkout", "Admin (opțional)"],
        accent: "orange",
        cover: "/images/portofolio/watch.png",
        demoUrl:
          "https://watch-bxuiw8z6z-trollers-projects-205cb586.vercel.app/",
        detailsUrl: "/portofoliu/p1",
        external: true,
      },
    ],
    [],
  );

  const filtered =
    cat === "Toate" ? projects : projects.filter((p) => p.category === cat);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-28 md:pt-32 pb-10 px-4">
        {/* background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-orange-500/12 blur-3xl" />
          <div className="absolute -bottom-56 -right-56 h-[620px] w-[620px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:70px_70px]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Exemple de proiecte (demo / mock)
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight text-white">
              Portofoliu
              <br />
              design premium, rezultate clare.
            </h1>

            <p className="mt-5 text-white/60 max-w-2xl mx-auto">
              Aici vezi stilul nostru de lucru: layout-uri curate, structură
              clară și focus pe conversii.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/oferta">
                <Button className="bg-orange-500 hover:bg-orange-500/90 text-black rounded-xl px-5 h-10">
                  Cere ofertă
                </Button>
              </Link>
              <Link
                to="/servicii"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 h-11 text-white/90 hover:bg-white/10 transition"
              >
                Vezi servicii
              </Link>
            </div>
          </div>

          {/* FILTERS */}
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/70">
              <Filter className="h-4 w-4" />
              <span className="text-sm">Filtrează proiectele</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {(
                ["Toate", "Landing", "Business", "eCommerce"] as Category[]
              ).map((c) => (
                <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
                  {c}
                </Chip>
              ))}
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {filtered.map((p) => (
              <ProjectCard key={p.id} p={p} />
            ))}
          </div>

          {/* CTA */}
          <section
            id="contact"
            className="mt-16 mb-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 overflow-hidden relative"
          >
            <div className="pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full bg-orange-500/12 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  Vrei un proiect similar?
                </h3>
                <p className="mt-2 text-white/60 max-w-xl">
                  Trimite-mi 2–3 detalii (tip site, domeniu, exemple) și îți
                  răspund cu ofertă + termen.
                </p>
              </div>

              <Link to="/oferta">
                <Button className="bg-orange-500 hover:bg-orange-500/90 text-black rounded-xl px-5 h-10">
                  Cere ofertă
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
