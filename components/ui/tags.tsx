"use client";
import Link from "next/link";

interface TagsProps {
  tags: Record<string, string> | string[];
  className?: string;
  itemClassName?: string;
  onClick?: (tag: string) => void;
  activeTag?: string;
  variant?: 'default' | 'compact';
}

export default function Tags({ 
  tags, 
  className = "", 
  itemClassName = "", 
  onClick, 
  handleTagClick, 
  activeTag,
  variant = 'default'
}: TagsProps & { handleTagClick?: (tag: string) => void }) {
  const isArray = Array.isArray(tags);
  const tagEntries = isArray ? tags : Object.entries(tags);
  const clickHandler = onClick || handleTagClick;

  const isCompact = variant === 'compact';

  return (
    <div className={`tags flex flex-wrap items-center ${isCompact ? 'gap-x-2.5 gap-y-1' : 'gap-1.5'} ${className}`}>
      {tagEntries.map((tag, index) => {
        const key = isArray ? tag as string : (tag as [string, string])[0];
        const label = isArray ? tag as string : (tag as [string, string])[1];
        const isActive = activeTag === key;

        if (isCompact) {
          return (
            <div key={index} className="flex items-center gap-2">
              <span className={`text-[10px] font-bold font-mono ${index === 0 ? "text-accent-primary" : "text-white/40"}`}>
                {label}
              </span>
              {index < tagEntries.length - 1 && <span className="w-1 h-1 bg-white/20 rounded-full"></span>}
            </div>
          );
        }

        const baseStyles = `project-tag flex items-center justify-center gap-1 transition-all duration-300 rounded-[2px] border border-white/10 bg-white/5 py-1.5 px-3 text-[10px] font-mono font-bold tracking-[0.1em] hover:border-accent-primary hover:bg-accent-primary/10 hover:text-accent-primary hover:shadow-[0_0_10px_rgba(0,255,163,0.2)]`;
        const stateStyles = isActive 
          ? "border-accent-primary bg-accent-primary/20 text-accent-primary shadow-[0_0_15px_rgba(0,255,163,0.25)] scale-[1.05]"
          : "text-white/60 hover:scale-[1.05]";

        if (clickHandler) {
          return (
            <button
              key={key}
              onClick={() => clickHandler(key)}
              className={`${baseStyles} ${stateStyles} ${itemClassName}`}
            >
              {label}
            </button>
          );
        }

        return (
          <Link
            key={index}
            href={`/category/${key}`}
            className={`${baseStyles} ${stateStyles} ${itemClassName}`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
