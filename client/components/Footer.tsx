import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/10 py-12 px-4">
      <div className="container mx-auto">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h4 className="text-white font-bold mb-4">About Us</h4>
            <p className="text-muted-foreground text-sm">
              We are a team of designers, engineers, and AI enthusiasts that empower creatives to turn imagined ideas into high-impact creative work.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Useful Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-accent text-sm hover:text-accent/80 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-accent text-sm hover:text-accent/80 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-accent text-sm hover:text-accent/80 transition-colors"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-accent text-sm hover:text-accent/80 transition-colors"
                >
                  Phones
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-white font-bold mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground text-sm hover:text-white transition-colors"
                >
                  Customer Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground text-sm hover:text-white transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground text-sm hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground text-sm hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-bold mb-4">Connect With Us</h4>
            <p className="text-muted-foreground text-sm mb-4">
              27 Division St, New York <br />
              NY 10002, USA
            </p>
            <p className="text-muted-foreground text-sm mb-4">
              +123 456 2025
            </p>
            <p className="text-muted-foreground text-sm">
              username@email.com
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="text-accent hover:text-accent/80 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-accent hover:text-accent/80 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-accent hover:text-accent/80 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="text-accent hover:text-accent/80 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-muted-foreground text-sm">
            © 2025 All Rights Reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-muted-foreground text-sm hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-muted-foreground text-sm hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-muted-foreground text-sm hover:text-white transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
