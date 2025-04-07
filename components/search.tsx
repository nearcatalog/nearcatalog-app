"use client";

import SearchInput from "@/components/search-input";
import Tags from "@/app/project/[pid]/_components/tags";

interface SearchProps {
  tags: Record<string, string>;
  autoSelect?: boolean;
}

export default function Search({ tags,autoSelect }: SearchProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative mb-4">
        <SearchInput autoSelect={autoSelect}/>
      </div>

      <div className="hidden md:block">
        <Tags tags={tags} />
      </div>
    </div>
  );
}
