import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { Destination } from "@/data/travelData";

interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

const DestinationCard = ({ destination, index = 0 }: DestinationCardProps) => (
  <Link to={`/destination/${destination.id}`}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg cursor-pointer"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-1 mb-1">
          <MapPin className="h-3.5 w-3.5 text-primary-foreground/80" />
          <span className="text-xs font-body text-primary-foreground/80 uppercase tracking-wider">
            {destination.country}
          </span>
        </div>
        <h3 className="font-display text-xl font-bold text-primary-foreground leading-tight">
          {destination.name}
        </h3>
        <p className="text-primary-foreground/70 text-sm mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {destination.description}
        </p>
      </div>
    </motion.div>
  </Link>
);

export default DestinationCard;
