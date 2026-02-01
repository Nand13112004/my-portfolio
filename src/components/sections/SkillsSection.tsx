import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Cloud, Palette, Server, Gauge, Workflow, Shield } from "lucide-react";

const skillData = [
  { skill: "Frontend", value: 95, fullMark: 100 },
  { skill: "Backend", value: 85, fullMark: 100 },
  { skill: "AI/ML", value: 80, fullMark: 100 },
  { skill: "Database", value: 85, fullMark: 100 },
  { skill: "APIs", value: 90, fullMark: 100 },
  { skill: "Deployment", value: 78, fullMark: 100 },
];

const problemCategories = [
  {
    icon: Cloud,
    title: "Cloud & Deployment",
    description:
      "Deploying and managing full-stack applications on modern cloud platforms.",
    techs: ["Netlify", "Vercel", "Render"],
  },
  {
    icon: Workflow,
    title: "ML Integration",
    description:
      "Connecting machine learning models to web applications for smart, data-driven features.",
    techs: ["Python", "TensorFlow", "REST APIs"],
  },
  {
    icon: Server,
    title: "API Architecture",
    description:
      "RESTful services with proper auth, validation, and error handling that just works.",
    techs: ["Express.js", "Node.js", "MongoDB"],
  },
  {
    icon: Gauge,
    title: "Performance Optimization",
    description:
      "From lazy loading to caching strategies—making apps feel instant.",
    techs: ["Next.js", "Image Optimization", "Code Splitting"],
  },
  {
    icon: Palette,
    title: "Responsive Interfaces",
    description:
      "Building clean, mobile-first interfaces that work seamlessly across all devices.",
    techs: ["Tailwind CSS", "React", "Framer Motion"],
  },
  {
    icon: Shield,
    title: "Security & Auth",
    description:
      "JWT, role-based permissions, and secure data handling done right.",
    techs: ["JWT", "RBAC", "Input Validation"],
  },
];

const techStack = {
  Frontend: ["React", "Next.js", "JavaScript", "Tailwind CSS", "HTML/CSS"],
  Backend: ["Node.js", "Express.js", "MongoDB", "REST APIs", "SQL"],
  "AI/ML": ["Python", "TensorFlow", "OpenAI API", "LangChain", "ML Models"],
  Tools: ["VS Code", "GitHub", "Postman", "MongoDB Atlas", "Netlify"],
};

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section id="skills" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-glow-gradient opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm uppercase tracking-widest mb-4 block">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Problems I <span className="gradient-text">Solve</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Skills are just tools. What matters is knowing when and how to use
            them to create solutions that users love.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-semibold mb-6 text-center">
              Skill Distribution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillData}>
                  <PolarGrid
                    stroke="hsl(var(--border))"
                    strokeOpacity={0.5}
                  />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  />
                  <Radar
                    name="Skills"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Problem Categories Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid gap-4"
          >
            {problemCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className={`glass-card p-6 cursor-pointer transition-all duration-300 ${
                  activeCategory === category.title
                    ? "ring-2 ring-primary/50"
                    : ""
                }`}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === category.title ? null : category.title
                  )
                }
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{category.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.techs.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-semibold text-center mb-12">
            Tech Stack
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(techStack).map(([category, techs], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="glass-card p-6"
              >
                <h4 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-full bg-secondary/50 text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
