"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ProjectId, ProjectRecord } from "@/lib/types";
import ProjectsList from "@/components/ui/project-list";
import TagsModal from "@/components/modals/tags";
import Tags from "@/app/project/[pid]/_components/tags";

const ITEMS_PER_PAGE = 12;

interface CategoryProjectsListProps {
  projects: Record<ProjectId, ProjectRecord>;
  tags: Record<string, string>;
}

export default function CategoryProjectsList({
  projects,
  tags
}: CategoryProjectsListProps) {
  const [projectsList] = useState(Object.values(projects));
  const [displayedProjects, setDisplayedProjects] = useState<ProjectRecord[]>(
    [],
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();


  useEffect(() => {
    const endIndex = page * ITEMS_PER_PAGE;
    setDisplayedProjects(projectsList.slice(0, endIndex));
    setHasMore(endIndex < projectsList.length);
  }, [projectsList, page]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        const endIndex = nextPage * ITEMS_PER_PAGE;
        if (endIndex >= projectsList.length) {
          setHasMore(false);
        }
        return nextPage;
      });
    }
  }, [inView, hasMore, projectsList.length]);

  return (
    <>
      <div className="hidden md:block"><Tags tags={tags} /></div>
      <TagsModal tags={tags} />
      <ProjectsList projects={displayedProjects} />
      {hasMore && <div ref={ref} style={{ height: "20px" }}></div>}
    </>
  );
}
