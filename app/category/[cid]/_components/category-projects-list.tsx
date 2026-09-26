"use client";

import { useState, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { ProjectId, ProjectRecord } from "@/lib/types";
import ProjectsList from "@/components/ui/project-list";
import Tags from "@/components/ui/tags";
import { useSearchStore } from "@/store/search-store";
import { usePathname } from "next/navigation";

const ITEMS_PER_PAGE = 12;

interface CategoryProjectsListProps {
  projects: Record<ProjectId, ProjectRecord>;
  tags: Record<string, string>;
}

export default function CategoryProjectsList({
  projects,
  tags
}: CategoryProjectsListProps) {
  const { showInactive } = useSearchStore();

  const filteredProjectsList = useMemo(() => {
    const list = Object.values(projects);
    if (showInactive) return list;
    return list.filter((project) => project.profile?.phase !== "inactive");
  }, [projects, showInactive]);

  const [displayedProjects, setDisplayedProjects] = useState<ProjectRecord[]>(
    [],
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();


  useEffect(() => {
    const endIndex = page * ITEMS_PER_PAGE;
    setDisplayedProjects(filteredProjectsList.slice(0, endIndex));
    setHasMore(endIndex < filteredProjectsList.length);
  }, [filteredProjectsList, page]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        const endIndex = nextPage * ITEMS_PER_PAGE;
        if (endIndex >= filteredProjectsList.length) {
          setHasMore(false);
        }
        return nextPage;
      });
    }
  }, [inView, hasMore, filteredProjectsList.length]);
  const pathname = usePathname();
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  return (
    <>
      <div className="mb-5 mt-5 border-y border-white/10 bg-black/60 backdrop-blur-md pt-6 pb-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent"></div>
        <div className="container mx-auto px-4 flex flex-col items-center gap-4 lg:gap-6 relative z-10 max-w-6xl">
          
          <div className="flex w-full items-center justify-between lg:hidden">
             <h3 className="cyber-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent-primary flex items-center gap-2">
               Filter Directory
             </h3>
             <button 
                onClick={() => setIsTagsOpen(!isTagsOpen)}
                className="text-[10px] font-mono border border-accent-primary/20 bg-accent-primary/5 px-3 py-1.5 rounded-[4px] text-white hover:border-accent-primary transition-colors flex items-center gap-2"
              >
                Categories <i className={`bi bi-chevron-${isTagsOpen ? "up" : "down"} text-accent-primary`}></i>
             </button>
          </div>

          <h3 className="hidden lg:flex cyber-mono text-[11px] font-bold uppercase tracking-[0.4em] text-accent-primary/80 items-center gap-3">
             <span className="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></span>
             Filter Directory
             <span className="w-2 h-2 bg-accent-primary rounded-full animate-pulse"></span>
          </h3>

           <div className={`${isTagsOpen ? "block" : "hidden"} lg:block w-full max-h-[50vh] lg:max-h-none overflow-y-auto lg:overflow-visible custom-scrollbar px-2`}>
             <Tags 
               tags={tags} 
               className="justify-start lg:justify-center max-w-full gap-1.5" 
               itemClassName="py-1 px-2 text-[9px]"
               activeTag={pathname.split('/').pop()} 
             />
           </div>
        </div>
      </div>
      <ProjectsList projects={displayedProjects} />
      {hasMore && <div ref={ref} style={{ height: "20px" }}></div>}
    </>
  );
}
