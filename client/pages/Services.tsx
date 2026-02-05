"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BadgeCheck,
  ShoppingBag,
  Globe,
  Zap,
  Search,
  Layout,
  ShieldCheck,
} from "lucide-react";

type Service = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  badge?: string;
  highlighted?: boolean;
  items: string[];
};

const services: Service[] = [
  {
    title: "Landing Page",
    subtitle: "Perfect pentru reclame și conversii rapide.",
    icon: <Layout className="h-5 w-5" />,
    items: [
      "1 pagină: Hero + Servicii + Testimoniale + Contact",
      "Design premium (mobile-first)",
      "CTA-uri clare + integrare WhatsApp/Instagram",
      "SEO basic + viteze bune",
    ],
  },
  {
    title: "Website Business",
    subtitle: "Imagine profesională pentru companie și servicii.",
    icon: <Globe className="h-5 w-5" />,
    badge: "Recomandat",
    highlighted: true,
    items: [
      "3–6 pagini (Acasă, Servicii, Despre, Portofoliu, Contact)",
      "Structură UX modernă + navigare clară",
      "Optimizare performanță + responsive complet",
      "SEO on-page + setare indexare Google",
    ],
  },
  {
    title: "Magazin Online",
    subtitle: "Vânzări online, produse, comenzi, checkout.",
    icon: <ShoppingBag className="h-5 w-5" />,
    items: [
      "Catalog produse + categorii",
      "Coș + pagină de comandă (configurabil)",
      "Comenzi pe email sau integrare plăți (opțional)",
      "Pagini: livrare, retur, FAQ",
    ],
  },
];

function Navbar() {
  return (
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
          <span className="text-white">Servicii</span>
          <a
            href="#proces"
            className="text-white/80 hover:text-white transition-colors"
          >
            Proces
          </a>
          <a
            href="#intrebari"
            className="text-white/80 hover:text-white transition-colors"
          >
            Întrebări
          </a>
        </nav>

        <Button className="bg-orange-500 hover:bg-orange-500/90 text-black rounded-xl px-5 h-10">
          Cere ofertă
        </Button>
      </div>
    </header>
  );
}

function Card({ s }: { s: Service }) {
  return (
    <div
      className={[
        "group relative overflow-hidden rounded-2xl border",
        s.highlighted
          ? "border-orange-500/40 bg-white/[0.05]"
          : "border-white/10 bg-white/[0.03]",
        "p-8 transition-transform duration-300 hover:-translate-y-1",
      ].join(" ")}
    >
      {/* glow */}
      <div className="pointer-events-none absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* header */}
      <div className="relative z-10 mb-6 flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div
            className={[
              "grid h-11 w-11 place-items-center rounded-xl ring-1",
              s.highlighted
                ? "bg-orange-500/10 ring-orange-500/30 text-orange-300"
                : "bg-white/5 ring-white/10 text-white/80",
            ].join(" ")}
          >
            {s.icon}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white">{s.title}</h3>
            <p className="mt-1 text-sm text-white/60">{s.subtitle}</p>
          </div>
        </div>

        {s.badge && (
          <span className="shrink-0 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-black">
            {s.badge}
          </span>
        )}
      </div>

      {/* list */}
      <ul className="relative z-10 space-y-3 text-sm text-white/70">
        {s.items.map((it) => (
          <li key={it} className="flex items-start gap-3">
            <BadgeCheck className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
            <span>{it}</span>
          </li>
        ))}
      </ul>

      {/* footer */}
      <div className="relative z-10 mt-8">
        <div
          className={[
            "inline-flex w-full items-center justify-between rounded-xl px-5 py-3 text-sm font-semibold",
            s.highlighted
              ? "bg-orange-500 text-black hover:bg-orange-500/90"
              : "bg-white/5 text-white hover:bg-white/10",
            "transition-colors",
          ].join(" ")}
        >
          Alege {s.title}
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>

      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:60px_60px]" />
    </div>
  );
}

function Process() {
  const steps = [
    {
      title: "1) Brief rapid",
      desc: "Îți pun 3–5 întrebări ca să înțeleg obiectivul și stilul dorit.",
      icon: <Search className="h-5 w-5" />,
    },
    {
      title: "2) Design & structură",
      desc: "Îți propun layout-ul și textele. Ajustăm până e perfect.",
      icon: <Layout className="h-5 w-5" />,
    },
    {
      title: "3) Implementare",
      desc: "Construiesc site-ul, îl optimizez pentru viteză și mobil.",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      title: "4) Livrare & suport",
      desc: "Îl publicăm online și primești suport pentru mici ajustări.",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
  ];

  return (
    <section id="proces" className="mt-20">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Proces simplu, rezultat premium
        </h2>
        <p className="mt-3 text-white/60 max-w-2xl">
          Totul este gândit să fie rapid și clar: tu trimiți detaliile, eu îți
          livrez un website modern, optimizat și ușor de folosit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition-colors"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 text-white/80">
              {s.icon}
            </div>
            <div className="text-white font-semibold">{s.title}</div>
            <div className="mt-2 text-sm text-white/60">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "În cât timp este gata site-ul?",
      a: "De obicei 2–7 zile, în funcție de complexitate și cât de repede primesc materialele (logo, texte, poze).",
    },
    {
      q: "Pot cere modificări?",
      a: "Da. Primești revizii pe design/texte. Scopul e să rămâi 100% mulțumit.",
    },
    {
      q: "Site-ul va fi rapid pe mobil?",
      a: "Da. Facem mobile-first + optimizare pentru performanță (imagini, încărcare, structură).",
    },
    {
      q: "Mă ajuți cu domeniu și publicare?",
      a: "Da. Te ajut cu domeniul, hosting-ul și publicarea finală.",
    },
  ];

  return (
    <section id="intrebari" className="mt-20">
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          Întrebări frecvente
        </h2>
        <p className="mt-3 text-white/60 max-w-2xl">
          Dacă ai nevoie de ceva specific, îmi scrii și îți răspund rapid.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <summary className="cursor-pointer list-none text-white font-semibold flex items-center justify-between">
              {f.q}
              <span className="text-white/60 group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-white/60">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-28 md:pt-32 pb-14 px-4">
        {/* background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-orange-500/12 blur-3xl" />
          <div className="absolute -bottom-56 -right-56 h-[620px] w-[620px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:70px_70px]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Răspund de obicei în 1–24h
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight text-white">
              Servicii pentru un website modern
              <br />
              care aduce rezultate.
            </h1>

            <p className="mt-5 text-white/60 max-w-2xl mx-auto">
              Landing page, website business sau magazin online — construit
              rapid, optimizat pentru mobil și pregătit pentru conversii.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-orange-500 hover:bg-orange-500/90 text-black rounded-xl px-7 h-11">
                Cere ofertă →
              </Button>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 h-11 text-white/90 hover:bg-white/10 transition"
              >
                Înapoi acasă
              </Link>
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {services.map((s) => (
              <Card key={s.title} s={s} />
            ))}
          </div>

          <Process />
          <FAQ />

          {/* FINAL CTA */}
          <section className="mt-20 mb-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 overflow-hidden relative">
            <div className="pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full bg-orange-500/12 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  Vrei să începem?
                </h3>
                <p className="mt-2 text-white/60 max-w-xl">
                  Spune-mi ce tip de website vrei și îți răspund cu o ofertă
                  personalizată (preț + termen).
                </p>
              </div>

              <form
                action="https://formsubmit.co/dumitruarbuz9@gmail.com"
                method="POST"
                className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
              >
                {/* setări FormSubmit */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input
                  type="hidden"
                  name="_subject"
                  value="Cerere nouă - Website"
                />
                {/* după trimitere, redirecționează la o pagină de mulțumire */}
                <input
                  type="hidden"
                  name="_next"
                  value={`${window.location.origin}/multumesc`}
                />

                {/* câmpuri */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="Nume"
                    required
                    className="h-11 rounded-xl bg-black/40 border border-white/10 px-4 text-white placeholder:text-white/30 outline-none focus:border-orange-500/50"
                    placeholder="Nume / Brand"
                  />

                  <input
                    name="Email"
                    type="email"
                    required
                    className="h-11 rounded-xl bg-black/40 border border-white/10 px-4 text-white placeholder:text-white/30 outline-none focus:border-orange-500/50"
                    placeholder="Email"
                  />

                  <input
                    name="Telefon"
                    className="h-11 rounded-xl bg-black/40 border border-white/10 px-4 text-white placeholder:text-white/30 outline-none focus:border-orange-500/50"
                    placeholder="Telefon (opțional)"
                  />

                  <select
                    name="Tip site"
                    required
                    className="h-11 rounded-xl bg-black/40 border border-white/10 px-4 text-white outline-none focus:border-orange-500/50"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Alege tipul de website
                    </option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="Website Business">Website Business</option>
                    <option value="Magazin Online">Magazin Online</option>
                    <option value="Portofoliu">Portofoliu</option>
                  </select>
                </div>

                <textarea
                  name="Mesaj"
                  required
                  className="mt-4 min-h-[130px] w-full rounded-xl bg-black/40 border border-white/10 p-4 text-white placeholder:text-white/30 outline-none focus:border-orange-500/50"
                  placeholder="Descrie pe scurt ce vrei: pagini, funcții, exemple, buget, termen..."
                />

                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-orange-500 hover:bg-orange-500/90 text-black rounded-xl px-8 h-11 font-semibold"
                  >
                    Trimite cererea →
                  </button>
                </div>

                <div className="mt-3 text-xs text-white/45">
                  După prima trimitere, FormSubmit îți va cere să confirmi
                  emailul (o singură dată).
                </div>
              </form>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
