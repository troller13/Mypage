import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Timeline from "@/components/Timeline";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <main className="bg-background text-foreground">
      <Hero />

      <Features />
      <Timeline />
      <Pricing />
      <FAQ />

      <Footer />
    </main>
  );
}
