"use client";

// import ProjectCard from "@/components/ui/project-card";
import { useDraggable } from "react-use-draggable-scroll";
import { useRef, useState, useEffect } from "react";
import { ProjectId, ProjectRecord } from "@/lib/types";
import ImageWithFallback from "@/components/ImageWithFallback";

interface ScrollableProjectsProps {
  projects: Record<ProjectId, ProjectRecord>;
}



function NewProjectCard({ project }: { project: ProjectRecord }) {
  const { profile } = project;

  const title = profile.name;
  const description = profile.tagline;

  return (
    <a
      style={{ userSelect: "none" }}
      href={`/project/${project.slug}`}
      className={`new-project-card grow-1 flex min-w-[12rem] gap-shrink-0 cursor-pointer flex-col items-center 
      justify-center gap-3 overflow-hidden rounded-lg px-1 py-2 transition-all duration-100
       ease-in-out md:py-3`}
    >
      <div className="flex w-full items-center gap-2 overflow-hidden md:items-center">
        <ImageWithFallback
          className="size-[3rem] rounded-full bg-gray-700 md:size-[3.5rem]"
          src={profile.image.url}
          alt={profile.name}
          width={80}
          height={80}
        />
        <div className="flex items-center gap-1">
          <h3 className="m-0 overflow-ellipsis break-words p-0 text-left text-[1rem] font-bold leading-tight text-white md:break-words flex items-center">
            {title}
          </h3>
        </div>
      </div>
    </a>
  );
}

// scrollable for new projects 

export default function NewScrollableProjects({
  projects,
}: ScrollableProjectsProps) {
  const projectKeys = Object.keys(projects);
  const containerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(containerRef, {
    applyRubberBandEffect: true, // activate rubber band effect
  });
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container;
        setShowLeftShadow(scrollLeft > 0);
        setShowRightShadow(scrollLeft < scrollWidth - clientWidth);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Initialize shadows on mount
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const scrollElement = containerRef.current;
    let scrollInterval: NodeJS.Timeout;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (scrollElement) {
          scrollElement.scrollLeft += 1;
          if (
            scrollElement.scrollLeft + scrollElement.clientWidth >=
            scrollElement.scrollWidth
          ) {
            scrollElement.scrollLeft = 0; // Reset scroll to top when it reaches the bottom
          }
        }
      }, 15); // Adjust the speed of scrolling here
    };

    if (!isHovered && !isTouched) {
      startScrolling();
    }

    return () => clearInterval(scrollInterval);
  }, [isHovered, isTouched]);

  return (
    <>

      <div id="new-scrollable-projects" className="relative max-w-full z-20 bg-[#11141B]">
        <div
          ref={containerRef}
          {...events}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsTouched(true)}
          onTouchEnd={() => setIsTouched(false)}
          className="no-scrollbar mt-4 md:mt-10 flex gap-4 overflow-x-scroll scrollbar-hide px-4"
        >
          {projectKeys.map((pid: any) => (
            <NewProjectCard project={projects[pid]} key={pid} />
          ))}
        </div>
      </div>


    </>
  );
}
