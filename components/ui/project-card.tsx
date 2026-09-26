"use client";
import { useRouter } from "next/navigation";
import { ProjectRecord } from "@/lib/types";
import { useSearchStore } from "@/store/search-store";
import { useSearchModalStore } from "@/store/search-modal-store";
import ImageWithFallback from "../ImageWithFallback";
import Tags from "./tags";

interface ProjectCardProps {
  project: ProjectRecord;
  maxWidth?: boolean;
  onClick?: () => void;
  variant?: "default" | "compact" | "featured";
  showTags?: boolean;
}

export default function ProjectCard({
  project,
  maxWidth,
  variant = "default",
  showTags = true,
}: ProjectCardProps) {
  const router = useRouter();
  const { setSearchKey } = useSearchStore();
  const { isOpen: searchModalOpen, setIsOpen: setSearchModalOpen } =
    useSearchModalStore();
  const { profile } = project;

  const title = profile.name;
  const description = profile.tagline;

  const isCompact = variant === "compact";
  const isFeatured = variant === "featured";

  return (
    <a
      style={{ userSelect: "none" }}
      href={`/project/${project.slug}`}
      className={`project-card glow-card group/card grow-1 relative flex w-full snap-start ${maxWidth ? "" : "max-w-[20rem]"} shrink-0 cursor-pointer flex-col overflow-hidden border-white/5 bg-gradient-to-br from-white/[0.04] to-transparent transition-all duration-300 ${isCompact ? "min-h-[90px] p-3.5" : isFeatured ? "min-h-[360px] items-center justify-center p-8 text-center" : "min-h-[140px] p-5"}`}
    >
      {/* Ambient Backdrop — skip on compact to avoid GPU overload in marquee (many cards rendered simultaneously) */}
      {!isCompact && (
        <div
          className={`pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-300 ${isFeatured ? "opacity-25 saturate-150" : "opacity-10 saturate-100 group-hover/card:opacity-15"}`}
        >
          <ImageWithFallback
            src={profile.image.url}
            alt={profile.name}
            fill
            className="scale-150 object-cover blur-xl"
          />
        </div>
      )}

      {isFeatured && (
        <>
          {/* Energy Background Glow */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom,_rgba(0,255,163,0.15)_0%,_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />

          {/* Contrast Protection Overlay */}
          <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </>
      )}

      {isFeatured ? (
        <div className="relative z-10 mb-2 mt-4 flex w-full flex-col items-center gap-6">
          <div className="squircle-icon size-[100px] flex-shrink-0 overflow-hidden border border-white/20 bg-[#0d1117] shadow-[0_0_20px_rgba(255,255,255,0.08)]">
            <ImageWithFallback
              className="h-full w-full rounded-[inherit] object-cover"
              src={profile.image.url}
              alt={profile.name}
              width={120}
              height={120}
            />
          </div>
          <div className="flex w-full flex-col items-center gap-3">
            <h4 className="font-heading text-2xl font-bold tracking-wide text-white transition-colors group-hover/card:text-[#00FFA3] group-hover/card:drop-shadow-[0_0_12px_rgba(0,255,163,0.5)]">
              {title}
            </h4>
            <p className="mx-auto max-w-[90%] px-2 text-sm font-normal leading-relaxed text-white/80">
              {description}
            </p>
            {showTags && (
              <div className="mt-2 flex w-full justify-center">
                <Tags
                  tags={profile.tags}
                  variant="compact"
                  className="justify-center opacity-90"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            className={`relative z-10 flex items-center gap-3 ${isCompact ? "mb-1.5" : "mb-4"}`}
          >
            <div
              className={`${isCompact ? "size-9" : "size-12"} squircle-icon flex-shrink-0 overflow-hidden border border-white/20 bg-[#0d1117] shadow-[0_0_10px_rgba(255,255,255,0.05)]`}
            >
              <ImageWithFallback
                className="h-full w-full rounded-[inherit] object-cover"
                src={profile.image.url}
                alt={profile.name}
                width={isCompact ? 72 : 96}
                height={isCompact ? 72 : 96}
              />
            </div>
            <div className="min-w-0">
              <h4
                className={`font-heading font-bold text-white transition-colors group-hover/card:text-[#00FFA3] group-hover/card:drop-shadow-[0_0_8px_rgba(0,255,163,0.5)] ${isCompact ? "text-[13px] leading-tight" : "text-base"}`}
              >
                {title}
              </h4>
              {showTags && (
                <Tags
                  tags={profile.tags}
                  variant="compact"
                  className="mt-0.5"
                />
              )}
            </div>
          </div>
          <p
            className={`relative z-10 ${isCompact ? "line-clamp-2 text-[10px]" : "text-sm"} font-normal leading-snug text-white/90`}
          >
            {description}
          </p>
        </>
      )}
    </a>
  );
}
