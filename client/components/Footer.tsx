import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-4 py-12">
      {/* glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-56 -right-56 h-[620px] w-[620px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/images/logo_transparent.png"
                alt="Logo"
                className="h-10 w-auto"
              />
              <span className="text-white font-semibold tracking-tight">
                Web Studio
              </span>
            </Link>

            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              Realizez site-uri moderne (Landing, Business, Magazin Online) cu
              design premium, viteză bună și formulare care trimit direct pe
              email.
            </p>

            <div className="mt-4 flex gap-3">
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/80 hover:text-white hover:border-orange-500/30 transition"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/80 hover:text-white hover:border-orange-500/30 transition"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/80 hover:text-white hover:border-orange-500/30 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link-uri */}
          <div>
            <h4 className="text-white font-semibold mb-4">Link-uri</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-white/60 hover:text-white transition"
                >
                  Acasă
                </Link>
              </li>
              <li>
                <Link
                  to="/servicii"
                  className="text-white/60 hover:text-white transition"
                >
                  Servicii
                </Link>
              </li>
              <li>
                <Link
                  to="/portofolio"
                  className="text-white/60 hover:text-white transition"
                >
                  Portofoliu
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/60 hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/oferta"
                  className="text-orange-400 hover:text-orange-300 transition font-medium"
                >
                  Cere ofertă →
                </Link>
              </li>
            </ul>
          </div>

          {/* Servicii */}
          <div>
            <h4 className="text-white font-semibold mb-4">Servicii</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Landing Page (conversii + ads)</li>
              <li>Website Business (3–6 pagini)</li>
              <li>Magazin Online (catalog + comenzi)</li>
              <li>SEO basic + performanță</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>

            <div className="space-y-3 text-sm">
              <a
                href="tel:+37369960179"
                className="flex items-center gap-2 text-white/60 hover:text-white transition"
              >
                <Phone className="h-4 w-4 text-orange-400" />
                +373 699 60 179
              </a>

              <a
                href="mailto:dumitruarbuz9@gmail.com"
                className="flex items-center gap-2 text-white/60 hover:text-white transition"
              >
                <Mail className="h-4 w-4 text-orange-400" />
                dumitruarbuz9@gmail.com
              </a>

              <div className="flex items-start gap-2 text-white/60">
                <MapPin className="h-4 w-4 text-orange-400 mt-0.5" />
                Moldova • lucrez remote
              </div>
            </div>

            <a
              href="https://wa.me/37369960179"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 h-10 text-sm font-semibold text-black hover:bg-orange-500/90 transition"
            >
              Scrie pe WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/45 text-sm">
            © {new Date().getFullYear()} Dumitru Arbuz. Toate drepturile
            rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
}
