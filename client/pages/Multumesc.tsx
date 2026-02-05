"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Multumesc() {
  return (
    <main className="min-h-screen bg-black text-white grid place-items-center px-4">
      <div className="max-w-xl text-center rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <h1 className="text-3xl md:text-4xl font-semibold">Mulțumesc! ✅</h1>
        <p className="mt-3 text-white/60">
          Cererea a fost trimisă. Revin cu un răspuns cât mai rapid.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="bg-orange-500 hover:bg-orange-500/90 text-black rounded-xl px-7 h-11">
              Înapoi acasă
            </Button>
          </Link>
          <Link
            to="/servicii"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-7 h-11 text-white/90 hover:bg-white/10 transition"
          >
            Vezi servicii
          </Link>
        </div>
      </div>
    </main>
  );
}
