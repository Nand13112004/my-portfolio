"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/main/hero";

// Dynamically import heavy components so they don't block initial page load
const AboutMe = dynamic(() => import("@/components/main/AboutMe").then((mod) => mod.AboutMe));
const Projects = dynamic(() => import("@/components/main/projects").then((mod) => mod.Projects));
const TechStack3D = dynamic(() => import("@/components/main/TechStack3D").then((mod) => mod.TechStack3D), { 
  ssr: false, // 3D canvas does not need SSR and reduces server load and hydration time drastically
});
const ExtraSkills = dynamic(() => import("@/components/main/ExtraSkills").then((mod) => mod.ExtraSkills));
const Contact = dynamic(() => import("@/components/main/Contact").then((mod) => mod.Contact));

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-0">
        <Hero />
        <AboutMe />
        <Projects />
        <TechStack3D />
        <ExtraSkills />
        <Contact />
      </div>
    </main>
  );
}
