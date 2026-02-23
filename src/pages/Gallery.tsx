import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Layout from "@/components/Layout";
import { destinations, blogPosts } from "@/data/travelData";

const allImages = [
  ...destinations.map((d) => ({ src: d.image, label: d.name, location: d.country })),
  ...blogPosts.map((p) => ({ src: p.image, label: p.title, location: p.category })),
];

// Deduplicate by src
const images = allImages.filter((img, i, arr) => arr.findIndex((x) => x.src === img.src) === i);

const Gallery = () => {
  const [selected, setSelected] = useState<typeof images[0] | null>(null);

  return (
    <Layout>
      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">Gallery</h1>
            <p className="text-muted-foreground mt-3">A visual journey through our favorite destinations.</p>
          </motion.div>

          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setSelected(img)}
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-end p-3">
                    <span className="text-primary-foreground text-sm font-body font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {img.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground" aria-label="Close">
              <X className="h-8 w-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selected.src}
              alt={selected.label}
              className="max-h-[85vh] max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
