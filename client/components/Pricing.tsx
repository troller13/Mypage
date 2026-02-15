"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import emailjs from "@emailjs/browser";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";

type Package = {
  name: string;
  short: string;
  priceText?: string;
  badge?: string;
  highlighted?: boolean;
  features: string[];
};

const headerV: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
  },
};

const gridV: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.12 },
  },
};

const cardV: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.99, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function WebsiteRequestSection() {
  const [mode, setMode] = useState<"business" | "personal">("business");
  const [selected, setSelected] = useState<string>("Landing Page");
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  // form states
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const packages = useMemo<Package[]>(() => {
    if (mode === "business") {
      return [
        {
          name: "Landing Page",
          short: "Perfect pentru promovare rapidă + conversii.",
          priceText: "Ideal pentru: ads, servicii",
          features: [
            "1 pagină (Hero, Servicii, Testimoniale, Contact)",
            "Design premium (mobile-first)",
            "Formular de contact + WhatsApp/IG link",
            "SEO basic + viteză bună",
          ],
        },
        {
          name: "Website Business",
          short: "Site complet pentru firmă, prezentare serioasă.",
          badge: "Recomandat",
          highlighted: true,
          priceText: "Ideal pentru: companii, servicii",
          features: [
            "3–6 pagini (Acasă, Servicii, Despre, Portofoliu, Contact)",
            "Structură clară + UX modern",
            "Optimizare performanță",
            "SEO on-page + Google indexing setup",
            "Integrare formulare (Email) + mapă",
          ],
        },
        {
          name: "Magazin Online",
          short: "Vânzări online, produse, coș, comenzi.",
          priceText: "Ideal pentru: eCommerce",
          features: [
            "Catalog produse + categorii",
            "Coș + checkout (configurabil)",
            "Integrare plăți (opțional) / comenzi pe email",
            "Admin produse (opțional)",
            "Pagini: livrare, retur, FAQ",
          ],
        },
      ];
    }

    return [
      {
        name: "Portofoliu",
        short: "Pentru creatori, designeri, freelanceri.",
        priceText: "Ideal pentru: CV & proiecte",
        features: [
          "Secțiuni: Despre, Proiecte, Skill-uri, Contact",
          "Design premium + animații subtile",
          "Link către social media",
          "SEO basic",
        ],
      },
      {
        name: "Personal Brand",
        short: "Prezență puternică, credibilitate + lead-uri.",
        badge: "Recomandat",
        highlighted: true,
        priceText: "Ideal pentru: coaches, SMM",
        features: [
          "1–4 pagini + CTA-uri clare",
          "Testimoniale + rezultate",
          "Formular + calendar link (opțional)",
          "Optimizare performanță",
        ],
      },
      {
        name: "Blog / News",
        short: "Articole, conținut, postări regulate.",
        priceText: "Ideal pentru: conținut",
        features: [
          "Listă articole + pagină articol",
          "Categorii / tag-uri (opțional)",
          "SEO structurat (basic)",
          "Design curat, ușor de citit",
        ],
      },
    ];
  }, [mode]);

  // ✅ dacă selected nu există în noul mode, selectăm automat prima opțiune
  const safeSelected = useMemo(() => {
    const exists = packages.some((p) => p.name === selected);
    return exists ? selected : (packages[0]?.name ?? selected);
  }, [packages, selected]);

  // parallax for background glows
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 90, damping: 26, mass: 1.1 });
  const smy = useSpring(my, { stiffness: 90, damping: 26, mass: 1.1 });
  const glowX = useTransform(smx, [-0.5, 0.5], reduce ? [0, 0] : [-18, 18]);
  const glowY = useTransform(smy, [-0.5, 0.5], reduce ? [0, 0] : [-14, 14]);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(clamp(px, -0.5, 0.5));
    my.set(clamp(py, -0.5, 0.5));
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // ✅ submit email
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);
    setSent(false);
    setErr(null);

    try {
      // IMPORTANT: pune PUBLIC KEY-ul tău aici
      // Îl găsești în EmailJS: Account -> Public Key
      await emailjs.sendForm(
        "service_i77co7e",
        "template_l2x5v2m",
        formRef.current,
        { publicKey: "k6Uzuao4KTBw0SnxL" },
      );

      setSent(true);
      formRef.current.reset();
    } catch (error) {
      setErr("Nu s-a putut trimite cererea. Încearcă din nou.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative overflow-hidden py-24 px-4 bg-center bg-cover"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.85)),
          url('/images/pricing-bg.png')
        `,
      }}
    >
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-3xl"
          style={{ x: glowX, y: glowY }}
          animate={
            reduce
              ? undefined
              : { opacity: [0.45, 0.8, 0.45], scale: [1, 1.04, 1] }
          }
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-3xl"
          style={{ x: glowX, y: glowY }}
          animate={
            reduce
              ? undefined
              : { opacity: [0.35, 0.65, 0.35], scale: [1, 1.03, 1] }
          }
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 opacity-70 [background:radial-gradient(900px_420px_at_40%_30%,rgba(255,120,40,0.14),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* HEADER */}
        <motion.div
          variants={headerV}
          initial="hidden"
          animate="show"
          className="text-center mb-12"
        >
          <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight mb-4">
            Spune-mi ce site vrei
            <br />
            și îți fac o ofertă
          </h2>

          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            Alege tipul de pagină pe care îl dorești. După aceea completezi 2–3
            detalii și îți răspund cu preț + termen.
          </p>

          {/* TOGGLE */}
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => {
                setMode("business");
                setSelected((prev) =>
                  prev === "Landing Page" ||
                  prev === "Website Business" ||
                  prev === "Magazin Online"
                    ? prev
                    : "Landing Page",
                );
              }}
              className={`px-5 py-2 rounded-full text-sm transition ${
                mode === "business"
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Business
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("personal");
                setSelected((prev) =>
                  prev === "Portofoliu" ||
                  prev === "Personal Brand" ||
                  prev === "Blog / News"
                    ? prev
                    : "Personal Brand",
                );
              }}
              className={`px-5 py-2 rounded-full text-sm transition ${
                mode === "personal"
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Personal
            </button>
          </div>
        </motion.div>

        {/* CARDS */}
        <motion.div
          key={mode}
          variants={gridV}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {packages.map((p) => {
            const isActive = safeSelected === p.name;

            return (
              <motion.button
                key={p.name}
                type="button"
                variants={cardV}
                onClick={() => setSelected(p.name)}
                whileHover={reduce ? undefined : { y: -4 }}
                whileTap={{ scale: 0.99 }}
                className="relative text-left rounded-2xl focus:outline-none"
              >
                <div
                  className={`relative rounded-2xl border transition-all overflow-hidden ${
                    p.highlighted
                      ? "border-orange-500/60 bg-white/[0.04] md:scale-[1.04]"
                      : "border-white/10 bg-white/[0.03]"
                  } ${
                    isActive
                      ? "ring-2 ring-orange-500/30"
                      : "hover:border-orange-500/30"
                  }`}
                >
                  <div className="p-8 h-full relative overflow-hidden">
                    <motion.div
                      className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl"
                      animate={
                        reduce
                          ? undefined
                          : isActive
                            ? {
                                opacity: [0.12, 0.28, 0.12],
                                scale: [1, 1.06, 1],
                              }
                            : { opacity: [0.08, 0.14, 0.08] }
                      }
                      transition={{
                        duration: 3.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    <div className="mb-6 relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <h3
                          className={`text-xl font-semibold ${
                            p.highlighted ? "text-orange-400" : "text-white"
                          }`}
                        >
                          {p.name}
                        </h3>

                        {p.badge && (
                          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-500 text-black">
                            {p.badge}
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-white/60 mb-4">{p.short}</p>
                      <div className="text-white/80 text-sm">
                        {p.priceText ?? "—"}
                      </div>
                    </div>

                    <div className="relative z-10">
                      <p className="text-xs font-semibold text-white/40 uppercase mb-4">
                        Ce includ
                      </p>
                      <ul className="space-y-3">
                        {p.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-3 text-sm text-white/65"
                          >
                            <Check className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 relative z-10">
                      <div
                        className={`inline-flex items-center justify-center w-full rounded-full px-5 py-3 text-sm font-semibold transition ${
                          p.highlighted
                            ? "bg-orange-500 text-black hover:bg-orange-500/90"
                            : "bg-white/5 text-white hover:bg-white/10"
                        }`}
                      >
                        Alege {p.name} →
                      </div>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* REQUEST FORM (EmailJS) */}
        <motion.form
          ref={formRef}
          onSubmit={onSubmit}
          variants={headerV}
          initial="hidden"
          animate="show"
          className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
        >
          {/* trimitem tipul selectat */}
          <input type="hidden" name="tip_selectat" value={safeSelected} />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-white font-semibold text-lg">
                Cerere ofertă
              </div>
              <div className="text-white/60 text-sm mt-1">
                Tip selectat:{" "}
                <span className="text-orange-400 font-medium">
                  {safeSelected}
                </span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={sending}
              className="rounded-full bg-orange-500 text-black hover:bg-orange-500/90 px-7 h-11 disabled:opacity-70"
            >
              {sending ? "Se trimite..." : "Trimite cererea →"}
            </Button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="nume_brand"
              required
              className="h-11 rounded-xl bg-black/40 border border-white/10 px-4 text-white placeholder:text-white/30 outline-none focus:border-orange-500/50 transition"
              placeholder="Nume / Brand"
            />
            <input
              name="instagram_website"
              className="h-11 rounded-xl bg-black/40 border border-white/10 px-4 text-white placeholder:text-white/30 outline-none focus:border-orange-500/50 transition"
              placeholder="Instagram / Website (dacă ai)"
            />
            <input
              name="buget"
              className="h-11 rounded-xl bg-black/40 border border-white/10 px-4 text-white placeholder:text-white/30 outline-none focus:border-orange-500/50 transition"
              placeholder="Buget aproximativ (opțional)"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="email"
              type="email"
              required
              className="h-11 rounded-xl bg-black/40 border border-white/10 px-4 text-white placeholder:text-white/30 outline-none focus:border-orange-500/50 transition"
              placeholder="Email"
            />
            <input
              name="telefon"
              className="h-11 rounded-xl bg-black/40 border border-white/10 px-4 text-white placeholder:text-white/30 outline-none focus:border-orange-500/50 transition"
              placeholder="Telefon (opțional)"
            />
          </div>

          <div className="mt-4">
            <textarea
              name="mesaj"
              required
              className="min-h-[110px] w-full rounded-xl bg-black/40 border border-white/10 p-4 text-white placeholder:text-white/30 outline-none focus:border-orange-500/50 transition"
              placeholder="Descrie pe scurt: ce pagini vrei, exemple de site-uri care îți plac, ce vrei să apară pe site etc."
            />
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-white/45">
            Răspund de obicei în 1–24h
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>

          {/* feedback */}
          {sent && (
            <div className="mt-4 text-sm text-green-400">
              Cererea a fost trimisă cu succes ✅
            </div>
          )}
          {err && <div className="mt-4 text-sm text-red-400">{err}</div>}
        </motion.form>
      </div>
    </section>
  );
}
