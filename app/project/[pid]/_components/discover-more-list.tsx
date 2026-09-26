"use client";
import { ProjectId, ProjectRecord } from "@/lib/types";
import ProjectCard from "@/components/ui/project-card";
import { useSearchStore } from "@/store/search-store";
import { useMemo } from "react";

interface DiscoverMoreListProps {
  relatedProjects: Record<ProjectId, ProjectRecord>;
}

export default function DiscoverMoreList({ relatedProjects }: DiscoverMoreListProps) {
  const { showInactive } = useSearchStore();

  const filteredProjects = useMemo(() => {
    if (!relatedProjects) return undefined;
    if (showInactive) return relatedProjects;
    
    return Object.fromEntries(
      Object.entries(relatedProjects).filter(([_, project]) => project.profile?.phase !== "inactive")
    );
  }, [relatedProjects, showInactive]);

  if (!filteredProjects || Object.keys(filteredProjects).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 border-t border-border-default pt-12">
      <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Discover More</h2>
      <div className="discover-more grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.keys(filteredProjects).map((key) => (
          <ProjectCard key={key} project={filteredProjects[key]} maxWidth={true} />
        ))}
      </div>
    </div>
  );
}
