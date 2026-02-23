import { Link } from "react-router-dom";
import { Compass, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="bg-card border-t border-border">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Compass className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-bold text-foreground">Wanderlust</span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            Stories, guides, and inspiration for the curious traveler. Exploring the world one destination at a time.
          </p>
        </div>
        <div>
          <h4 className="font-display text-base font-semibold text-foreground mb-4">Explore</h4>
          <div className="flex flex-col gap-2">
            <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Stories</Link>
            <Link to="/community" className="text-sm text-muted-foreground hover:text-primary transition-colors">Community</Link>
            <Link to="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gallery</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
          </div>
        </div>
        <div>
          <h4 className="font-display text-base font-semibold text-foreground mb-4">Follow Along</h4>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">© 2026 Wanderlust. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
