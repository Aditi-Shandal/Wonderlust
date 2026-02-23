import { motion } from "framer-motion";
import { MapPin, Clock, Trash2 } from "lucide-react";
import DestinationMap from "@/components/DestinationMap";
import StoryLikes from "./StoryLikes";
import StoryComments from "./StoryComments";
import { useAuth } from "@/contexts/AuthContext";

interface StoryCardProps {
  story: any;
  index: number;
  profiles: Record<string, string>;
  onDelete: (id: string) => void;
  onAuthRequired: () => void;
}

const StoryCard = ({ story, index, profiles, onDelete, onAuthRequired }: StoryCardProps) => {
  const { user } = useAuth();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-card border border-border rounded-2xl overflow-hidden"
    >
      {/* Story photo */}
      {story.image_url && (
        <img
          src={story.image_url}
          alt={story.title}
          className="w-full h-52 object-cover"
          loading="lazy"
        />
      )}

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 flex-wrap">
              <span className="flex items-center gap-1 font-medium text-primary">
                <MapPin className="h-3 w-3" />
                {story.destination}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(story.created_at).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span>·</span>
              <span>by {profiles[story.user_id] || "Traveler"}</span>
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3">
              {story.title}
            </h3>
            <p className="text-foreground/80 font-body text-sm leading-relaxed whitespace-pre-line line-clamp-6">
              {story.content}
            </p>

            {/* Actions: likes & comments */}
            <div className="flex items-center gap-4 mt-4">
              <StoryLikes storyId={story.id} onAuthRequired={onAuthRequired} />
              <StoryComments
                storyId={story.id}
                profiles={profiles}
                onAuthRequired={onAuthRequired}
              />
            </div>

            {/* Map */}
            <DestinationMap destination={story.destination} />
          </div>

          {user && user.id === story.user_id && (
            <button
              onClick={() => onDelete(story.id)}
              className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
              title="Delete story"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default StoryCard;
