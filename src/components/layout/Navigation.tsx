import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";

interface NavigationProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const Navigation = ({ isDark, onToggleTheme }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-4 bg-background/80 backdrop-blur-xl border-b border-border"
            : "py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="text-xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ND
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 px-36">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hover-underline"
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors ml-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg bg-secondary/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-20 z-40 md:hidden"
          >
            <div className="container mx-auto px-6">
              <div className="glass-card p-6 space-y-4">
                {navItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="block py-2 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ x: 5 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <div className="pt-4 border-t border-border">
                  <button
                    onClick={() => {
                      onToggleTheme();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 py-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isDark ? (
                      <>
                        <Sun className="w-4 h-4" /> Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4" /> Dark Mode
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
