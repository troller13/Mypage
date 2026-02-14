"use client";

import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
};

function FloatingInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = " ",
  required,
}: FieldProps) {
  const hasValue = value.trim().length > 0;

  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          "peer w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 pt-5 pb-3",
          "text-white placeholder:text-transparent outline-none",
          "focus:border-orange-500/70 focus:ring-4 focus:ring-orange-500/15",
          "transition",
        ].join(" ")}
      />

      {/* Label care NU dispare pe dark mode */}
      <label
        htmlFor={name}
        className={[
          "pointer-events-none absolute left-4 top-3 origin-left",
          "text-white/60 transition-all",
          "peer-focus:text-orange-300 peer-focus:top-2 peer-focus:scale-90",
          hasValue ? "top-2 scale-90 text-white/65" : "",
        ].join(" ")}
      >
        {label}
      </label>
    </div>
  );
}

type SelectProps = {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
};

function FloatingSelect({
  label,
  name,
  value,
  onChange,
  options,
}: SelectProps) {
  const hasValue = value.trim().length > 0;

  return (
    <div className="relative">
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "peer w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 pt-5 pb-3",
          "text-white outline-none",
          "focus:border-orange-500/70 focus:ring-4 focus:ring-orange-500/15",
          "transition",
        ].join(" ")}
      >
        <option value="" disabled className="bg-black">
          Selectează...
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-black">
            {o}
          </option>
        ))}
      </select>

      <label
        htmlFor={name}
        className={[
          "pointer-events-none absolute left-4 top-3 origin-left",
          "text-white/60 transition-all",
          "peer-focus:text-orange-300 peer-focus:top-2 peer-focus:scale-90",
          hasValue ? "top-2 scale-90 text-white/65" : "",
        ].join(" ")}
      >
        {label}
      </label>
    </div>
  );
}

export default function Oferta() {
  const [sent, setSent] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 18, scale: 0.98 },
      show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" },
      },
    }),
    [],
  );

  return (
    <main className="min-h-screen bg-black text-white px-4 py-24 relative overflow-hidden">
      {/* Background premium */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-44 -left-44 h-[520px] w-[520px] rounded-full bg-orange-500/12 blur-3xl" />
        <div className="absolute -bottom-56 -right-56 h-[620px] w-[620px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Înapoi
        </Link>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="show"
          className="mt-6"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
            <Sparkles className="h-4 w-4 text-orange-300" />
            Cerere ofertă • răspuns rapid
          </div>

          <h1 className="mt-6 text-4xl md:text-5xl font-semibold tracking-tight">
            Cere o ofertă
          </h1>

          <p className="mt-4 text-white/60 leading-relaxed">
            Spune-ne câteva detalii despre proiectul tău și îți răspundem rapid
            cu o ofertă și termen estimativ.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-10 rounded-3xl border border-green-500/30 bg-green-500/10 p-8 relative overflow-hidden"
            >
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-green-500/15 blur-3xl" />

              <div className="relative flex items-start gap-4">
                <CheckCircle2 className="h-7 w-7 text-green-400 mt-0.5" />
                <div>
                  <h3 className="text-2xl font-semibold text-green-300">
                    Mesaj trimis ✅
                  </h3>
                  <p className="mt-2 text-white/70">
                    Îți vom răspunde în cel mai scurt timp.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button
                      onClick={() => setSent(false)}
                      className="bg-white/10 hover:bg-white/15 text-white rounded-xl"
                    >
                      Trimite altă cerere
                    </Button>
                    <Link
                      to="/"
                      className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 h-10 text-white/90 hover:bg-white/10 transition"
                    >
                      Înapoi acasă
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8 relative overflow-hidden"
            >
              {/* glow on card */}
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-orange-500/12 blur-3xl opacity-70" />

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <FloatingInput
                    label="Nume"
                    name="name"
                    value={name}
                    onChange={setName}
                    required
                  />
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <FloatingInput
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    required
                  />
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <FloatingSelect
                    label="Tip proiect"
                    name="projectType"
                    value={projectType}
                    onChange={setProjectType}
                    options={[
                      "Landing Page",
                      "Website Business",
                      "Magazin Online",
                      "Alt tip",
                    ]}
                  />
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  <FloatingSelect
                    label="Buget estimativ"
                    name="budget"
                    value={budget}
                    onChange={setBudget}
                    options={[
                      "Sub 300€",
                      "300€ – 700€",
                      "700€ – 1500€",
                      "1500€+",
                    ]}
                  />
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="md:col-span-2"
                >
                  <div className="relative">
                    <textarea
                      id="details"
                      name="details"
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      rows={5}
                      required
                      placeholder=" "
                      className={[
                        "peer w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 pt-5 pb-3",
                        "text-white outline-none resize-none",
                        "focus:border-orange-500/70 focus:ring-4 focus:ring-orange-500/15",
                        "transition",
                      ].join(" ")}
                    />
                    <label
                      htmlFor="details"
                      className={[
                        "pointer-events-none absolute left-4 top-3 origin-left",
                        "text-white/60 transition-all",
                        "peer-focus:text-orange-300 peer-focus:top-2 peer-focus:scale-90",
                        details.trim().length > 0
                          ? "top-2 scale-90 text-white/65"
                          : "",
                      ].join(" ")}
                    >
                      Detalii proiect
                    </label>
                    <p className="mt-2 text-xs text-white/50">
                      Exemplu: “site pentru restaurant, meniu, rezervări, 5
                      pagini, stil modern.”
                    </p>
                  </div>
                </motion.div>

                <motion.div className="md:col-span-2">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <Button className="w-full bg-orange-500 hover:bg-orange-500/90 text-black h-12 rounded-2xl">
                      Trimite cererea →
                    </Button>
                  </motion.div>

                  <p className="mt-3 text-xs text-white/50 text-center">
                    Prin trimitere ești de acord să te contactăm pe email.
                  </p>
                </motion.div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
