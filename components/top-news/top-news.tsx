"use client";

import { useRef, useState, useEffect } from "react";
import { NewsType } from "@/lib/types";

function NewsItem({ news }: { news: NewsType }) {
    return (
        <a
            style={{ userSelect: "none" }}
            rel="noindex"
            href={`${news.url}`}
            className="top-news w-full cursor-pointer overflow-hidden rounded-lg px-1 py-2 transition-all duration-300 ease-in-out md:py-3"
        >
            <div className="news-item w-full flex items-start">
                <div className="flex-shrink-0 mr-2">
                    <i className="bi bi-megaphone-fill text-lg text-red-500"></i>
                </div>
                <div className="flex-1 text-left">
                    <p className="block w-full">{news.title}
                    {news.url && (
                        <i className="bi bi-box-arrow-up-right ml-1 text-xs text-gray-400"></i>
                    )}
                    </p>

                </div>
            </div>
        </a>
    );
}

export default function TopNews({ news }: { news: Record<string, NewsType> | null }) {
    // Move hooks to the top
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // If no news, don't render anything
    if (!news) return <></>;

    const projectKeys = Object.keys(news);

    // Navigation functions
    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === projectKeys.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? projectKeys.length - 1 : prevIndex - 1
        );
    };

    // Auto-transition effect
    useEffect(() => {
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
    }, [isHovered, isTouched]);

    if (projectKeys.length === 0) return null;

    return (
        <div
            id="top-news-carousel"
            className="relative container z-20 flex justify-center my-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsTouched(true)}
            onTouchEnd={() => setIsTouched(false)}
            ref={containerRef}
        >
            <div className="relative py-2 px-2 w-full md:w-3/4 lg:w-1/2 xl:ml-[160px]">
                {/* Current news item */}
                <div className="transition-opacity duration-300 mb-5 relative">
                    <NewsItem news={news[projectKeys[currentIndex]]} key={projectKeys[currentIndex]} />
                </div>

                {/* Pagination indicators with navigation buttons */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1 pb-1">
                    <button
                        onClick={goToPrev}
                        className="bg-black/30 hover:bg-black/50 text-white rounded-full p-1"
                        aria-label="Previous news"
                    >
                        <i className="bi bi-chevron-left text-xs"></i>
                    </button>

                    <div className="flex justify-center gap-0.5 opacity-60">
                        {projectKeys.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1 rounded-full transition-all ${
                                    idx === currentIndex ? 'bg-white/80 w-2.5' : 'bg-gray-500/40 w-1.5'
                                }`}
                                aria-label={`Go to news item ${idx + 1}`}
                            ></button>
                        ))}
                    </div>

                    <button
                        onClick={goToNext}
                        className="bg-black/30 hover:bg-black/50 text-white rounded-full p-1"
                        aria-label="Next news"
                    >
                        <i className="bi bi-chevron-right text-xs"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
