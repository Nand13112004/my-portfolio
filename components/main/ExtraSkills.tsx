"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  SiNextdotjs,
  SiExpress,
  SiJavascript,
  SiHtml5,
  SiDocker,
  SiPostgresql,
  SiSocketdotio,
  SiFigma,
  SiPostman,
  SiVercel,
  SiCplusplus,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";
import { FaCss3Alt } from "react-icons/fa";

// ─── PNG-based icon (transparent bg) ─────────────────────────────────────────
const ImgIcon = ({ src, alt }: { src: string; alt: string }) => (
  <Image
    src={src}
    alt={alt}
    width={22}
    height={22}
    className="object-contain"
    style={{ background: "transparent" }}
  />
);

// ─── Data ─────────────────────────────────────────────────────────────────────
const EXTRA_SKILLS = [
  { name: "Next.js",    icon: <SiNextdotjs />,                                   color: "#e2e8f0" },
  { name: "Express.js", icon: <SiExpress />,                                     color: "#d1d5db" },
  { name: "JavaScript", icon: <SiJavascript />,                                  color: "#facc15" },
  { name: "HTML5",      icon: <SiHtml5 />,                                       color: "#f97316" },
  { name: "CSS3",       icon: <FaCss3Alt />,                                     color: "#38bdf8" },
  { name: "Docker",     icon: <SiDocker />,                                      color: "#22d3ee" },
  { name: "PostgreSQL", icon: <SiPostgresql />,                                  color: "#60a5fa" },
  { name: "Socket.io",  icon: <SiSocketdotio />,                                 color: "#d1d5db" },
  { name: "Figma",      icon: <SiFigma />,                                       color: "#fb923c" },
  { name: "VS Code",    icon: <VscCode />,                                       color: "#38bdf8" },
  { name: "Postman",    icon: <SiPostman />,                                     color: "#f97316" },
  { name: "Vercel",     icon: <SiVercel />,                                      color: "#e2e8f0" },
  { name: "C++",        icon: <SiCplusplus />,                                   color: "#60a5fa" },
  { name: "GitHub",     icon: <ImgIcon src="/skills/github.png"  alt="GitHub"  />, color: "#e2e8f0" },
  { name: "Vite",       icon: <ImgIcon src="/skills/vite.png"    alt="Vite"    />, color: "#a78bfa" },
  { name: "Prisma",     icon: <ImgIcon src="/skills/prisma.png"  alt="Prisma"  />, color: "#60a5fa" },
  { name: "Stripe",     icon: <ImgIcon src="/skills/stripe.png"  alt="Stripe"  />, color: "#7c3aed" },
  { name: "Framer",     icon: <ImgIcon src="/skills/framer.png"  alt="Framer"  />, color: "#e879f9" },
  { name: "Firebase",   icon: <ImgIcon src="/skills/firebase.png" alt="Firebase"/>, color: "#fb923c" },
];

// ─── Component ────────────────────────────────────────────────────────────────
export const ExtraSkills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="extra-skills"
      ref={ref}
      className="relative w-full py-10 px-4 sm:px-8 bg-transparent"
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-purple-400 uppercase bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            More Tools &amp; Languages
          </span>
          <p className="text-gray-500 text-sm">
            Additional technologies I&apos;m comfortable working with
          </p>
        </motion.div>

        {/* Skill chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {EXTRA_SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.04, ease: "easeOut" }}
              whileHover={{ scale: 1.1, y: -4 }}
              className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/10 bg-transparent cursor-default select-none hover:border-white/25 transition-all duration-300"
            >
              {/* hover glow */}
              <span
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                style={{ background: `${skill.color}12` }}
              />

              <span
                className="text-xl relative z-10 transition-transform duration-300 group-hover:scale-110 flex items-center"
                style={{ color: skill.color }}
              >
                {skill.icon}
              </span>

              <span className="relative z-10 text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                {skill.name}
              </span>

              {/* bottom accent */}
              <span
                className="absolute bottom-0 left-4 right-4 h-px opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-full"
                style={{ background: skill.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
