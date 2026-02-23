import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Compass, LogIn, LogOut, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Stories" },
  { to: "/community", label: "Community" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Compass className="h-6 w-6 text-primary transition-transform group-hover:rotate-45" />
            <span className="font-display text-xl font-bold text-foreground tracking-tight">
              Wanderlust
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-body text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${
                  location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth buttons desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-1 text-sm text-muted-foreground font-body hover:text-primary transition-colors"
                >
                  <UserCircle className="h-4 w-4 text-primary" />
                  {user.email?.split("@")[0]}
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center gap-1 text-sm font-body font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-body font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <LogIn className="h-4 w-4" /> Log in
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`font-body text-base font-medium tracking-wide uppercase transition-colors hover:text-primary ${
                      location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="text-left font-body text-base font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <UserCircle className="h-4 w-4" /> Profile
                    </Link>
                    <button
                      onClick={() => { signOut(); setIsOpen(false); }}
                      className="text-left font-body text-base font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" /> Log out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setShowAuth(true); setIsOpen(false); }}
                    className="text-left font-body text-base font-medium text-primary flex items-center gap-2"
                  >
                    <LogIn className="h-4 w-4" /> Log in
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
