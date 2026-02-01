import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleField } from "@/components/ui/ParticleField";
import { ArrowDown, Sparkles, Brain } from "lucide-react";

const roles = ["I build full-stack apps", "I integrate AI solutions", "I create smart systems"];

export const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleField />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[100px] animate-pulse-glow delay-1000" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8"
        >
          <Brain className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            AI Integrated Full-Stack Developer
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="gradient-text">Nand Delvadiya</span>
        </motion.h1>

        {/* Animated Role */}
        <div className="h-16 md:h-20 mb-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRole}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-semibold text-primary"
            >
              {roles[currentRole]}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-8 md:h-12 bg-primary ml-2 align-middle"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          B.Tech Computer Engineering student at <span className="text-foreground">CHARUSAT</span> specializing in building scalable web applications with <span className="text-foreground">AI-powered features</span> and intelligent solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium shadow-glow transition-all hover:shadow-[0_0_80px_hsl(210_100%_60%_/_0.4)]"
          >
            View Case Studies
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 glass-card font-medium hover:bg-secondary/50 transition-colors"
          >
            Let's Connect
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
};
