import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { PenSquare, LogIn } from "lucide-react";
import Layout from "@/components/Layout";
import AuthModal from "@/components/AuthModal";
import SearchBar from "@/components/community/SearchBar";
import StoryForm from "@/components/community/StoryForm";
import StoryCard from "@/components/community/StoryCard";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Community = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState<any[]>([]);
  const [showAuth, setShowAuth] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [profiles, setProfiles] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");

  const fetchStories = async () => {
    const { data } = await supabase
      .from("community_stories")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setStories(data);
      const userIds = [...new Set(data.map((s: any) => s.user_id))];
      if (userIds.length > 0) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("user_id, display_name")
          .in("user_id", userIds);
        if (profileData) {
          const map: Record<string, string> = {};
          profileData.forEach((p: any) => (map[p.user_id] = p.display_name));
          setProfiles(map);
        }
      }
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const handleDelete = async (id: string) => {
    await supabase.from("community_stories").delete().eq("id", id);
    setStories((prev) => prev.filter((s: any) => s.id !== id));
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return stories;
    const q = search.toLowerCase();
    return stories.filter(
      (s: any) =>
        s.title.toLowerCase().includes(q) ||
        s.destination.toLowerCase().includes(q) ||
        s.content.toLowerCase().includes(q)
    );
  }, [stories, search]);

  return (
    <Layout>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="font-body text-xs uppercase tracking-[0.3em] text-primary font-semibold">
              Community
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">
              Traveler Stories
            </h1>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              Share your travel experiences with fellow wanderers around the world.
            </p>

            <div className="mt-6">
              {user ? (
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  <PenSquare className="h-4 w-4" />
                  {showForm ? "Cancel" : "Share Your Story"}
                </button>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  <LogIn className="h-4 w-4" />
                  Log in to Share Your Story
                </button>
              )}
            </div>
          </motion.div>

          {/* Story Form */}
          {showForm && user && (
            <StoryForm
              onSubmitted={() => {
                setShowForm(false);
                fetchStories();
              }}
              onCancel={() => setShowForm(false)}
            />
          )}

          {/* Search */}
          <SearchBar value={search} onChange={setSearch} />

          {/* Stories List */}
          {filtered.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">
              <p className="font-body text-lg">
                {search ? "No stories match your search." : "No stories yet — be the first to share!"}
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filtered.map((story: any, i: number) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  index={i}
                  profiles={profiles}
                  onDelete={handleDelete}
                  onAuthRequired={() => setShowAuth(true)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Community;
