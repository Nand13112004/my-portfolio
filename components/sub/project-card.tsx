"use client";

import React from "react";
import { type IconType } from "react-icons";
import Image from "next/image";
import Link from "next/link";
import {
  SiPython, SiTensorflow, SiKeras, SiOpencv, SiNumpy, SiPandas,
  SiReact, SiNodedotjs, SiMongodb, SiExpress, SiTailwindcss,
  SiNextdotjs, SiTypescript, SiSocketdotio, SiVite, SiFramer, SiThreedotjs,
} from "react-icons/si";
import {
  FaGithub, FaExternalLinkAlt, FaBrain, FaVideo,
  FaSearch, FaChartBar, FaLock, FaCode,
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
    <span className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold border border-white/10 bg-white/5 text-gray-300 whitespace-nowrap">
      <Icon style={{ color: cfg.color }} size={11} />
      {name}
    </span>
  );
}

export type ProjectCardProps = {
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  link: string;
  github?: string;
  techStack: readonly string[];
  onClick?: () => void;
};

export const ProjectCard = ({
  title, subtitle, category, description,
  image, link, github, techStack, onClick
}: ProjectCardProps) => {
  return (
    <div
      onClick={onClick}
      className="w-[85vw] sm:w-[380px] h-[440px] shrink-0 cursor-pointer rounded-2xl border border-purple-900/40 bg-gradient-to-br from-[#07071a] via-[#0b0b20] to-[#0f0f2a] overflow-hidden flex flex-col group transition-all duration-300 hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-900/20"
      style={{ marginRight: "24px" }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07071a] via-black/30 to-transparent" />
        {/* Category badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-purple-500/50 bg-black/60 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-[9px] font-bold tracking-widest text-purple-300 uppercase">{category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 leading-tight">
            {title}
          </h2>
          <p className="text-[11px] text-white/40 mt-0.5">{subtitle}</p>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {techStack.slice(0, 4).map((t) => <TechBadge key={t} name={t} />)}
          {techStack.length > 4 && (
            <span className="flex items-center px-2 py-1 rounded-md text-[10px] text-gray-500 border border-white/5">
              +{techStack.length - 4}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          {github && (
            <Link
              href={github}
              target="_blank"
              rel="noreferrer noopener"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-[11px] font-semibold text-white hover:bg-white/10 transition-all"
            >
              <FaGithub size={12} /> Code
            </Link>
          )}
          {link && !link.includes("github.com") && (
            <Link
              href={link}
              target="_blank"
              rel="noreferrer noopener"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-500 text-[11px] font-semibold text-white hover:opacity-90 transition-all shadow-lg shadow-violet-900/30"
            >
              <FaExternalLinkAlt size={10} /> Live Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
