"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { type IconType } from "react-icons";
import {
  SiPython, SiTensorflow, SiKeras, SiOpencv, SiNumpy, SiPandas,
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss,
  SiNextdotjs, SiTypescript, SiSocketdotio, SiVite, SiFramer, SiThreedotjs,
} from "react-icons/si";
import {
  FaGithub, FaExternalLinkAlt, FaBrain, FaVideo,
  FaSearch, FaChartBar, FaLock, FaCode, FaCheckCircle, FaTimes
} from "react-icons/fa";

interface TechEntry { icon: IconType; color: string }

const TECH_CONFIG: Record<string, TechEntry> = {
  "Python":        { icon: SiPython,      color: "#3776AB" },
  "TensorFlow":    { icon: SiTensorflow,  color: "#FF6F00" },
  "Keras":         { icon: SiKeras,       color: "#D00000" },
  "OpenCV":        { icon: SiOpencv,      color: "#5C3EE8" },
  "NumPy":         { icon: SiNumpy,       color: "#4DABCF" },
  "Pandas":        { icon: SiPandas,      color: "#e8a838" },
  "React":         { icon: SiReact,       color: "#61DAFB" },
  "Node.js":       { icon: SiNodedotjs,   color: "#339933" },
  "MongoDB":       { icon: SiMongodb,     color: "#47A248" },
  "Express":       { icon: SiExpress,     color: "#aaaaaa" },
  "Tailwind CSS":  { icon: SiTailwindcss, color: "#06B6D4" },
  "Next.js":       { icon: SiNextdotjs,   color: "#ffffff" },
  "TypeScript":    { icon: SiTypescript,  color: "#3178C6" },
  "Socket.io":     { icon: SiSocketdotio, color: "#a78bfa" },
  "Vite":          { icon: SiVite,        color: "#646CFF" },
  "Framer Motion": { icon: SiFramer,      color: "#0055FF" },
  "Three.js":      { icon: SiThreedotjs,  color: "#ffffff" },
  "JWT":           { icon: FaLock,        color: "#8B5CF6" },
  "Gemini AI":     { icon: FaBrain,       color: "#a78bfa" },
  "WebRTC":        { icon: FaVideo,       color: "#6ee7b7" },
  "Recharts":      { icon: FaChartBar,    color: "#22c55e" },
  "SEO":           { icon: FaSearch,      color: "#4285F4" },
};

function TechBadge({ name }: { name: string }) {
  const cfg: TechEntry = TECH_CONFIG[name] ?? { icon: FaCode, color: "#9ca3af" };
  const Icon: IconType = cfg.icon;
  return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 bg-white/5 text-gray-300 whitespace-nowrap">
      <Icon style={{ color: cfg.color }} size={13} />
      {name}
    </span>
  );
}

const FEATURE_ICONS: IconType[] = [SiReact, FaBrain, SiMongodb, FaCode, FaChartBar];

export type ProjectDetails = {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  link: string;
  github?: string;
  features: readonly string[];
  techStack: readonly string[];
};

export const ProjectModal = ({
  project,
  onClose
}: {
  project: ProjectDetails;
  onClose: () => void;
}) => {

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling
    document.body.style.overflow = "hidden";
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl border border-purple-900/60 bg-gradient-to-br from-[#07071a] via-[#0b0b20] to-[#0f0f2a] shadow-2xl shadow-purple-900/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
        >
          <FaTimes size={18} />
        </button>

        {/* Background glow effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(88,28,235,0.12),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_5%_50%,rgba(6,182,212,0.06),transparent)] pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row min-h-[500px]">

          {/* ── LEFT: Text Content ──────────────────────────────────────────── */}
          <div className="flex flex-col justify-between gap-6 p-8 lg:p-12 flex-1 min-w-0">
            <div>
              {/* Category badge */}
              <div className="flex items-center gap-2 w-fit px-3 py-1 mb-4 rounded-full border border-purple-500/40 bg-purple-500/10">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-[11px] font-bold tracking-widest text-purple-300 uppercase">
                  {project.category}
                </span>
              </div>

              {/* Title + Subtitle */}
              <h2 className="text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400 leading-tight mb-2">
                {project.title}
              </h2>
              <p className="text-base lg:text-lg font-semibold text-white/70">{project.subtitle}</p>
            </div>

            {/* Description */}
            <p className="text-sm lg:text-base text-gray-400 leading-relaxed max-w-lg">{project.description}</p>

            {/* Key Features */}
            <div>
              <h3 className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3">
                Key Features
              </h3>
              <ul className="flex flex-col gap-2.5">
                {project.features.map((feat, i) => {
                  const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
                  return (
                    <li key={feat} className="flex items-start gap-3 text-sm text-gray-300 border-b border-white/5 pb-2 last:border-0">
                      <FaCheckCircle className="mt-0.5 shrink-0 text-purple-400" size={14} />
                      {feat}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <TechBadge key={t} name={t} />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4 mt-auto">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 bg-white/5 text-sm font-semibold text-white hover:bg-white/10 transition-all duration-200"
                >
                  <FaGithub size={16} />
                  View Code
                </Link>
              )}
              {project.link && !project.link.includes("github.com") && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-sm font-semibold text-white hover:opacity-90 transition-all duration-200 shadow-lg shadow-violet-900/30"
                >
                  <FaExternalLinkAlt size={13} />
                  Live Demo
                </Link>
              )}
            </div>
          </div>

          {/* ── RIGHT: Project Image ────────────────────────────────────────── */}
          <div className="relative lg:w-[48%] flex items-center justify-center p-8 lg:p-12 overflow-hidden bg-black/20">
            {/* Subtle inner glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-l from-purple-900/20 via-transparent to-transparent pointer-events-none" />

            <div className="relative w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/80 transition-transform duration-700 hover:scale-[1.02]">
              <Image
                src={project.image}
                alt={project.title}
                width={900}
                height={560}
                className="w-full object-cover"
              />
              {/* Scan-line overlay for the techy look */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
