"use client";

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
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
          <span className="text-white">Contact</span>
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

function InfoCard({
  icon,
  title,
  value,
  hint,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  hint?: string;
  href?: string;
}) {
  const Content = (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition-colors">
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10 text-white/80">
        {icon}
      </div>
      <div className="text-white font-semibold">{title}</div>
      <div className="mt-1 text-white/70">{value}</div>
      {hint && <div className="mt-2 text-xs text-white/45">{hint}</div>}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block" target="_blank" rel="noreferrer">
        {Content}
      </a>
    );
  }

  return Content;
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Controlled fields (ca să poți reseta ușor)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [websiteType, setWebsiteType] = useState("");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);
    setError(null);

    try {
      await emailjs.sendForm(
        "service_i77co7e",
        "template_l2x5v2m",
        formRef.current,
        { publicKey: "k6Uzuao4KTBw0SnxL" },
      );

      setSent(true);
      formRef.current.reset();

      // reset state
      setName("");
      setEmail("");
      setPhone("");
      setWebsiteType("");
      setMessage("");
    } catch (err: any) {
      console.log("EmailJS ERROR:", err?.status, err?.text, err);
      setError(
        err?.text ? `Eroare: ${err.text}` : "Nu s-a putut trimite. Reîncearcă.",
      );
    } finally {
      setSending(false);
    }
  }

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
              Răspund de obicei în 1–24h
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight">
              Contact
              <br />
              spune-ne ce ai nevoie și începem.
            </h1>

            <p className="mt-5 text-white/60 max-w-2xl mx-auto">
              Trimite un mesaj cu tipul site-ului, domeniul tău și câteva
              exemple de site-uri care îți plac. Îți răspund cu ofertă + termen.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/069960179"
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
              >
                <Button className="bg-orange-500 hover:bg-orange-500/90 text-black rounded-xl px-7 h-11">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </a>

              <a
                href="mailto:dumitruarbuz9@gmail.com"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 h-11 text-white/90 hover:bg-white/10 transition"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </a>

              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 h-11 text-white/90 hover:bg-white/10 transition"
              >
                Înapoi acasă
              </Link>
            </div>
          </div>

          {/* INFO CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <InfoCard
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              value="dumitruarbuz9@gmail.com"
              hint="Click pentru a trimite email"
              href="mailto:dumitruarbuz9@gmail.com"
            />
            <InfoCard
              icon={<Phone className="h-5 w-5" />}
              title="Telefon"
              value="+373 699 60 179"
              hint="Click pentru apel"
              href="tel:+37369960179"
            />
            <InfoCard
              icon={<Clock className="h-5 w-5" />}
              title="Program"
              value="Luni – Duminică"
              hint="10:00 – 19:00"
            />
          </div>

          {/* FORM + MAP */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* FORM */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Trimite cererea</h2>
                <p className="mt-2 text-white/60 text-sm">
                  Completează câmpurile de mai jos.
                </p>
              </div>

              {sent ? (
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-5 text-green-200">
                  Mesaj trimis ✅ Îți răspund în cel mai scurt timp.
                  <div className="mt-4">
                    <Button
                      onClick={() => {
                        setSent(false);
                        setError(null);
                      }}
                      className="bg-white/10 hover:bg-white/15 text-white rounded-xl"
                    >
                      Trimite alt mesaj
                    </Button>
                  </div>
                </div>
              ) : (
                <form ref={formRef} onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-11 rounded-xl bg-black/40 border border-white/10 px-4 text-white placeholder:text-white/30 outline-none focus:border-orange-500/50"
                      placeholder="Nume / Brand"
                    />
                    <input
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11 rounded-xl bg-black/40 border border-white/10 px-4 text-white placeholder:text-white/30 outline-none focus:border-orange-500/50"
                      placeholder="Email"
                    />
                    <input
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-11 rounded-xl bg-black/40 border border-white/10 px-4 text-white placeholder:text-white/30 outline-none focus:border-orange-500/50"
                      placeholder="Telefon (opțional)"
                    />
                    <input
                      name="websiteType"
                      value={websiteType}
                      onChange={(e) => setWebsiteType(e.target.value)}
                      required
                      className="h-11 rounded-xl bg-black/40 border border-white/10 px-4 text-white placeholder:text-white/30 outline-none focus:border-orange-500/50"
                      placeholder="Tip website (Landing / Business / Shop)"
                    />
                  </div>

                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="mt-4 min-h-[130px] w-full rounded-xl bg-black/40 border border-white/10 p-4 text-white placeholder:text-white/30 outline-none focus:border-orange-500/50"
                    placeholder="Descrie pe scurt ce vrei: pagini, funcții, exemple de site-uri, deadline etc."
                  />

                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      disabled={sending}
                      className="bg-orange-500 hover:bg-orange-500/90 text-black rounded-xl px-7 h-11 disabled:opacity-70"
                    >
                      {sending ? "Se trimite..." : "Trimite →"}
                    </Button>

                    <a
                      href="https://wa.me/069960179"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 h-11 text-white/90 hover:bg-white/10 transition"
                    >
                      Scrie pe WhatsApp <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </div>

                  {error && (
                    <div className="mt-4 text-xs text-red-400">{error}</div>
                  )}

                  <div className="mt-4 text-xs text-white/45">
                    Sugestie: atașează 1–2 exemple de site-uri și spui ce îți
                    place la ele (culori, stil, structură).
                  </div>
                </form>
              )}
            </div>

            {/* MAP / LOCATION (placeholder) */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-300" />
                <h3 className="text-xl font-semibold">Locație</h3>
              </div>
              <p className="text-white/60 text-sm">
                Lucrez remote (Moldova) – poți să-mi scrii oricând și stabilim
                detaliile.
              </p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-white/60 text-sm">
                (opțional) Poți pune aici o hartă Google Maps embed.
              </div>
            </div>
          </div>

          {/* FOOTER CTA */}
          <section className="mt-16 mb-10 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 overflow-hidden relative">
            <div className="pointer-events-none absolute -top-28 -right-28 h-80 w-80 rounded-full bg-orange-500/12 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-white">
                  Vrei să începem chiar azi?
                </h3>
                <p className="mt-2 text-white/60 max-w-xl">
                  Trimite-mi un mesaj cu tipul site-ului + buget aproximativ și
                  îți fac o propunere clară.
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
