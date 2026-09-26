"use client";

import site from "@/config/site";
import { ProjectRecord } from "@/lib/types";
import Link from "next/link";
import { useCallback, useState } from "react";

interface ShareDropdownProps {
  project: ProjectRecord;
}

export default function ShareDropdown({ project }: ShareDropdownProps) {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={toggleOpen}
        aria-label="Share dropdown"
        className={`flex items-center justify-center size-8 rounded-full border transition-all duration-300 ${
          open 
            ? "border-accent-primary bg-accent-primary/10 text-accent-primary shadow-[0_0_10px_rgba(0,255,163,0.2)]" 
            : "border-border-default bg-bg-surface text-gray-400 hover:border-accent-primary hover:text-accent-primary"
        }`}
      >
        <i className={`bi bi-three-dots-vertical text-sm transition-transform duration-300 ${open ? "rotate-90" : ""}`}></i>
      </button>
      
      {open && (
        <div className="absolute right-0 bottom-full mb-3 z-[100] flex min-w-[180px] flex-col overflow-hidden rounded-sm border border-white/10 bg-[#0A0A0A] p-1 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Link
            href={`https://x.com/intent/post?text=Check out ${project.profile.name} - ${project.profile.tagline}%0A${site.url}/project/${project.slug}%0A📒@nearcatalog`}
            target="_blank"
            rel="noreferrer nofollow"
            className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-white/70 hover:bg-white/5 hover:text-accent-primary transition-all whitespace-nowrap"
            onClick={() => setOpen(false)}
          >
            <i className="bi bi-twitter-x text-sm"></i>
            <span>Share on X</span>
          </Link>
          
          <div className="h-[1px] w-full bg-white/5 my-1"></div>
          
          <Link
            href={`https://submit.nearcatalog.xyz/feedback/?pid=${project.slug}&pname=${project.profile.name}&title=${project.profile.name}`}
            target="_blank"
            rel="noreferrer nofollow"
            className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-white/70 hover:bg-white/5 hover:text-accent-primary transition-all whitespace-nowrap"
            onClick={() => setOpen(false)}
          >
            <i className="bi bi-flag text-sm"></i>
            <span>Report or give feedback</span>
          </Link>
        </div>
      )}
    </div>
  );
}
