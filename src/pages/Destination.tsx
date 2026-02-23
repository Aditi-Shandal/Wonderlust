import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import WeatherWidget from "@/components/WeatherWidget";
import { destinations } from "@/data/travelData";

const Destination = () => {
  const { id } = useParams<{ id: string }>();
  const dest = destinations.find((d) => d.id === id);

  if (!dest) {
    return (
      <Layout>
        <div className="pt-24 pb-20 px-6 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Destination not found</h1>
          <Link to="/" className="text-primary text-sm font-body mt-4 inline-block">
            ← Back home
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-primary-foreground/80 text-sm font-body mb-4 hover:text-primary-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin className="h-4 w-4 text-primary-foreground/80" />
              <span className="text-sm font-body text-primary-foreground/80 uppercase tracking-wider">
                {dest.country}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">
              {dest.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-2"
            >
              <p className="text-foreground font-body text-lg leading-relaxed">
                {dest.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {dest.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-body font-medium capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Weather */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {dest.lat !== undefined && dest.lon !== undefined && (
                <WeatherWidget lat={dest.lat} lon={dest.lon} />
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Destination;
