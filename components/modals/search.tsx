"use client";

import { useSearchModalStore } from "@/store/search-modal-store";
import { useSearchStore } from "@/store/search-store";
import { useProjectsStore } from "@/store/projects-store";
import * as Dialog from "@radix-ui/react-dialog";
import SearchInput from "@/components/search-input";
import { ProjectRecord } from "@/lib/types";
import { useEffect } from "react";
import SearchProjects from "@/components/home/searchProjects";
import Tags from "@/components/ui/tags";

export default function SearchModal() {
  const { isOpen, setIsOpen, searchKey } = useSearchModalStore();
  const { showInactive } = useSearchStore();
  const { allProjects, fetchAllProjects } = useProjectsStore();

  // Trigger a fetch when the modal opens (no-op if already cached)
  useEffect(() => {
    if (isOpen) {
      fetchAllProjects();
    }
  }, [isOpen, fetchAllProjects]);

  const projectArray: ProjectRecord[] = allProjects
    ? Object.values(allProjects)
    : [];
  const activeProjects = showInactive
    ? projectArray
    : projectArray.filter(
        (project) => project.profile?.phase?.toLowerCase() !== "inactive",
      );

  let uniqueTags: Record<string, string> = {};

  activeProjects.forEach((project) => {
    Object.keys(project.profile.tags).forEach((key) => {
      if (!uniqueTags[key]) {
        uniqueTags[key] = project.profile.tags[key];
      }
    });
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-[.375rem]" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-[28.125rem] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-lg bg-[#1A1A17] px-6 pb-2 focus:outline-none md:max-w-[80%] lg:max-w-6xl">
          <div className="sticky -top-1 flex flex-col gap-2 bg-[#1A1A17] p-4">
            <Dialog.Title className="mb-2 flex items-center justify-between">
              <span className="text-lg font-medium">Search</span>
              <Dialog.Close>
                <i className="bi bi-x text-2xl" />
              </Dialog.Close>
            </Dialog.Title>
            <Dialog.Description className="hidden" />
            <SearchInput bgColor="#1A1A17" autoSelect={true} showClearButton/>
          </div>
          <div className="mb-4 flex flex-col gap-2 px-4">
            {searchKey !== "" ? (
              <SearchProjects searchKey={searchKey}/>
            ) : (
              <Tags tags={uniqueTags} handleTagClick={() => setIsOpen(false)} />
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
