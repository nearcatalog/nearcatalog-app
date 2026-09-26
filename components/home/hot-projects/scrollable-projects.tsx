"use client";

import ProjectCard from "@/components/ui/project-card";
import { useDraggable } from "react-use-draggable-scroll";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { ProjectId, ProjectRecord } from "@/lib/types";
import { useSearchStore } from "@/store/search-store";

interface ScrollableProjectsProps {
  projects: Record<ProjectId, ProjectRecord>;
}

export default function ScrollableProjects({
  projects,
}: ScrollableProjectsProps) {
  const { showInactive } = useSearchStore();

  const filteredProjects = useMemo(() => {
    if (showInactive) return projects;
    return Object.fromEntries(
      Object.entries(projects).filter(([_, project]) => project.profile?.phase !== "inactive")
    );
  }, [projects, showInactive]);

  const projectKeys = Object.keys(filteredProjects);
  const containerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  const { events } = useDraggable(containerRef, {
    applyRubberBandEffect: true,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  const slide = useCallback((direction: "next" | "prev") => {
    const container = containerRef.current;
    if (container) {
      // Find the first child to get its width + gap
      const firstItem = container.firstElementChild as HTMLElement;
      const scrollAmount = firstItem ? firstItem.offsetWidth + 16 : container.clientWidth;
      
      container.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
      // Reset timer on manual slide
      setTimerKey((prev) => prev + 1);
    }
  }, []);

  const nextPage = () => slide("next");
  const prevPage = () => slide("prev");

  // Auto-sequence logic (5-second timer)
  useEffect(() => {
    if (isHovered || isTouched) return;

    const interval = setInterval(() => {
      const container = containerRef.current;
      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        const firstItem = container.firstElementChild as HTMLElement;
        const scrollAmount = firstItem ? firstItem.offsetWidth + 16 : clientWidth;

        // If we are at the end, jump back to start, else next page
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, isTouched, timerKey]); // timerKey resets the interval

  if (projectKeys.length === 0) {
    return null;
  }

  return (
    <div className="relative max-w-full z-20 mb-12">
      {/* Massive subtle radial spotlight background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,163,0.05)_0%,_transparent_70%)] pointer-events-none -z-10" />

      <div className="flex items-center justify-between mb-4 md:mb-6 px-4 md:px-1">
        <h3 className="text-[10px] md:text-[12px] font-bold text-accent-primary uppercase tracking-[0.2em] md:tracking-[0.4em] font-mono flex items-center gap-2 md:gap-3">
          <span className="w-1.5 h-1.5 bg-accent-primary rounded-full flex-shrink-0 shadow-[0_0_10px_#00FFA3]"></span> FEATURED PROJECTS
        </h3>
        
        {/* Navigation Controls */}
        <div className="flex items-center gap-2 opacity-80">
          <button 
            onClick={prevPage}
            className="font-mono text-white/50 hover:text-white transition-colors text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-accent-primary rounded"
            aria-label="Previous Page"
          >
            [ &lt; ]
          </button>
          <button 
            onClick={nextPage}
            className="font-mono text-white/50 hover:text-white transition-colors text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-accent-primary rounded"
            aria-label="Next Page"
          >
            [ &gt; ]
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        {...events}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsTouched(true)}
        onTouchEnd={() => setIsTouched(false)}
        className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-6 pt-10 snap-x snap-mandatory scroll-smooth"
        style={{ scrollPadding: '0 1rem' }}
      >
        {projectKeys.map((pid: any) => (
          <div 
            key={pid} 
            className="w-[85vw] md:w-[calc(50%-8px)] lg:w-[calc(33.333%-12px)] xl:w-[calc(25%-12px)] flex-shrink-0 flex items-stretch snap-center"
          >
            {/* The ProjectCard takes care of its own aesthetics (title, description config). 
                We rely on global CSS or its internal styles for radial hover glows. */}
            <ProjectCard project={filteredProjects[pid]} variant="featured" maxWidth={true} />
          </div>
        ))}
      </div>
    </div>
  );
}
