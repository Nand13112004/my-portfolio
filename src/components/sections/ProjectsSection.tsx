import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ExternalLink,
  Users,
  BarChart3,
  Zap,
  Globe,
  Database,
  Layers,
  ArrowRight,
  Pizza,
  Brain,
  Github,
} from "lucide-react";

const projects = [
  {
    id: "varni-holidays",
    title: "Varni Holidays",
    subtitle: "Travel & Holiday Booking Platform",
    category: "Full-Stack Web Application",
    liveUrl: "https://varnitours.com",
    problem:
      "Travel agencies needed a way to showcase packages and handle inquiries without complex booking systems, with non-technical admins managing content.",
    constraints: [
      "Non-technical admin users",
      "SEO critical for discovery",
      "WhatsApp-first customer base",
      "Performance optimization needed",
    ],
    uxDecisions: [
      "Admin-controlled hero slider for seasonal promotions",
      "WhatsApp integration for natural booking flow",
      "Package cards with clear CTAs",
      "SEO-friendly routing structure",
    ],
    architecture: [
      "Next.js + React + Tailwind CSS",
      "Node.js & Express backend APIs",
      "MongoDB for flexible content",
      "Deployed on Netlify (FE) & Render (BE)",
    ],
    outcome:
      "Reduced admin workload by 60% with easy content management. Increased inquiries through streamlined WhatsApp booking flow.",
    metrics: [
      { label: "Page Speed", value: "95+" },
      { label: "SEO Score", value: "98" },
      { label: "Admin Time", value: "-60%" },
    ],
    color: "from-blue-500/20 to-cyan-500/20",
    icon: Globe,
  },
  {
    id: "mozzinoz",
    title: "Mozzinoz",
    subtitle: "Online Pizza Delivery Web App",
    category: "Full-Stack MERN Application",
    liveUrl: "https://mozzinoz.netlify.app",
    problem:
      "Building a complete pizza ordering experience with user authentication, order management, and admin dashboard for restaurant operations.",
    constraints: [
      "User authentication required",
      "Role-based admin access",
      "Real-time order management",
      "Secure payment flow",
    ],
    uxDecisions: [
      "Intuitive menu browsing with filters",
      "Streamlined cart and checkout flow",
      "Order tracking for customers",
      "Admin dashboard for order management",
    ],
    architecture: [
      "React frontend with Tailwind CSS",
      "Node.js & Express REST APIs",
      "MongoDB Atlas database",
      "JWT authentication system",
    ],
    outcome:
      "Complete end-to-end pizza ordering platform with seamless user experience and efficient admin operations.",
    metrics: [
      { label: "Auth Flow", value: "Secure" },
      { label: "API Response", value: "<200ms" },
      { label: "UX Score", value: "A+" },
    ],
    color: "from-orange-500/20 to-red-500/20",
    icon: Pizza,
  },
  {
    id: "mockmate",
    title: "MockMate",
    subtitle: "AI-Powered Interview System",
    category: "AI/ML Web Application",
    githubUrl: "https://github.com/Nand13112004/Ai_Powered_Interview_System",
    problem:
      "Job seekers need practice for interviews but lack access to quality mock interview experiences with personalized feedback.",
    constraints: [
      "LLM integration complexity",
      "Real-time feedback generation",
      "Multiple interview modes",
      "Performance tracking",
    ],
    uxDecisions: [
      "Guided interview flow with clear progress",
      "Multiple interview mode selection",
      "Instant AI-generated feedback display",
      "User performance history dashboard",
    ],
    architecture: [
      "React with modern UI components",
      "LLM-powered question generation",
      "Node.js & Express backend",
      "MongoDB for user data & history",
    ],
    outcome:
      "AI-based mock interview platform enabling users to practice and improve with automated feedback and performance tracking.",
    metrics: [
      { label: "AI Accuracy", value: "High" },
      { label: "Interview Modes", value: "Multi" },
      { label: "Feedback", value: "Instant" },
    ],
    color: "from-purple-500/20 to-pink-500/20",
    icon: Brain,
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  return (
    <section id="projects" className="py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm uppercase tracking-widest mb-4 block">
            Case Studies
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real projects, real problems, real solutions. Each case study
            explores the journey from challenge to implementation.
          </p>
        </motion.div>

        {/* Project Cards */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div
                className={`case-study-card cursor-pointer transition-all duration-500 ${
                  expandedProject === project.id
                    ? "ring-2 ring-primary/50"
                    : ""
                }`}
                onClick={() =>
                  setExpandedProject(
                    expandedProject === project.id ? null : project.id
                  )
                }
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-br ${project.color}`}
                    >
                      <project.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-widest">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <p className="text-muted-foreground">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Site
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-sm font-medium transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </motion.a>
                    )}
                    <motion.div
                      animate={{ rotate: expandedProject === project.id ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </motion.div>
                  </div>
                </div>

                {/* Problem Statement */}
                <p className="text-foreground mb-6">{project.problem}</p>

                {/* Metrics Preview */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="text-center p-4 rounded-xl bg-secondary/30"
                    >
                      <div className="text-2xl font-bold text-primary">
                        {metric.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expanded Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedProject === project.id ? "auto" : 0,
                    opacity: expandedProject === project.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 border-t border-border space-y-8">
                    {/* Constraints */}
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                        Constraints
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.constraints.map((constraint) => (
                          <span
                            key={constraint}
                            className="px-3 py-1 rounded-full bg-secondary/50 text-sm"
                          >
                            {constraint}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Two Column: UX & Architecture */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Layers className="w-4 h-4" /> UX Decisions
                        </h4>
                        <ul className="space-y-2">
                          {project.uxDecisions.map((decision) => (
                            <li
                              key={decision}
                              className="flex items-start gap-2 text-sm"
                            >
                              <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              {decision}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Database className="w-4 h-4" /> Architecture
                        </h4>
                        <ul className="space-y-2">
                          {project.architecture.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-sm"
                            >
                              <BarChart3 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Outcome */}
                    <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20">
                      <h4 className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">
                        Outcome
                      </h4>
                      <p className="text-foreground">{project.outcome}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
