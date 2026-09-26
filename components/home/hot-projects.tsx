import SectionHeading from "@/components/ui/section-heading";
import { CyberFire as Fire } from "@/components/icons/cyber-icons";
import { fetchHotProjects } from "@/lib/near-catalog";
import { ProjectId, ProjectRecord } from "@/lib/types";
import ScrollableProjects from "@/components/home/hot-projects/scrollable-projects";

export default async function HotProjects() {
  const projects: Record<ProjectId, ProjectRecord> = await fetchHotProjects();
  return (
      <section id="nearcatalog-trending" className="w-full overflow-hidden relative z-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-5 w-full">
          <div className="flex items-end justify-between mb-6 md:mb-6">
            <div className="flex items-center gap-3">
              <div className="w-6 md:w-12 h-[3px] bg-accent-primary shadow-[0_0_10px_#00FFA3]"></div>
              <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight uppercase font-heading">Trending</h2>
            </div>
            <a className="inline-flex items-center gap-2 text-accent-primary font-bold text-xs md:text-sm group font-mono tracking-widest hover:brightness-125 transition-all" href="/trending">
              View All<i className="bi bi-arrow-right text-sm md:text-base"></i>
            </a>
          </div>
          <div className="relative group" id="trending-apps">
            <ScrollableProjects projects={projects} />
          </div>
        </div>
      </section>
  );
}
