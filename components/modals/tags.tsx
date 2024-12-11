"use client"
// import { useState } from "react";
import { useTagsModalStore } from "@/store/tags-modal-store";
import Tags from "@/app/project/[pid]/_components/tags";

interface TagsModalProps {
  tags: Record<string, string>;
}

function TagsModal({ tags }: TagsModalProps) {
  const { isOpen, setIsOpen } = useTagsModalStore();
  // const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="mt-4 flex w-full cursor-pointer items-center justify-between truncate rounded-lg border border-[#3F3F3F] bg-[#1A1A17] px-4 py-2 text-white md:hidden"
        onClick={handleToggle}
      >
        Explore All Categories
        <i
          className={`bi bi-chevron-${isOpen ? "up" : "down"} flex h-4 w-4 items-center justify-center text-xl`}
        />
      </button>
      {isOpen && (
        <div id="tags-list" className={`slide-container ${isOpen ? "slide-expanded" : "slide-collapsed"} md:hidden p-4 bg-[#11141B]`}>
          <div className="mb-2 flex flex-col gap-2">
            <Tags tags={tags} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TagsModal;
