"use client";

import ProjectCard from "@/components/ui/project-card";
import { ProjectId, ProjectRecord } from "@/lib/types";
import { useSearchStore } from "@/store/search-store";
import { useMemo } from "react";

interface TrendingListProps {
    projects: Record<ProjectId, ProjectRecord>;
}

export default function TrendingList({ projects }: TrendingListProps) {
    const { showInactive } = useSearchStore();

    const filteredProjects = useMemo(() => {
        const list = Object.values(projects);
        if (showInactive) return list;
        return list.filter(project => project.profile?.phase !== "inactive");
    }, [projects, showInactive]);

    return (
        <div className="mt-25 max-w-full">
            <div className="projects-list mt-4 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.slug} project={project} maxWidth />
                ))}
            </div>
        </div>
    );
}
