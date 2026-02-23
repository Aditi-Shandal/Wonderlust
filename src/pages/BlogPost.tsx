import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Share2, Facebook, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { blogPosts } from "@/data/travelData";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Layout>
        <div className="pt-32 pb-20 px-6 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Post not found</h1>
          <Link to="/blog" className="text-primary mt-4 inline-block">← Back to stories</Link>
        </div>
      </Layout>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Layout>
      {/* Hero Image */}
      <div className="relative h-[60vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary-foreground/80">
                {post.category}
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mt-2 leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 mt-4 text-primary-foreground/70 text-sm">
                <span>{post.author}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
                <span>·</span>
                <span>{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-12 px-6">
        <div className="container mx-auto max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to stories
          </Link>

          <div className="prose prose-lg max-w-none font-body text-foreground leading-relaxed">
            {post.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.startsWith("## ")) {
                return <h2 key={i} className="font-display text-2xl font-bold text-foreground mt-10 mb-4">{paragraph.replace("## ", "")}</h2>;
              }
              if (paragraph.startsWith("- ")) {
                const items = paragraph.split("\n").filter(l => l.startsWith("- "));
                return (
                  <ul key={i} className="list-disc pl-6 space-y-1 text-foreground/90">
                    {items.map((item, j) => (
                      <li key={j} dangerouslySetInnerHTML={{ __html: item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                    ))}
                  </ul>
                );
              }
              return <p key={i} className="text-foreground/90 mb-4">{paragraph}</p>;
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-border">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium capitalize">
                {tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
            <Share2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Share:</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Share on Facebook">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Share on Twitter">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
