"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Zap,
  Search,
  PencilRuler,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center">
          <img
            src="/images/logo_transparent.png"
            alt="Logo"
            className="h-12 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white/80 hover:text-white transition">
            Acasă
          </Link>
          <Link
            to="/servicii"
            className="text-white/80 hover:text-white transition"
          >
            Servicii
          </Link>
          <Link
            to="/portofolio"
            className="text-white/80 hover:text-white transition"
          >
            Portofoliu
          </Link>
          <Link
            to="/contact"
            className="text-white/80 hover:text-white transition"
          >
            Contact
          </Link>
          <span className="text-white">Despre noi</span>
        </nav>

        <Link to="/oferta">
          <Button className="bg-orange-500 hover:bg-orange-500/90 text-black rounded-xl px-5 h-10">
            Cere ofertă
          </Button>
        </Link>
      </div>
    </header>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition-colors">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 text-white/80">
        {icon}
      </div>
      <div className="text-white font-semibold">{title}</div>
      <p className="mt-2 text-sm text-white/60 leading-relaxed">{desc}</p>
    </div>
  );
}

function Step({
  nr,
  title,
  desc,
}: {
  nr: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-xl bg-orange-500/15 ring-1 ring-orange-500/25 grid place-items-center">
          <span className="text-orange-300 font-semibold">{nr}</span>
        </div>
        <div>
          <div className="text-white font-semibold">{title}</div>
          <p className="mt-2 text-sm text-white/60 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative overflow-hidden pt-28 md:pt-32 pb-12 px-4">
        {/* background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-orange-500/12 blur-3xl" />
          <div className="absolute -bottom-56 -right-56 h-[620px] w-[620px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:70px_70px]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* HERO */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Website-uri moderne • rapide • orientate spre rezultate
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight">
              Despre noi
              <br />
              construim site-uri care vând.
            </h1>

            <p className="mt-5 text-white/60 max-w-2xl mx-auto">
              Suntem un studio focusat pe design premium și performanță.
              Combinăm estetică, structură clară și optimizare pentru conversii,
              ca să obții mai multe cereri și vânzări.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/portofolio" className="inline-flex">
                <Button className="bg-orange-500 hover:bg-orange-500/90 text-black rounded-xl px-7 h-11">
                  Vezi portofoliu →
                </Button>
              </Link>

              <Link to="/oferta">
                <Button className="bg-orange-500 hover:bg-orange-500/90 text-black rounded-xl px-5 h-10">
                  Cere ofertă
                </Button>
              </Link>
            </div>
          </div>

          {/* VALUES / WHY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Feature
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Calitate și responsabilitate"
              desc="Lucrăm curat, cu structură clară, livrare la timp și comunicare transparentă."
            />
            <Feature
              icon={<Zap className="h-5 w-5" />}
              title="Viteză și performanță"
              desc="Optimizăm pentru încărcare rapidă, experiență bună pe mobil și scoruri solide."
            />
            <Feature
              icon={<Search className="h-5 w-5" />}
              title="SEO & structură"
              desc="Setăm baza: titluri, structură, indexare și pagini gândite pentru căutări."
            />
          </div>

          {/* STORY + POINTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mb-12">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <h2 className="text-2xl font-semibold">Cum lucrăm</h2>
              <p className="mt-3 text-white/60 leading-relaxed">
                Ne concentrăm pe lucruri care contează: mesaj clar, CTA-uri
                vizibile, structură logică și design premium. Fiecare secțiune
                are un scop: să explice rapid, să creeze încredere și să
                transforme vizitatorii în clienți.
              </p>

              <div className="mt-6 space-y-3 text-sm text-white/70">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-orange-400 mt-0.5" />
                  <span>
                    Layout-uri curate + tipografie serioasă (brand-ready).
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-orange-400 mt-0.5" />
                  <span>
                    Structură care explică rapid: ce faci, pentru cine, de ce
                    tu.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-orange-400 mt-0.5" />
                  <span>
                    Optimizare pentru mobil + performanță (fără “bloat”).
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8 overflow-hidden relative">
              <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange-500/12 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

              <h2 className="text-2xl font-semibold relative z-10">
                Ce primești, concret
              </h2>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <div className="text-white font-semibold">Design premium</div>
                  <div className="mt-2 text-sm text-white/60">
                    Stil modern, consistent, potrivit nișei tale.
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <div className="text-white font-semibold">Conversii</div>
                  <div className="mt-2 text-sm text-white/60">
                    CTA-uri, secțiuni de încredere, flow clar.
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <div className="text-white font-semibold">SEO de bază</div>
                  <div className="mt-2 text-sm text-white/60">
                    Structură, meta, indexare și pagini corecte.
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <div className="text-white font-semibold">Suport</div>
                  <div className="mt-2 text-sm text-white/60">
                    Revizii, mici ajustări și recomandări.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PROCESS */}
          <div className="mb-12">
            <div className="flex items-end justify-between gap-6 mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Procesul nostru</h2>
                <p className="mt-2 text-white/60">
                  Simplu, clar și fără complicații.
                </p>
              </div>

              <Link
                to="/servicii"
                className="hidden md:inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition"
              >
                Vezi pachete <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Step
                nr="1"
                title="Brief & obiective"
                desc="Stabilim ce vinzi, cui te adresezi, ce vrei să obții și ce secțiuni sunt necesare."
              />
              <Step
                nr="2"
                title="Design & structură"
                desc="Creăm layout-ul: tipografie, culori, secțiuni, CTA-uri și elemente de încredere."
              />
              <Step
                nr="3"
                title="Dezvoltare & optimizare"
                desc="Implementăm site-ul, optimizăm pentru mobil, viteză și structură SEO."
              />
              <Step
                nr="4"
                title="Livrare & ajustări"
                desc="Facem revizii, finisăm detaliile și livrăm un site gata de folosit."
              />
            </div>
          </div>

          {/* CTA */}
          <section className="mt-16 mb-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 overflow-hidden relative">
            <div className="pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full bg-orange-500/12 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  Vrei să-ți facem o ofertă?
                </h3>
                <p className="mt-2 text-white/60 max-w-xl">
                  Spune-ne tipul site-ului, domeniul și câteva exemple. Îți
                  răspundem cu preț + termen.
                </p>
              </div>

              <Link to="/contact" className="inline-flex">
                <Button className="bg-orange-500 hover:bg-orange-500/90 text-black rounded-xl px-8 h-11">
                  Contactează-ne →
                </Button>
              </Link>
            </div>
          </section>

          {/* mini footer */}
          <div className="pb-8 text-center text-xs text-white/40">
            © {new Date().getFullYear()} NOVA WEB • Toate drepturile rezervate
          </div>
        </div>
      </section>
    </main>
  );
}
