
-- Likes table
CREATE TABLE public.story_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES public.community_stories(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(story_id, user_id)
);

ALTER TABLE public.story_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view likes" ON public.story_likes FOR SELECT USING (true);
CREATE POLICY "Auth users can like" ON public.story_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON public.story_likes FOR DELETE USING (auth.uid() = user_id);

-- Comments table
CREATE TABLE public.story_comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES public.community_stories(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.story_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments" ON public.story_comments FOR SELECT USING (true);
CREATE POLICY "Auth users can comment" ON public.story_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments" ON public.story_comments FOR DELETE USING (auth.uid() = user_id);

-- Story photos storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('story-photos', 'story-photos', true);

CREATE POLICY "Anyone can view story photos" ON storage.objects FOR SELECT USING (bucket_id = 'story-photos');
CREATE POLICY "Auth users can upload story photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'story-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own story photos" ON storage.objects FOR DELETE USING (bucket_id = 'story-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add image_url column to community_stories
ALTER TABLE public.community_stories ADD COLUMN image_url TEXT;
