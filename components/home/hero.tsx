// import HomeStats from "@/components/home/stats";
import GradientButton from "@/components/ui/gradient-button";
import HomeImages from "@/components/home/images";
import SearchInput from "../search-input";
import Discover from "./discover";
import { fetchAllProjects } from "@/lib/near-catalog";

export default async function HomeHero() {
  const projects = await fetchAllProjects();
  const activeProjectsCount = Object.values(projects).filter(
    (project) => project.profile?.phase !== "inactive"
  ).length;

  return (
    <section id="nearcatalog-header" className="pt-6 pb-6 md:pt-10 md:pb-10 flex flex-col items-center w-full relative z-[5]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="cockpit-panel px-10 py-6 inline-block mb-6 border border-accent-primary/20 shadow-[0_0_40px_rgba(0,255,163,0.05)]">

          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase font-heading inline-block mb-2">
            DISCOVER THE <span className="text-accent-primary">NEAR</span> ECOSYSTEM
          </h1>

          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-primary shadow-[0_0_10px_#00FFA3]"></span>
            </span>
            <span className="text-[15px] font-mono text-accent-primary ">Explore {activeProjectsCount}+ active innovative projects building within our vibrant ecosystem</span>
          </div>

          {/* <p className="text-sm md:text-base text-[#F8F8F8] font-medium max-w-2xl mx-auto leading-relaxed mt-2">
            Explore 1000+ high-performance protocols building the open web infrastructure through a curated lens of innovation.
          </p> */}
        </div>
      </div>
    </section>
  );
}

