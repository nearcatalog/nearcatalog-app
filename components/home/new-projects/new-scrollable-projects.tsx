"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { ProjectId, ProjectRecord } from "@/lib/types";
import { useSearchStore } from "@/store/search-store";
import ProjectCard from "@/components/ui/project-card";

interface ScrollableProjectsProps {
  projects: Record<ProjectId, ProjectRecord>;
}

export default function NewScrollableProjects({
  projects,
}: ScrollableProjectsProps) {
  const { showInactive } = useSearchStore();
  
  const containerRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(containerRef, {
    applyRubberBandEffect: true,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const filteredProjects = useMemo(() => {
    if (showInactive) return projects;
    return Object.fromEntries(
      Object.entries(projects).filter(([_, project]) => project.profile?.phase !== "inactive")
    );
  }, [projects, showInactive]);

  const projectKeys = Object.keys(filteredProjects);

  // JS-based continuous marquee logic
  useEffect(() => {
    if (projectKeys.length === 0 || isHovered || isTouched) return;

    const interval = setInterval(() => {
      const container = containerRef.current;
      if (container) {
        container.scrollLeft += 1;
        // Reset when we approach the end
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 5) {
          container.scrollLeft = 0;
        }
      }
    }, 20); // smooth, constant pixel-push

    return () => clearInterval(interval);
  }, [isHovered, isTouched, projectKeys.length]);

  if (projectKeys.length === 0) {
    return null;
  }

  // Cap at 10 items — duplicated for seamless loop = max 40 nodes
  // More than this causes GPU overload from glow-card backdrop-filter on each card
  const cappedKeys = projectKeys.slice(0, 10);
  const allKeys = [...cappedKeys, ...cappedKeys];

  return (
    <div id="new-scrollable-projects" className="relative max-w-full z-20 mb-6 md:mb-10 overflow-hidden">
      <h4 className="text-[11px] font-bold text-accent-primary mb-4 md:mb-4 uppercase tracking-[0.4em] font-mono flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-accent-primary rounded-full"></span> New Projects
      </h4>

      {/* Outer mask for fade edges */}
      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsTouched(true)}
        onTouchEnd={() => setIsTouched(false)}
      >
        {/* Scrollable inner wrapper controlled by useDraggable */}
        <div
          ref={containerRef}
          {...events}
          className="no-scrollbar flex gap-2.5 pb-1 overflow-x-auto pt-2"
        >
          {allKeys.map((pid: any, idx: number) => (
            <div
              key={`${pid}-${idx}`}
              className="w-[230px] md:w-[250px] lg:w-[270px] flex-shrink-0 flex items-stretch"
              aria-hidden={idx >= cappedKeys.length}
            >
              <ProjectCard
                project={filteredProjects[pid]}
                variant="compact"
                showTags={false}
                maxWidth={true}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
