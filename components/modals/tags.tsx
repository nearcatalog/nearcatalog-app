"use client";
// import { useState } from "react";
import Link from "next/link";
import { useTagsModalStore } from "@/store/tags-modal-store";
import Tags from "@/components/ui/tags";

interface TagsModalProps {
  top10Keys?: string[];
  remainingKeys?: string[];
  uniqueTags?: Record<string, string>;
  tagCounts?: Record<string, number>;
  remainingTags?: Record<string, string>;
  tags?: Record<string, string>;
}

function TagsModal({
  top10Keys,
  remainingKeys,
  uniqueTags,
  tagCounts = {},
  remainingTags,
  tags,
}: TagsModalProps) {
  const { isOpen, setIsOpen } = useTagsModalStore();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const finalUniqueTags = uniqueTags || tags || {};
  const allKeys = Object.keys(finalUniqueTags);
  const finalTop10 = top10Keys || allKeys.slice(0, 10);
  const finalRemainingKeys = remainingKeys || allKeys.slice(10);
  const finalRemainingTags =
    remainingTags ||
    Object.fromEntries(finalRemainingKeys.map((k) => [k, finalUniqueTags[k]]));

  return (
    <div>
      <button
        className="mb-8 flex w-full cursor-pointer items-center justify-between truncate rounded-[8px] border border-accent-primary/20 bg-accent-primary/5 px-4 py-3 text-white transition-all hover:border-accent-primary lg:hidden"
        onClick={handleToggle}
      >
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest">
          Explore All Categories
        </span>
        <i
          className={`bi bi-chevron-${isOpen ? "up" : "down"} flex h-4 w-4 items-center justify-center text-accent-primary`}
        />
      </button>
      {isOpen && (
        <div
          id="tags-list"
          className={`slide-container ${isOpen ? "slide-expanded" : "slide-collapsed"} mb-8 rounded-[8px] border border-white/5 bg-[#0d1117] p-4 lg:hidden`}
        >
          <div className="custom-scrollbar flex max-h-[60vh] w-full flex-col items-start space-y-2 overflow-y-auto pb-2 pr-2">
            {finalTop10.map((key) => (
              <Link
                key={key}
                href={`/category/${key}`}
                onClick={() => setIsOpen(false)}
                className="group flex w-full items-center justify-between border-l-2 border-transparent bg-white/5 px-4 py-3 font-mono text-[11px] font-bold text-white/70 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <span className="uppercase tracking-widest">
                  {finalUniqueTags[key]}
                </span>
                {tagCounts[key] !== undefined && (
                  <span className="rounded-sm bg-accent-primary/10 px-2 py-0.5 text-[9px] text-accent-primary transition-colors group-hover:bg-accent-primary group-hover:text-black">
                    {tagCounts[key]}
                  </span>
                )}
              </Link>
            ))}

            {finalRemainingKeys.length > 0 && (
              <div className="w-full pb-2 pt-6">
                <Tags
                  tags={finalRemainingTags}
                  className="justify-start gap-1.5"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TagsModal;
