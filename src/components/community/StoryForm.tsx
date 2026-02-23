import { useState } from "react";
import { motion } from "framer-motion";
import { ImagePlus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface StoryFormProps {
  onSubmitted: () => void;
  onCancel: () => void;
}

const StoryForm = ({ onSubmitted, onCancel }: StoryFormProps) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError("");
    setSubmitting(true);

    let image_url: string | null = null;

    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from("story-photos")
        .upload(path, imageFile);
      if (uploadErr) {
        setError("Failed to upload image: " + uploadErr.message);
        setSubmitting(false);
        return;
      }
      const { data: urlData } = supabase.storage
        .from("story-photos")
        .getPublicUrl(path);
      image_url = urlData.publicUrl;
    }

    const { error: insertErr } = await supabase.from("community_stories").insert({
      user_id: user.id,
      title,
      destination,
      content,
      image_url,
    } as any);

    if (insertErr) {
      setError(insertErr.message);
    } else {
      onSubmitted();
    }
    setSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-12"
    >
      <h2 className="font-display text-xl font-bold text-foreground mb-6">Write Your Story</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-body font-medium text-foreground mb-1">Story Title</label>
          <input
            type="text"
            placeholder="e.g. My Week in Tokyo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-body"
          />
        </div>
        <div>
          <label className="block text-sm font-body font-medium text-foreground mb-1">Destination</label>
          <input
            type="text"
            placeholder="e.g. Tokyo, Japan"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-body"
          />
        </div>
        <div>
          <label className="block text-sm font-body font-medium text-foreground mb-1">Your Experience</label>
          <textarea
            placeholder="Tell us about your trip — what you saw, felt, tasted, and loved..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={8}
            className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-body resize-none"
          />
        </div>

        {/* Photo upload */}
        <div>
          <label className="block text-sm font-body font-medium text-foreground mb-1">
            Photo <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          {imagePreview ? (
            <div className="relative w-full max-w-xs">
              <img src={imagePreview} alt="Preview" className="rounded-lg w-full h-40 object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-background/80 backdrop-blur rounded-full p-1 hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-2 px-4 py-3 rounded-lg border border-dashed border-border text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors cursor-pointer text-sm font-body">
              <ImagePlus className="h-4 w-4" />
              Add a travel photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {submitting ? "Publishing…" : "Publish Story"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-lg border border-border text-foreground font-body text-sm hover:bg-muted transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default StoryForm;
