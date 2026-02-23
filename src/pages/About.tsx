import { motion } from "framer-motion";
import { MapPin, Mail, Compass } from "lucide-react";
import Layout from "@/components/Layout";

const About = () => (
  <Layout>
    <div className="pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground text-center">
            About Wanderlust
          </h1>
          <p className="text-muted-foreground mt-4 text-center max-w-lg mx-auto">
            Stories, guides, and inspiration for the curious traveler.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 space-y-6 font-body text-foreground/90 leading-relaxed"
        >
          <p>
            Wanderlust was born from a simple belief: that travel is the most powerful form of education. Every cobblestone street, every mountain trail, every shared meal with strangers carries a lesson that no classroom can teach.
          </p>
          <p>
            We're a small team of travel writers, photographers, and adventurers who believe in slow travel, authentic experiences, and the transformative power of stepping outside your comfort zone. Our stories go beyond tourist checklists — we seek out the hidden, the unexpected, and the deeply human.
          </p>
          <p>
            Whether you're planning your first solo trip or your hundredth adventure, we hope our stories inspire you to explore with curiosity, travel with respect, and always leave a place better than you found it.
          </p>
        </motion.div>

        {/* Author Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 p-8 bg-card rounded-xl border border-border"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Compass className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">The Founder</h3>
              <p className="text-sm text-muted-foreground">Founder & Lead Writer</p>
            </div>
          </div>
          <p className="text-foreground/80 text-sm leading-relaxed">
            After leaving a corporate career in 2018, they set out to explore the world with nothing but a backpack and a notebook. Six continents and 50+ countries later, they founded Wanderlust to share the stories that shaped their journey. When not writing, you'll find them haggling in markets, hiking volcanic ridges, or searching for the perfect bowl of pho.
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 text-center">Get in Touch</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>hello@wanderlust.blog</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Lisbon, Portugal</span>
            </div>
          </div>

          <form className="mt-8 space-y-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-body text-sm"
            />
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-body text-sm"
            />
            <textarea
              placeholder="Your message"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 font-body text-sm resize-none"
            />
            <button
              type="button"
              className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  </Layout>
);

export default About;
