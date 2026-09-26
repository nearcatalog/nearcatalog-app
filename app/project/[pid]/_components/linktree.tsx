import { ProjectRecord } from "@/lib/types";
import Link from "next/link";
import ShareDropdown from "./share-dropdown";
import Image from "next/image";
import ImageWithFallback from "@/components/ImageWithFallback";

interface LinkTreeProps {
  project: ProjectRecord;
}

export default function LinkTree({ project }: LinkTreeProps) {
  const { website, github, twitter, medium, discord, telegram, potlock } =
    project.profile?.linktree;
  const { dapp, lnc } = project.profile;
  const pid = project.slug;

  return (
    <div id="project-meta" className="flex flex-col items-center lg:items-end gap-6 min-w-[280px]">
      {/* Primary Action Button - Top */}
      <div className="w-full lg:w-auto">
        {dapp ? (
          <Link
            href={dapp}
            target="_blank"
            rel="noreferrer nofollow"
            className="group relative overflow-hidden flex w-full lg:w-auto items-center justify-center gap-3 border border-border-default bg-transparent px-8 py-3 text-lg font-black tracking-tighter transition-all duration-300 hover:border-accent-primary hover:text-white"
          >
            {/* Ambient Backdrop */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-10 saturate-150 transition-opacity duration-300 group-hover:opacity-30">
              <ImageWithFallback
                src={project.profile?.image?.url}
                alt={project.profile?.name || "Logo"}
                fill
                className="object-cover blur-md scale-150"
              />
            </div>
            <span className="relative z-10 flex items-center gap-3">
              Launch <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ) : website && (
          <Link
            href={website}
            target="_blank"
            rel="noreferrer nofollow"
            className="group relative overflow-hidden flex w-full lg:w-auto items-center justify-center gap-3 border border-border-default bg-transparent px-8 py-3 text-lg font-black tracking-tighter transition-all duration-300 hover:border-accent-primary hover:text-white"
          >
            {/* Ambient Backdrop */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-10 saturate-150 transition-opacity duration-300 group-hover:opacity-30">
              <ImageWithFallback
                src={project.profile?.image?.url}
                alt={project.profile?.name || "Logo"}
                fill
                className="object-cover blur-md scale-150"
              />
            </div>
            <span className="relative z-10 flex items-center gap-3">
              Visit <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        )}
      </div>

      {/* Social & Secondary Links - Below */}
      <div className="flex flex-col items-center lg:items-end gap-3">
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 px-1">
          {website && (
            <Link 
              href={website} 
              target="_blank" 
              rel="noreferrer nofollow"
              className="flex items-center justify-center size-8 rounded-full border border-border-default bg-bg-surface text-gray-400 hover:border-accent-primary hover:text-accent-primary transition-all duration-300"
              title="Website"
            >
              <i className="bi bi-globe text-sm" />
            </Link>
          )}
          {twitter && (
            <Link 
              href={twitter} 
              target="_blank" 
              rel="noreferrer nofollow"
              className="flex items-center justify-center size-8 rounded-full border border-border-default bg-bg-surface text-gray-400 hover:border-accent-primary hover:text-accent-primary transition-all duration-300"
              title="X (Twitter)"
            >
              <i className="bi bi-twitter-x text-sm" />
            </Link>
          )}
          {telegram && (
            <Link 
              href={telegram} 
              target="_blank" 
              rel="noreferrer nofollow"
              className="flex items-center justify-center size-8 rounded-full border border-border-default bg-bg-surface text-gray-400 hover:border-accent-primary hover:text-accent-primary transition-all duration-300"
              title="Telegram"
            >
              <i className="bi bi-telegram text-sm" />
            </Link>
          )}
          {github && (
            <Link 
              href={github} 
              target="_blank" 
              rel="noreferrer nofollow" 
              className="flex items-center justify-center size-8 rounded-full border border-border-default bg-bg-surface text-gray-400 hover:border-accent-primary hover:text-accent-primary transition-all duration-300"
              title="GitHub"
            >
              <i className="bi bi-github text-sm" />
            </Link>
          )}
          {discord && (
            <Link 
              href={discord} 
              target="_blank" 
              rel="noreferrer nofollow" 
              className="flex items-center justify-center size-8 rounded-full border border-border-default bg-bg-surface text-gray-400 hover:border-accent-primary hover:text-accent-primary transition-all duration-300"
              title="Discord"
            >
              <i className="bi bi-discord text-sm" />
            </Link>
          )}
           {potlock && (
            <Link 
              href={potlock} 
              target="_blank" 
              rel="noreferrer nofollow" 
              className="flex items-center justify-center size-8 rounded-full border border-border-default bg-bg-surface text-gray-400 hover:border-accent-primary hover:text-accent-primary transition-all duration-300 p-2"
              title="Potlock"
            >
               <Image 
                src="https://indexer.nearcatalog.xyz/wp-content/uploads/2025/05/potlock.png"
                alt="Potlock"
                width={14}
                height={14}
                className="grayscale brightness-200"
                />
            </Link>
          )}
          <ShareDropdown project={project} />
        </div>
      </div>
    </div>
  );
}
