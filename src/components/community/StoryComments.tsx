import { useState, useEffect } from "react";
import { MessageCircle, Send, Trash2, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface StoryCommentsProps {
  storyId: string;
  profiles: Record<string, string>;
  onAuthRequired: () => void;
}

const StoryComments = ({ storyId, profiles, onAuthRequired }: StoryCommentsProps) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchComments = async () => {
    const { data } = await supabase
      .from("story_comments" as any)
      .select("*")
      .eq("story_id", storyId)
      .order("created_at", { ascending: true });
    if (data) setComments(data);
  };

  useEffect(() => {
    if (open) fetchComments();
  }, [open, storyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { onAuthRequired(); return; }
    if (!text.trim()) return;
    setSubmitting(true);
    await supabase
      .from("story_comments" as any)
      .insert({ story_id: storyId, user_id: user.id, content: text.trim() } as any);
    setText("");
    setSubmitting(false);
    fetchComments();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("story_comments" as any).delete().eq("id", id);
    setComments((prev) => prev.filter((c: any) => c.id !== id));
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
      >
        <MessageCircle className="h-4 w-4" />
        {comments.length > 0 ? comments.length : open ? "Hide" : "Comments"}
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          {comments.length === 0 && (
            <p className="text-xs text-muted-foreground font-body">No comments yet.</p>
          )}

          {comments.map((c: any) => (
            <div key={c.id} className="flex gap-2 group">
              <div className="flex-1 bg-muted/50 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <span className="font-medium text-foreground">
                    {profiles[c.user_id] || "Traveler"}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Clock className="h-3 w-3" />
                    {new Date(c.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm font-body text-foreground/90">{c.content}</p>
              </div>
              {user && user.id === c.user_id && (
                <button
                  onClick={() => handleDelete(c.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all self-center"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder={user ? "Write a comment…" : "Log in to comment"}
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={!user}
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="submit"
              disabled={submitting || !text.trim() || !user}
              className="px-3 py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 transition-opacity"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StoryComments;
