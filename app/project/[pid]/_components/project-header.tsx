import { ProjectRecord } from "@/lib/types";
import Tags from "@/components/ui/tags";
import ImageWithFallback from "@/components/ImageWithFallback";

export default function ProjectHeader({
  projectData,
}: {
  projectData: ProjectRecord;
}) {
  const { profile } = projectData;
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start items-center text-center lg:text-left flex-1">
      <div className="relative group">
        <div className="absolute -inset-1 bg-accent-primary/20 opacity-0 group-hover:opacity-100 transition-opacity blur-md rounded-3xl"></div>
        <ImageWithFallback
          src={profile.image.url}
          alt={profile.name}
          className="relative size-[160px] rounded-3xl bg-bg-surface border border-border-default/50 object-cover shrink-0 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
          width={320}
          height={320}
          priority
        />
      </div>
      <div className="flex flex-col gap-3 flex-1 items-center lg:items-start text-center lg:text-left">
        <div className="flex flex-col gap-2 items-center lg:items-start">
          <h1 className="text-4xl font-black tracking-tight text-white lg:text-5xl">
            {profile?.name}
          </h1>
          <div id="project-tags" className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <Tags tags={profile.tags} itemClassName="text-[9px]" />
          </div>
        </div>
        
        <p className="max-w-2xl text-lg font-medium leading-relaxed text-text-secondary mx-auto lg:mx-0">
          {profile?.tagline}
        </p>
      </div>
    </div>
  );
}
