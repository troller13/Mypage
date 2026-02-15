"use client";

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Clienți", value: "20+", labelColor: "text-accent" },
  { label: "Proiecte", value: "30+", labelColor: "text-muted-foreground" },
  {
    label: "Recenzii de 5 stele",
    value: "30+",
    labelColor: "text-muted-foreground",
  },
];

function StatCard({
  label,
  value,
  labelColor,
}: {
  label: string;
  value: string;
  labelColor: string;
}) {
  return (
    <div className="text-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-6 backdrop-blur-sm">
      <div className={`text-sm font-medium mb-2 ${labelColor}`}>{label}</div>
      <div className="text-4xl md:text-5xl font-bold text-white tabular-nums">
        {value}
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
      }}
      className="relative overflow-hidden min-h-screen h-screen flex items-center bg-center bg-cover"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.45)), url('/images/hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header fix */}
      <header className="fixed top-0 left-0 right-0 z-50  border-b border-border/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/images/logo_transparent.png"
              alt="Logo"
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-white hover:text-accent transition-colors"
            >
              Acasă
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-accent transition-colors"
            >
              Despre noi
            </Link>
            <Link
              to="/servicii"
              className="text-white hover:text-accent transition-colors"
            >
              Servicii
            </Link>
            <Link
              to="/portofolio"
              className="text-white hover:text-accent transition-colors"
            >
              Portofoliu
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-accent transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* subtle grain (STATIC) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      {/* STATIC glow (fără motion / blur mare) */}
      <div className="pointer-events-none absolute left-1/2 top-40 h-[420px] w-[680px] -translate-x-1/2 rounded-full blur-2xl bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.10),transparent_60%)]" />

      {/* CONTENT */}
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge (static) */}
          <div className="mb-12 flex items-center justify-center">
            <div className="inline-flex items-center gap-4 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur">
              <div className="flex -space-x-2">
                {[
                  "/images/avatar1.jpg",
                  "/images/avatar2.jpg",
                  "/images/avatar3.jpg",
                  "/images/avatar4.jpg",
                ].map((src, i) => (
                  <div
                    key={i}
                    className="h-7 w-7 overflow-hidden rounded-full border border-white/20 bg-white/10"
                  >
                    <img
                      src={src}
                      alt="Client avatar"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col leading-tight text-left">
                <div className="text-[12px] text-orange-400">★★★★★</div>
                <div className="text-[12px] text-white/70">
                  20+ clienți mulțumiți
                </div>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-white font-semibold tracking-tight text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-6">
            Transformă-ți <span className="text-orange-500">site-ul</span>.
            <br />
            Crește-ți vânzările.
          </h1>

          {/* Subtext */}
          <p className="mt-8 text-white/65 text-base sm:text-lg max-w-2xl mx-auto">
            Realizăm pagini web moderne pentru afaceri și branduri personale:
            rapide, optimizate pentru mobil și construite să aducă cereri și
            vânzări — totul dintr-un design premium.
          </p>

          {/* CTA */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/servicii"
              className="bg-orange-500 hover:bg-orange-500/90 text-white px-8 h-11 text-base rounded-lg"
            >
              Începe acum
            </Link>

            <Link
              to="/about"
              className="border-white/25 text-white hover:bg-white/10 px-8 h-11 text-base rounded-lg"
            >
              Vezi detalii
            </Link>
          </div>

          {/* STATS (static) */}
          <section className="pt-20">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat) => (
                  <StatCard
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    labelColor={stat.labelColor}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
