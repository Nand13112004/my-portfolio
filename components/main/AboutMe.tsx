"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaUserCircle,
  FaBolt,
  FaEye,
  FaGraduationCap,
  FaBriefcase,
  FaCode,
} from "react-icons/fa";

// ─── Data ──────────────────────────────────────────────────────────────────────
const JOURNEY = [
  {
    year: "2023",
    title: "B.Tech @ CHARUSAT",
    desc: "Started Computer Engineering with CGPA 8.15. Focused on modern web technologies, UI/UX design, and building real-world projects.",
    icon: <FaGraduationCap size={16} />,
    color: "#a78bfa",
  },
  {
    year: "2024",
    title: "Python Intern @ InternPe",
    desc: "Built foundational programming skills, developed a Snake Game, and gained backend development exposure.",
    icon: <FaCode size={16} />,
    color: "#38bdf8",
  },
  {
    year: "2025",
    title: "MERN Intern @ Oasis Infobyte",
    desc: "Full-stack development with MERN, built responsive UIs, developed REST APIs, and handled MongoDB data.",
    icon: <FaBriefcase size={16} />,
    color: "#34d399",
  },
];

const VALUES = [
  {
    icon: <FaUserCircle size={22} />,
    title: "User-First",
    desc: "If users struggle, the feature failed—no matter how elegant the code.",
    color: "from-purple-500/20 to-purple-900/10",
    border: "border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    icon: <FaBolt size={22} />,
    title: "Performance",
    desc: "Speed isn't a feature, it's a requirement. Every millisecond matters.",
    color: "from-cyan-500/20 to-cyan-900/10",
    border: "border-cyan-500/30",
    iconColor: "text-cyan-400",
  },
  {
    icon: <FaEye size={22} />,
    title: "Clarity",
    desc: "Complex systems, simple interfaces. That's the real engineering challenge.",
    color: "from-emerald-500/20 to-emerald-900/10",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
];

const STATS = [
  { value: "7.82", label: "CGPA" },
  { value: "8+", label: "Projects" },
  { value: "2", label: "Internships" },
];

// ─── Fade-in wrapper ──────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : 0,
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export const AboutMe = () => {
  return (
    <section
      id="about"
      className="relative w-full pt-20 pb-8 px-4 sm:px-8 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Header ── */}
        <FadeIn>
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-sm font-semibold tracking-widest text-purple-400 uppercase mb-3">
              About Me
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              More Than{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Just Code
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-gray-400 text-sm sm:text-base leading-relaxed">
              I believe the best products come from understanding both the
              technical possibilities and the human needs they serve.
            </p>
          </div>
        </FadeIn>

        {/* ── Two-column content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT — Journey Timeline */}
          <div>
            <FadeIn delay={0.1} direction="left">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <span className="w-8 h-px bg-purple-500 inline-block" />
                My Journey
              </h3>
            </FadeIn>

            <div className="relative pl-6">
              {/* vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-emerald-500 opacity-40" />

              <div className="flex flex-col gap-10">
                {JOURNEY.map((item, i) => (
                  <FadeIn key={item.year} delay={0.15 + i * 0.15} direction="left">
                    <div className="relative group">
                      {/* dot */}
                      <div
                        className="absolute -left-6 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-125"
                        style={{
                          borderColor: item.color,
                          backgroundColor: item.color + "22",
                          color: item.color,
                        }}
                      >
                        <span className="text-[8px]">{item.icon}</span>
                      </div>

                      {/* card */}
                      <div className="ml-2 p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300">
                        <span
                          className="text-xs font-bold tracking-widest uppercase"
                          style={{ color: item.color }}
                        >
                          {item.year}
                        </span>
                        <h4 className="text-white font-semibold text-base mt-1 mb-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Values + Stats */}
          <div className="flex flex-col gap-6">
            <FadeIn delay={0.1} direction="right">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-8 h-px bg-cyan-500 inline-block" />
                What I Value
              </h3>
            </FadeIn>

            {VALUES.map((v, i) => (
              <FadeIn key={v.title} delay={0.2 + i * 0.12} direction="right">
                <div
                  className={`group p-5 rounded-2xl bg-gradient-to-br ${v.color} border ${v.border} backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 cursor-default`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-0.5 p-2 rounded-lg bg-white/10 ${v.iconColor} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {v.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-base mb-1">
                        {v.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}

            {/* Stats row */}
            <FadeIn delay={0.55} direction="right">
              <div className="mt-2 grid grid-cols-3 gap-4">
                {STATS.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.08] transition-all duration-300"
                  >
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                      {s.value}
                    </span>
                    <span className="text-gray-500 text-xs mt-1 uppercase tracking-wider">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
