import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Save, Loader2, User, MapPin, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [storyCount, setStoryCount] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (data) {
        setProfile(data);
        setDisplayName(data.display_name || "");
        setBio((data as any).bio || "");
        setAvatarUrl(data.avatar_url);
      }
    };

    const fetchStoryCount = async () => {
      const { count } = await supabase
        .from("community_stories")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);
      setStoryCount(count ?? 0);
    };

    fetchProfile();
    fetchStoryCount();
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);

    const ext = file.name.split(".").pop();
    const path = `${user.id}/avatar.${ext}`;

    // Remove old avatar if exists
    await supabase.storage.from("avatars").remove([path]);

    const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (!error) {
      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
      const newUrl = urlData.publicUrl + "?t=" + Date.now(); // cache bust
      setAvatarUrl(newUrl);
      await supabase
        .from("profiles")
        .update({ avatar_url: newUrl } as any)
        .eq("user_id", user.id);
    }
    setUploading(false);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaved(false);
    await supabase
      .from("profiles")
      .update({ display_name: displayName, bio } as any)
      .eq("user_id", user.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (authLoading || !user) {
    return (
      <Layout>
        <div className="pt-24 pb-20 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <span className="font-body text-xs uppercase tracking-[0.3em] text-primary font-semibold">
              Profile
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">
              Your Profile
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 md:p-10"
          >
            {/* Avatar */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-muted border-4 border-background shadow-lg">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  {uploading ? (
                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                  ) : (
                    <Camera className="h-6 w-6 text-white" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
              <p className="text-xs text-muted-foreground mt-2 font-body">
                Hover to change photo
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-8 pb-8 border-b border-border">
              <div className="text-center">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-body">
                  <BookOpen className="h-3.5 w-3.5" />
                  Stories
                </div>
                <p className="font-display text-2xl font-bold text-foreground mt-1">{storyCount}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-body">
                  <MapPin className="h-3.5 w-3.5" />
                  Member since
                </div>
                <p className="font-display text-lg font-bold text-foreground mt-1">
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-body"
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email || ""}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border border-border bg-muted text-muted-foreground text-sm font-body cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-body font-medium text-foreground mb-1">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell the community about yourself and your travel style…"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm font-body resize-none"
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {saved ? "Saved!" : saving ? "Saving…" : "Save Profile"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
