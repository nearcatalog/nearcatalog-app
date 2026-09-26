"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { NewsType } from "@/lib/types";

function NewsItem({ news }: { news: NewsType }) {
    return (
        <a
            style={{ userSelect: "none" }}
            rel="noindex noreferrer nofollow"
            href={`${news.url}`}
            className="group flex w-full cursor-pointer items-center justify-between border border-accent-primary/20 bg-accent-primary/5 px-4 py-2 md:px-6 md:py-2.5 transition-all duration-300 hover:border-accent-primary hover:bg-accent-primary/10 hover:shadow-[0_0_15px_rgba(0,255,163,0.15)] rounded-none animate-in fade-in duration-500"
        >
            <div className="flex items-center gap-3 md:gap-4 pr-16 md:pr-24 overflow-hidden">
                <span className="flex h-1.5 w-1.5 relative flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-primary"></span>
                </span>
                <span className="hidden md:inline-block text-[9px] font-bold tracking-[0.2em] text-accent-primary font-mono uppercase flex-shrink-0">LATEST_INTEL</span>
                <div className="hidden md:block h-3 w-[1px] bg-white/20 flex-shrink-0"></div>
                <p className="font-heading text-xs md:text-sm font-semibold text-white group-hover:text-accent-primary transition-colors ">{news.title}</p>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 absolute right-16 md:right-24">
                <span className="text-[10px] font-mono font-bold text-accent-primary uppercase tracking-widest hidden md:inline-block">READ</span>
                <i className="bi bi-arrow-right text-accent-primary"></i>
            </div>
        </a>
    );
}

export default function TopNews({ news }: { news: Record<string, NewsType> | null }) {
    // Move all hooks to the top
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const projectKeys = news ? Object.keys(news) : [];
    
    // Navigation functions need to be defined even if news is empty
    const goToNext = useCallback((e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (projectKeys.length === 0) return;
        setCurrentIndex((prevIndex) =>
            prevIndex === projectKeys.length - 1 ? 0 : prevIndex + 1
        );
    }, [projectKeys.length]);

    const goToPrev = useCallback((e?: React.MouseEvent) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (projectKeys.length === 0) return;
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? projectKeys.length - 1 : prevIndex - 1
        );
    }, [projectKeys.length]);

    // Auto-transition effect must be defined before any returns
    useEffect(() => {
        // Don't set up interval if there are no news items
        if (projectKeys.length === 0) return;
        
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (!isHovered && !isTouched) {
            intervalRef.current = setInterval(() => {
                goToNext();
            }, 5000); // Change news every 5 seconds
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isHovered, isTouched, projectKeys.length, goToNext]);

    // Early return after all hooks are called
    if (!news || projectKeys.length === 0) return null;

    return (
        <div
            id="top-news-carousel"
            className="relative z-20 flex justify-center w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 mt-2 md:mb-16 md:mt-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsTouched(true)}
            onTouchEnd={() => setIsTouched(false)}
            ref={containerRef}
        >
            <div className="relative w-full">
                {/* Current news item */}
                <div className="transition-opacity duration-300 relative">
                    <NewsItem news={news[projectKeys[currentIndex]]} key={projectKeys[currentIndex]} />
                </div>

                {/* Pagination indicators with navigation buttons */}
                <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                    <div className="pointer-events-auto flex items-center bg-black/50 backdrop-blur-md border border-white/10 rounded-sm">
                        <button
                            onClick={goToPrev}
                            className="text-white/40 hover:text-accent-primary hover:bg-white/5 transition-all px-2 md:px-3 py-1.5 md:py-2 border-r border-white/10"
                            aria-label="Previous news"
                        >
                            <i className="bi bi-chevron-left text-xs md:text-sm"></i>
                        </button>

                        <button
                            onClick={goToNext}
                            className="text-white/40 hover:text-accent-primary hover:bg-white/5 transition-all px-2 md:px-3 py-1.5 md:py-2"
                            aria-label="Next news"
                        >
                            <i className="bi bi-chevron-right text-xs md:text-sm"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
