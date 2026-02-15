"use client";
import { Link } from "react-router-dom";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  type Variants,
} from "framer-motion";

/* ================= EASING + COUNTUP ================= */

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function CountUp({
  to,
  delayMs = 0,
  durationMs = 1800,
}: {
  to: number;
  delayMs?: number;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let raf = 0;
    const startAt = performance.now() + delayMs;

    const tick = (now: number) => {
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const t = Math.min((now - startAt) / durationMs, 1);
      const eased = easeOutCubic(t);
      setValue(Math.floor(eased * to));

      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, delayMs, durationMs]);

  return <span ref={ref}>{value}</span>;
}

/* ================= SMALL UI PARTS ================= */

function AvatarStack() {
  const avatars = [
    "/images/avatar1.jpg",
    "/images/avatar2.jpg",
    "/images/avatar3.jpg",
  ];
  return (
    <div className="flex -space-x-2">
      {avatars.map((src, i) => (
        <div
          key={i}
          className="h-8 w-8 overflow-hidden rounded-full border border-white/15 bg-white/5"
        >
          <img src={src} alt="avatar" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}

function ShotStack() {
  const shots = [
    "/images/avatar1.jpg",
    "/images/avatar2.jpg",
    "/images/avatar3.jpg",
  ];
  return (
    <div className="flex gap-1.5">
      {shots.map((src, i) => (
        <div
          key={i}
          className="h-9 w-10 overflow-hidden rounded-md border border-white/10 bg-white/5"
        >
          <img src={src} alt="shot" className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}

function Cross() {
  return (
    <div className="relative h-6 w-6">
      <div className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-white/20" />
      <div className="absolute top-1/2 left-0 h-px w-6 -translate-y-1/2 bg-white/20" />
    </div>
  );
}

function ArrowHead({ side }: { side: "left" | "right" }) {
  return (
    <svg
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "-left-3 rotate-180" : "-right-3"
      }`}
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 5H12M12 5L8 1M12 5L8 9"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/* ================= MILESTONE WITH MOUSE FOLLOW GLOW ================= */

function Milestone({
  big,
  title,
  subtitle,
  top,
  media,
  lineSide,
  revealDelay,
}: {
  big: number;
  title: string;
  subtitle: string;
  top: boolean; // ✅ păstrăm zig-zag
  media: React.ReactNode;
  lineSide: "toRight" | "toLeft";
  revealDelay: number; // ms – sincronizare
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // mouse glow
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 220, damping: 25 });
  const sy = useSpring(my, { stiffness: 220, damping: 25 });

  const onMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMove}
      className={`group relative ${
        top ? "md:-translate-y-16" : "md:translate-y-16"
      } rounded-2xl`}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{
        duration: 0.65,
        ease: "easeOut",
        delay: revealDelay / 1000,
      }}
      whileHover={{ y: top ? -7 : 7 }}
    >
      {/* mouse-follow spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-6 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          background: useTransform([sx, sy], ([x, y]) => {
            return `radial-gradient(220px circle at ${x}px ${y}px, rgba(249,115,22,0.20), transparent 55%)`;
          }),
        }}
      />

      {/* subtle border/glass */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
        {/* number: starts after line draw */}
        <div className="text-white text-6xl font-semibold leading-none">
          <CountUp to={big} delayMs={revealDelay + 350} durationMs={2100} />
        </div>

        {/* text after number */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: (revealDelay + 850) / 1000,
          }}
          className="mt-3"
        >
          <div className="text-white/85 text-sm">{title}</div>
          <div className="mt-1 text-white/45 text-xs">{subtitle}</div>
        </motion.div>

        {/* connectors */}
        <div className="mt-7 flex items-center gap-4">
          {lineSide === "toRight" ? (
            <>
              {media}
              <div className="flex-1 relative">
                <div className="h-px bg-white/20 w-full" />
                <ArrowHead side="right" />
              </div>
              <Cross />
            </>
          ) : (
            <>
              <Cross />
              <div className="flex-1 relative">
                <div className="h-px bg-white/20 w-full" />
                <ArrowHead side="left" />
              </div>
              {media}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ================= MAIN ================= */

export default function StatsTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  // ✅ parallax background (ușor)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-2.5%", "2.5%"]);

  // line drawing progress (sync)
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, amount: 0.4 });

  // draw horizontal line: scaleX 0 -> 1
  const hLine = {
    hidden: { scaleX: 0 },
    show: {
      scaleX: 1,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  // draw vertical lines: height 0 -> target height
  const vLine = (delay = 0) => ({
    hidden: { height: 0, opacity: 0.85 },
    show: {
      height: 190,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay },
    },
  });

  // reveal delay baseline (sync)
  const baseDelayMs = lineInView ? 250 : 0;

  return (
    <section ref={sectionRef} className="relative py-24 px-4 overflow-hidden">
      {/* ===== background image with parallax ===== */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-center bg-cover"
        style={{
          y: bgY,
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
            url('/images/timeline-bg.jpg')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* optional: very subtle artifact fix (doesn't darken much) */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/5 backdrop-blur-[0.5px]" />

      {/* subtle noise */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      {/* orange dots */}
      <div className="pointer-events-none absolute inset-0">
        {[
          { left: "22%", top: "12%", size: "4px" },
          { left: "70%", top: "18%", size: "6px" },
          { left: "84%", top: "30%", size: "4px" },
          { left: "60%", top: "38%", size: "4px" },
        ].map((d, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-orange-500"
            style={{ left: d.left, top: d.top, width: d.size, height: d.size }}
            animate={{ opacity: [0.25, 0.75, 0.25], scale: [1, 1.25, 1] }}
            transition={{
              duration: 2.4 + i * 0.25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* TOP TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <div className="absolute -left-14 top-0 hidden md:block text-white/30 text-xs tracking-widest">
            2026
          </div>

          <p className="text-white text-lg md:text-xl leading-relaxed">
            Indiferent dacă ai nevoie de o pagină simplă pentru un proiect
            personal, un site de prezentare pentru afacerea ta sau un magazin
            online complet, noi îți construim website-ul astfel încât să arate
            premium și să aducă rezultate — rapid, frumos și eficient.
            <br />
            <span className="text-white/80">
              Iar rezultatele? Cifrele vorbesc de la sine:
            </span>
          </p>
        </motion.div>

        {/* TIMELINE */}
        <div className="mt-28 md:mt-32 relative" ref={lineRef}>
          {/* ✅ HORIZONTAL LINE DRAW */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 hidden md:block">
            <motion.div
              variants={hLine}
              initial="hidden"
              animate={lineInView ? "show" : "hidden"}
              className="relative h-px bg-white/20 origin-left"
            >
              {/* arrow caps */}
              <svg
                className="absolute -left-3 top-1/2 -translate-y-1/2 rotate-180"
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 5H12M12 5L8 1M12 5L8 9"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1.2"
                />
              </svg>
              <svg
                className="absolute -right-3 top-1/2 -translate-y-1/2"
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 5H12M12 5L8 1M12 5L8 9"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1.2"
                />
              </svg>
            </motion.div>
          </div>

          {/* ✅ VERTICAL LINES DRAW (sync after horizontal starts) */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-[160px] w-px bg-white/25"
            variants={vLine(0.25)}
            initial="hidden"
            animate={lineInView ? "show" : "hidden"}
          />
          <motion.div
            className="hidden md:block absolute right-0 top-[160px] w-px bg-white/25"
            variants={vLine(0.35)}
            initial="hidden"
            animate={lineInView ? "show" : "hidden"}
          />

          {/* GRID (✅ zig-zag păstrat) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-14 md:gap-10">
            <Milestone
              big={2024}
              title="De când realizăm pagini web"
              subtitle="Experiență deja de 2 ani"
              top={true}
              media={<AvatarStack />}
              lineSide="toRight"
              revealDelay={baseDelayMs + 250}
            />

            <Milestone
              big={20}
              title="Proiecte deja realizate"
              subtitle="Realizate cu multă muncă"
              top={false}
              media={<ShotStack />}
              lineSide="toRight"
              revealDelay={baseDelayMs + 350}
            />

            <Milestone
              big={17}
              title="Clienți au fost mulțumiți"
              subtitle="Și toți au fost mulțumiți"
              top={true}
              media={<AvatarStack />}
              lineSide="toRight"
              revealDelay={baseDelayMs + 450}
            />

            <Milestone
              big={3}
              title="Proiecte în lucru"
              subtitle="Ceea ce facem acum"
              top={false}
              media={<ShotStack />}
              lineSide="toRight"
              revealDelay={baseDelayMs + 550}
            />
          </div>

          {/* CTA */}

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
            className="mt-20 md:mt-24 flex flex-col items-center gap-4"
          >
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 240, damping: 16 }}
            >
              <Link
                to="/servicii"
                className="group inline-flex items-center gap-3 rounded-full bg-orange-500 px-8 py-3 text-sm font-semibold text-black transition hover:bg-orange-500/90"
              >
                Cere acum
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/10 transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
