"use client";

import React, { useMemo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useScroll,
} from "framer-motion";

type Feature = {
  title: string;
  description: string;
  span: string; // tailwind grid spans
  glowPos: "br" | "bl";
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22, scale: 0.985, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function TiltCard({
  title,
  description,
  glowPos,
  className,
}: {
  title: string;
  description: string;
  glowPos: "br" | "bl";
  className: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  // mouse-driven tilt + highlight
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotX = useTransform(my, [-0.5, 0.5], reduce ? [0, 0] : [10, -10]);
  const rotY = useTransform(mx, [-0.5, 0.5], reduce ? [0, 0] : [-10, 10]);

  const sRotX = useSpring(rotX, { stiffness: 180, damping: 18, mass: 0.6 });
  const sRotY = useSpring(rotY, { stiffness: 180, damping: 18, mass: 0.6 });

  // specular highlight position (in %)
  const hx = useTransform(mx, [-0.5, 0.5], ["20%", "80%"]);
  const hy = useTransform(my, [-0.5, 0.5], ["20%", "80%"]);

  // shimmer sweep
  const shimmerX = useTransform(mx, [-0.5, 0.5], ["-30%", "30%"]);

  // magnetic arrow offset
  const arrowX = useTransform(mx, [-0.5, 0.5], reduce ? [0, 0] : [-6, 6]);
  const arrowY = useTransform(my, [-0.5, 0.5], reduce ? [0, 0] : [-6, 6]);
  const sArrowX = useSpring(arrowX, { stiffness: 260, damping: 18 });
  const sArrowY = useSpring(arrowY, { stiffness: 260, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
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

  return (
    <motion.div
      ref={ref}
      variants={item}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={reduce ? undefined : { y: -3 }}
      whileTap={{ scale: 0.99 }}
      style={{
        rotateX: sRotX,
        rotateY: sRotY,
        transformStyle: "preserve-3d",
      }}
      className={[
        "group relative overflow-hidden rounded-2xl border border-white/10",
        "bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.03)]",
        "transition-colors hover:border-orange-500/60",
        "will-change-transform",
        className,
      ].join(" ")}
    >
      {/* animated gradient border (Linear vibe) */}
      <motion.div
        className="pointer-events-none absolute -inset-[1px] rounded-[18px] opacity-0 group-hover:opacity-100"
        style={{
          background:
            "conic-gradient(from 180deg, rgba(249,115,22,0.0), rgba(249,115,22,0.65), rgba(255,255,255,0.20), rgba(249,115,22,0.0))",
        }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-0 rounded-2xl bg-black/[0.55]" />

      {/* subtle inner shine */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
        style={{ transform: "translateZ(1px)" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(900px_400px_at_50%_0%,rgba(255,255,255,0.10),transparent_55%)]" />
      </motion.div>

      {/* mouse-follow specular highlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px 220px at ${hx.get()} ${hy.get()}, rgba(255,255,255,0.14), transparent 55%)`,
        }}
      />

      {/* shimmer sweep */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          transform: "translateZ(2px)",
          background:
            "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.10) 45%, transparent 60%)",
          x: shimmerX,
        }}
        transition={{ duration: 0.25 }}
      />

      {/* orange pulse glow */}
      <motion.div
        className={[
          "pointer-events-none absolute h-80 w-80 rounded-full blur-3xl",
          glowPos === "br" ? "-bottom-32 -right-32" : "-bottom-32 -left-32",
          "bg-orange-500/35",
        ].join(" ")}
        animate={
          reduce
            ? undefined
            : { opacity: [0.12, 0.28, 0.12], scale: [1, 1.06, 1] }
        }
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* content layer */}
      <div className="relative z-10 p-8">
        <motion.p
          className="text-white/60 text-xs mb-3"
          style={{ transform: "translateZ(18px)" }}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Funcționalitate
        </motion.p>

        <motion.h3
          className="text-white text-2xl font-semibold mb-4"
          style={{ transform: "translateZ(26px)" }}
          whileHover={reduce ? undefined : { x: 2 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-white/65 text-sm leading-relaxed max-w-[46ch]"
          style={{ transform: "translateZ(18px)" }}
          whileHover={reduce ? undefined : { y: -1 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
        >
          {description}
        </motion.p>

        {/* arrow button (magnetic) */}
        <div className="absolute bottom-7 right-7">
          <motion.div
            className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-black text-lg font-bold"
            style={{
              transform: "translateZ(40px)",
              x: sArrowX,
              y: sArrowY,
            }}
            whileHover={reduce ? undefined : { rotate: 45, scale: 1.06 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 240, damping: 14 }}
          >
            →
          </motion.div>
        </div>
      </div>

      {/* faint grid lines like Vercel */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.09]
        [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)]
        [background-size:60px_60px]"
        animate={reduce ? undefined : { opacity: [0.06, 0.11, 0.06] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* bottom edge glow on hover */}
      <motion.div
        className="pointer-events-none absolute -bottom-24 left-1/2 h-40 w-[70%] -translate-x-1/2 rounded-full blur-2xl bg-orange-500/25 opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.25 }}
      />
    </motion.div>
  );
}

function FloatingParticles() {
  // super light: just a few dots
  const dots = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 2 + Math.random() * 3,
        dur: 6 + Math.random() * 8,
        delay: Math.random() * 2,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-white/10"
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.25, 0.6, 0.25] }}
          transition={{
            duration: d.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: d.delay,
          }}
        />
      ))}
    </div>
  );
}

export default function Features() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  const features: Feature[] = useMemo(
    () => [
      {
        title: "Idei instant",
        description:
          "Nu mai pierzi timp cu „pagina goală”. Generăm rapid concepte clare și moderne, adaptate brandului tău, în câteva secunde.",
        span: "md:col-span-7 min-h-[220px] md:min-h-[260px]",
        glowPos: "bl",
      },
      {
        title: "Adaptare inteligentă",
        description:
          "Fiecare brand e diferit. Ne ajustăm stilul după preferințele tale și rafinăm designul până arată exact cum îți dorești.",
        span: "md:col-span-5 min-h-[200px]",
        glowPos: "br",
      },
      {
        title: "Export în orice format",
        description:
          "Construim o dată, folosești oriunde: desktop, mobil, social media și materiale printate — totul coerent și pregătit de publicare.",
        span: "md:col-span-5 min-h-[200px]",
        glowPos: "bl",
      },
      {
        title: "Revizii fără bătăi de cap",
        description:
          "Fără modificări repetitive și discuții interminabile. Ajustăm rapid după feedback și iterăm eficient până la varianta finală.",

        span: "md:col-span-7 min-h-[220px] md:min-h-[260px]",
        glowPos: "br",
      },
    ],
    [],
  );

  // section-level background: subtle parallax follow
  const bgX = useMotionValue(0);
  const bgY = useMotionValue(0);
  const sBgX = useSpring(bgX, { stiffness: 120, damping: 22, mass: 0.8 });
  const sBgY = useSpring(bgY, { stiffness: 120, damping: 22, mass: 0.8 });

  const onSectionMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    bgX.set(clamp(px, -0.5, 0.5));
    bgY.set(clamp(py, -0.5, 0.5));
  };

  const onSectionLeave = () => {
    bgX.set(0);
    bgY.set(0);
  };

  const bgTX = useTransform(sBgX, [-0.5, 0.5], reduce ? [0, 0] : [-18, 18]);
  const bgTY = useTransform(sBgY, [-0.5, 0.5], reduce ? [0, 0] : [-14, 14]);

  // scroll progress bar (subtle)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const prog = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
      }}
      className="relative bg-black py-28 px-4 overflow-hidden"
      onMouseMove={onSectionMove}
      onMouseLeave={onSectionLeave}
    >
      {/* progress line */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-orange-500/60"
          style={{ width: prog }}
        />
      </div>

      {/* background noise */}
      <div className="absolute inset-0 opacity-[0.05] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      {/* subtle particles */}
      {!reduce && <FloatingParticles />}

      {/* parallax glows */}
      <motion.div
        className="pointer-events-none absolute -top-48 -left-48 h-[520px] w-[520px] rounded-full bg-orange-500/10 blur-3xl"
        style={{ x: bgTX, y: bgTY }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-56 -right-56 h-[620px] w-[620px] rounded-full bg-orange-500/10 blur-3xl"
        style={{ x: bgTX, y: bgTY }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(10px)" }}
          whileInView={
            reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16 flex flex-col lg:flex-row items-start justify-between gap-10"
        >
          <div className="max-w-xl">
            <h2 className="text-white text-4xl md:text-5xl font-semibold leading-tight">
              Creat pentru branduri.
              <br />
              Realizat cu <span className="text-orange-500">rapiditate</span>.
            </h2>
            <p className="mt-5 text-white/60 text-lg">
              Îți construim un website modern, rapid și optimizat pentru
              conversii — cu design premium, structură clară și experiență
              excelentă pe mobil.
            </p>
          </div>

          {/* geometric icon */}
          <motion.div
            className="hidden lg:block"
            initial={reduce ? false : { opacity: 0, scale: 0.9, rotate: -6 }}
            whileInView={
              reduce ? undefined : { opacity: 0.6, scale: 1, rotate: 0 }
            }
            viewport={{ once: true, amount: 0.6 }}
            transition={{ type: "spring", stiffness: 140, damping: 16 }}
            whileHover={
              reduce ? undefined : { rotate: 3, scale: 1.02, opacity: 0.75 }
            }
          >
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <path
                d="M60 10 L100 35 L110 75 L80 105 L40 105 L10 75 L20 35 Z"
                stroke="white"
                strokeWidth="1"
              />
              <path
                d="M60 10 L60 55 L100 35"
                stroke="white"
                strokeWidth="1"
                opacity="0.5"
              />
              <path
                d="M60 55 L20 35"
                stroke="white"
                strokeWidth="1"
                opacity="0.5"
              />
              <path
                d="M60 55 L110 75"
                stroke="white"
                strokeWidth="1"
                opacity="0.35"
              />
              <path
                d="M60 55 L10 75"
                stroke="white"
                strokeWidth="1"
                opacity="0.35"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {features.map((f, idx) => (
            <TiltCard
              key={idx}
              title={f.title}
              description={f.description}
              glowPos={f.glowPos}
              className={f.span}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
