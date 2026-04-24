"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ProjectCard } from "@/components/sub/project-card";
import { ProjectModal, type ProjectDetails } from "@/components/sub/project-modal";
import { PROJECTS } from "@/constants";

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Use a ref for the paused state so the RAF loop never restarts on hover/touch
  const isPausedRef = useRef(false);
  const animationIdRef = useRef<number>(0);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isTouchScrollingRef = useRef(false); // true only when horizontal swipe detected

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const dx = Math.abs(e.touches[0].clientX - touchStartXRef.current);
    const dy = Math.abs(e.touches[0].clientY - touchStartYRef.current);
    // Only pause autoscroll for intentional horizontal swipes
    if (dx > dy && dx > 8) {
      isTouchScrollingRef.current = true;
      isPausedRef.current = true;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    isTouchScrollingRef.current = false;
    // Small delay before resuming so the momentum scroll can settle
    setTimeout(() => { isPausedRef.current = false; }, 600);
  }, []);

  const pause = useCallback(() => { isPausedRef.current = true; }, []);
  const resume = useCallback(() => { isPausedRef.current = false; }, []);


  // Use 3 copies for a truly infinite feel — we keep the scroll in the middle copy
  const duplicatedProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS];

  // Stable RAF loop — only runs once on mount
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Start in the middle set for immediate infinite feel
    const singleSetWidth = scroller.scrollWidth / 3;
    scroller.scrollLeft = singleSetWidth;

    let lastTime = performance.now();

    const scroll = (time: number) => {
      const deltaTime = Math.min(time - lastTime, 50);
      lastTime = time;

      if (!isPausedRef.current) {
        scroller.scrollLeft += deltaTime * 0.05;
        
        const singleSetWidth = scroller.scrollWidth / 3;
        // If we reach the start of the 3rd set, jump back to the start of the 2nd set
        if (scroller.scrollLeft >= singleSetWidth * 2) {
          scroller.scrollLeft -= singleSetWidth;
        }
      }

      animationIdRef.current = requestAnimationFrame(scroll);
    };

    animationIdRef.current = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationIdRef.current);
  }, []);

  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center py-20 overflow-hidden relative"
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
          /* GPU-accelerated scrolling for buttery touch experience */
          -webkit-overflow-scrolling: touch;
          will-change: scroll-position;
        }
      `}</style>

      <h1 className="text-3xl sm:text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-10 sm:py-20 text-center px-4">
        My Projects
      </h1>

      <div className="w-full flex flex-col gap-10">
        <div className="w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] group">
          <div
            ref={scrollerRef}
            className="flex w-full overflow-x-auto hide-scrollbar gap-6 py-4 px-[10vw]"
            style={{ touchAction: "pan-x" }}
            onMouseEnter={pause}
            onMouseLeave={resume}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {duplicatedProjects.map((project, index) => (
              <div
                key={`proj-${index}`}
                className="flex-shrink-0"
                style={{ willChange: "transform" }} // each card gets its own GPU layer
              >
                <ProjectCard
                  title={project.title}
                  subtitle={project.subtitle}
                  category={project.category}
                  description={project.description}
                  image={project.image}
                  link={project.link}
                  github={"github" in project ? (project as any).github : undefined}
                  techStack={project.techStack}
                  onClick={() => setSelectedProject(project as ProjectDetails)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
