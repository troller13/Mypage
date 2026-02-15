"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    q: "Ce tipuri de site-uri pot să îmi faci?",
    a: "Realizez landing page-uri, site-uri de prezentare pentru afaceri, site-uri de brand personal, portofolii și magazine online. Fiecare site este făcut personalizat, nu din template.",
  },
  {
    q: "În cât timp este gata un site?",
    a: "Un landing page durează de obicei 3–5 zile, un site business 5–10 zile, iar un magazin online 10–14 zile, în funcție de complexitate și conținut.",
  },
  {
    q: "Trebuie să vin cu designul sau textele pregătite?",
    a: "Nu. Te pot ajuta cu structura site-ului, sugestii de texte, layout și design. Dacă ai deja conținut, îl integrăm și îl optimizăm.",
  },
  {
    q: "Site-ul va arăta bine pe telefon?",
    a: "Da. Toate site-urile sunt realizate responsive și optimizate pentru telefon, tabletă și desktop.",
  },
  {
    q: "Poți modifica sau reface un site existent?",
    a: "Da. Pot redesena un site vechi, îl pot moderniza și optimiza pentru viteză, conversii și un aspect profesional.",
  },
  {
    q: "Cum începem colaborarea?",
    a: "Alegi tipul de site dorit, îmi trimiți o scurtă descriere și îți răspund cu o ofertă clară: preț, durată și pașii următori.",
  },
];

export default function WebsiteFaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="relative overflow-hidden py-28 px-4"
      style={{
        backgroundImage: `
      linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.85)),
      url('/images/faq-bg.jpg')
    `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* ===== DECORURI LATERALE (mai discrete) ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-140px] top-24 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute left-[-180px] bottom-24 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute right-[-180px] top-1/3 h-[420px] w-[420px] rounded-full border border-orange-500/15" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* ===== HEADER ===== */}
        <div className="text-center mb-16">
          <h2 className="text-white text-4xl md:text-5xl font-semibold mb-4">
            Întrebări
            <br />
            Frecvente
          </h2>

          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
            Răspunsuri clare despre procesul de creare a unui site web, fără
            complicații sau termeni inutili.
          </p>
        </div>

        {/* ===== FAQ LIST ===== */}
        <div className="border-y border-white/10">
          {faqs.map((item, i) => {
            const isOpen = open === i;

            return (
              <div key={i} className="border-b border-white/10 last:border-b-0">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group w-full text-left py-6 flex items-center justify-between gap-6 focus:outline-none"
                >
                  <span className="text-white text-sm md:text-base font-medium group-hover:text-orange-400 transition-colors">
                    {item.q}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 text-white/50 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-orange-400" : ""
                    }`}
                  />
                </button>

                {/* ANSWER */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-6"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-white/55 text-sm max-w-3xl leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ===== CTA FINAL (fără glow) ===== */}
      </div>
    </section>
  );
}
