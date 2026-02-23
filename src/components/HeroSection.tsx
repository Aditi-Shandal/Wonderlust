import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { heroBg } from "@/data/travelData";

const HeroSection = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    <img
      src={heroBg}
      alt="Santorini sunset"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
    <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-body text-sm uppercase tracking-[0.3em] text-primary-foreground/80 mb-4"
      >
        Travel Blog & Destination Guide
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-[1.1] tracking-tight"
      >
        Wander Often,
        <br />
        <span className="italic font-normal">Wonder Always</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="font-body text-lg text-primary-foreground/80 mt-6 max-w-lg mx-auto"
      >
        Stories and guides from the world's most inspiring destinations, crafted for the curious traveler.
      </motion.p>
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <ArrowDown className="h-6 w-6 text-primary-foreground/60 animate-bounce" />
    </motion.div>
  </section>
);

export default HeroSection;
