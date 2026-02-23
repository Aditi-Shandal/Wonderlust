import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPost } from "@/data/travelData";

interface PostCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

const PostCard = ({ post, index = 0, featured = false }: PostCardProps) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`group ${featured ? "md:col-span-2 md:grid md:grid-cols-2 md:gap-6" : ""}`}
  >
    <Link to={`/blog/${post.slug}`} className="block">
      <div className={`overflow-hidden rounded-lg ${featured ? "h-64 md:h-full" : "h-52"}`}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    </Link>
    <div className={`${featured ? "flex flex-col justify-center py-4" : "pt-4"}`}>
      <span className="text-xs font-body font-semibold uppercase tracking-widest text-primary">
        {post.category}
      </span>
      <Link to={`/blog/${post.slug}`}>
        <h3 className={`font-display font-bold text-foreground mt-1 leading-tight group-hover:text-primary transition-colors ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
          {post.title}
        </h3>
      </Link>
      <p className="text-muted-foreground text-sm mt-2 leading-relaxed line-clamp-2">
        {post.summary}
      </p>
      <div className="flex items-center gap-4 mt-3">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {post.readTime}
        </span>
        <span className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
      </div>
      <Link
        to={`/blog/${post.slug}`}
        className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3 group-hover:gap-2 transition-all"
      >
        Read more <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </motion.article>
);

export default PostCard;
