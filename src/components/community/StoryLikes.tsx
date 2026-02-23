import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface StoryLikesProps {
  storyId: string;
  onAuthRequired: () => void;
}

const StoryLikes = ({ storyId, onAuthRequired }: StoryLikesProps) => {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      const { count: total } = await supabase
        .from("story_likes" as any)
        .select("*", { count: "exact", head: true })
        .eq("story_id", storyId);
      setCount(total ?? 0);

      if (user) {
        const { data } = await supabase
          .from("story_likes" as any)
          .select("id")
          .eq("story_id", storyId)
          .eq("user_id", user.id)
          .maybeSingle();
        setLiked(!!data);
      }
    };
    fetchLikes();
  }, [storyId, user]);

  const toggle = async () => {
    if (!user) { onAuthRequired(); return; }
    if (busy) return;
    setBusy(true);

    if (liked) {
      await supabase
        .from("story_likes" as any)
        .delete()
        .eq("story_id", storyId)
        .eq("user_id", user.id);
      setCount((c) => Math.max(0, c - 1));
      setLiked(false);
    } else {
      await supabase
        .from("story_likes" as any)
        .insert({ story_id: storyId, user_id: user.id } as any);
      setCount((c) => c + 1);
      setLiked(true);
    }
    setBusy(false);
  };

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 text-sm font-body transition-colors ${
        liked
          ? "text-red-500 hover:text-red-600"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
      {count > 0 && count}
    </button>
  );
};

export default StoryLikes;
