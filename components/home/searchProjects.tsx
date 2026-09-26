"use client";

import { ProjectId, ProjectRecord } from "@/lib/types";
import { useSearchStore } from "@/store/search-store";
import { useProjectsStore } from "@/store/projects-store";
import { useEffect, useState, useMemo } from "react";
import ProjectSkeleton from "@/components/ui/project-skeleton";
import ProjectsList from "@/components/ui/project-list";
import ErrorImage from "@/public/assets/images/error.webp";
import Image from "next/image";
import { useDebounce } from "use-debounce";

interface SearchProjectsProps {
  searchKey?: string;
}

export default function SearchProjects({ searchKey }: SearchProjectsProps) {
  const { searchKey: globalSearchKey, showInactive } = useSearchStore();
  const { allProjects, allProjectsStatus, fetchAllProjects, searchProjects } =
    useProjectsStore();

  const [searchResults, setSearchResults] = useState<
    Record<ProjectId, ProjectRecord> | undefined
  >();
  const [searchLoading, setSearchLoading] = useState(false);

  const activeSearchKey = searchKey || globalSearchKey;
  const [debouncedSearchKey] = useDebounce(activeSearchKey, 1500);

  // Ensure all projects are loaded (no-op if already fetched or loading)
  useEffect(() => {
    if (!debouncedSearchKey) {
      fetchAllProjects();
    }
  }, [debouncedSearchKey, fetchAllProjects]);

  // Fetch search results when keyword changes
  useEffect(() => {
    if (!debouncedSearchKey) {
      setSearchResults(undefined);
      return;
    }

    setSearchLoading(true);
    searchProjects(debouncedSearchKey)
      .then((data) => setSearchResults(data))
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => setSearchLoading(false));
  }, [debouncedSearchKey, searchProjects]);

  // Determine which dataset to display
  const baseProjects: Record<ProjectId, ProjectRecord> | undefined =
    debouncedSearchKey ? searchResults : allProjects ?? undefined;

  const isLoading = debouncedSearchKey
    ? searchLoading
    : allProjectsStatus === "loading";

  const filteredProjects = useMemo(() => {
    if (!baseProjects) return undefined;
    if (showInactive) return baseProjects;

    return Object.fromEntries(
      Object.entries(baseProjects).filter(
        ([_, project]) => project.profile?.phase !== "inactive",
      ),
    );
  }, [baseProjects, showInactive]);

  if (!filteredProjects) {
    return isLoading ? (
      <div className="projects-list-skeleton mt-4 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <ProjectSkeleton key={index} />
        ))}
      </div>
    ) : (
      <div className="error-message mt-16 flex flex-col items-center justify-center gap-4 font-medium text-[#BEBDBE]">
        <Image
          src={ErrorImage}
          alt={"Not found error"}
          width={182}
          height={144}
        />
        <h2>🐲🐉🐶😺~</h2>
        <p className="text-2xl uppercase">{debouncedSearchKey}</p>
      </div>
    );
  }

  return (
    <>
      <ProjectsList projects={Object.values(filteredProjects)} />
    </>
  );
}
