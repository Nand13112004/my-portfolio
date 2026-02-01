import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Lightbulb, Zap, Users } from "lucide-react";

const timeline = [
  {
    year: "2023",
    title: "B.Tech @ CHARUSAT",
    description:
      "Started Computer Engineering with CGPA 8.15. Focused on modern web technologies, UI/UX design, and building real-world projects.",
    icon: Lightbulb,
  },
  {
    year: "2024",
    title: "Python Intern @ InternPe",
    description:
      "Built foundational programming skills, developed a Snake Game, and gained backend development exposure.",
    icon: Zap,
  },
  {
    year: "2025",
    title: "MERN Intern @ Oasis Infobyte",
    description:
      "Full-stack development with MERN, built responsive UIs, developed REST APIs, and handled MongoDB data.",
    icon: Target,
  },
];

const values = [
  {
    icon: Users,
    title: "User-First",
    description: "If users struggle, the feature failed—no matter how elegant the code.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Speed isn't a feature, it's a requirement. Every millisecond matters.",
  },
  {
    icon: Target,
    title: "Clarity",
    description: "Complex systems, simple interfaces. That's the real engineering challenge.",
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-glow-gradient opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm uppercase tracking-widest mb-4 block">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            More Than <span className="gradient-text">Just Code</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I believe the best products come from understanding both the
            technical possibilities and the human needs they serve.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-8">My Journey</h3>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="relative pl-8 border-l-2 border-border"
                >
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <item.icon className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-xs text-primary uppercase tracking-widest">
                    {item.year}
                  </span>
                  <h4 className="text-lg font-semibold mt-1 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-8">What I Value</h3>
            <div className="space-y-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className="glass-card p-6 group hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <value.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{value.title}</h4>
                      <p className="text-muted-foreground text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 mt-8"
            >
              {[
                { number: "8.15", label: "CGPA" },
                { number: "3+", label: "Projects" },
                { number: "2", label: "Internships" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card p-4 text-center"
                >
                  <div className="text-2xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
