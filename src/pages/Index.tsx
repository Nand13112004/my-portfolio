import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";

import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check system preference or stored preference
    const stored = localStorage.getItem("theme");
    if (stored) {
      setIsDark(stored === "dark");
    }
    
    // Simulate loading for smooth entrance
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold gradient-text"
            >
              ND
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="min-h-screen bg-background text-foreground"
      >
        <Navigation isDark={isDark} onToggleTheme={toggleTheme} />
        <CommandPalette
          onNavigate={handleNavigate}
          onToggleTheme={toggleTheme}
          isDark={isDark}
        />

        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          
          <ContactSection />
        </main>

        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
