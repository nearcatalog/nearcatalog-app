import { ProjectRecord } from "@/lib/types";
import { fetchAllProjects, fetchNewProjects } from "@/lib/near-catalog";
import TagsModal from "@/components/modals/tags";
import SearchProjects from "@/components/home/searchProjects";
import Tags from "@/components/ui/tags";
import SearchInput from "@/components/search-input";
import Link from "next/link";

import NewScrollableProjects from "./new-projects/new-scrollable-projects";

export default async function Discover() {
  const projects = await fetchAllProjects();
  const newProjects = await fetchNewProjects();

  if (!projects) {
    return <div>Error fetching projects</div>;
  }

  const projectArray: ProjectRecord[] = Object.values(projects);
  const activeProjects = projectArray.filter(
    (project) => project.profile?.phase?.toLowerCase() !== "inactive",
  );

  let uniqueTags: Record<string, string> = {};
  let tagCounts: Record<string, number> = {};

  activeProjects.forEach((project) => {
    Object.keys(project.profile.tags).forEach((key) => {
      if (!uniqueTags[key]) {
        uniqueTags[key] = project.profile.tags[key];
      }
      tagCounts[key] = (tagCounts[key] || 0) + 1;
    });
  });

  const priorities = ["near-intents", "ai", "defi"];

  const sortedTagKeys = Object.keys(uniqueTags).sort((a, b) => {
    const aPriority = priorities.indexOf(a);
    const bPriority = priorities.indexOf(b);

    if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
    if (aPriority !== -1) return -1;
    if (bPriority !== -1) return 1;

    return tagCounts[b] - tagCounts[a];
  });

  const top10Keys = sortedTagKeys.slice(0, 10);
  const remainingKeys = sortedTagKeys.slice(10);

  const remainingTags: Record<string, string> = {};
  remainingKeys.forEach((k) => (remainingTags[k] = uniqueTags[k]));

  const sortedUniqueTags: Record<string, string> = {};
  sortedTagKeys.forEach((k) => (sortedUniqueTags[k] = uniqueTags[k]));

  return (
    <section
      id="directory"
      className="relative z-10 w-full border-t border-white/5 bg-[#080808] py-12 md:py-24"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:gap-16 lg:flex-row">
          <aside className="hidden flex-shrink-0 lg:block lg:w-72">
            <div className="sticky top-28 space-y-12">
              <div>
                <h4 className="mb-8 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.4em] text-accent-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-primary"></span>{" "}
                  Category
                </h4>
                <div className="custom-scrollbar flex max-h-[calc(100vh-320px)] w-full flex-col items-start space-y-2 overflow-y-auto pb-8 pr-2">
                  {top10Keys.map((key) => (
                    <Link
                      key={key}
                      href={`/category/${key}`}
                      className="group flex w-full items-center justify-between border-l-2 border-transparent bg-white/5 px-4 py-3 font-mono text-[11px] font-bold text-white/70 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
                    >
                      <span className="uppercase tracking-widest">
                        {uniqueTags[key]}
                      </span>
                      <span className="rounded-sm bg-accent-primary/10 px-2 py-0.5 text-[9px] text-accent-primary transition-colors group-hover:bg-accent-primary group-hover:text-black">
                        {tagCounts[key]}
                      </span>
                    </Link>
                  ))}

                  {remainingKeys.length > 0 && (
                    <div className="w-full pb-2 pt-6">
                      <Tags
                        tags={remainingTags}
                        className="justify-start gap-1.5"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-[16px] border border-accent-primary/20 bg-accent-primary/5 p-8">
                <a
                  href="https://docs.near.org"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="absolute -right-4 -top-4 size-16 rounded-full bg-accent-primary/10 blur-xl transition-all group-hover:bg-accent-primary/20"></div>
                  <h4 className="mb-4 font-mono text-[11px] font-bold text-white">
                    BUILD_ON_NEAR
                  </h4>
                  <p className="mb-6 font-mono text-[11px] uppercase leading-relaxed text-white opacity-70">
                    Integrate your app into NEAR - The unified commerce layer
                    for assets and agents.
                  </p>
                </a>
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <TagsModal
              top10Keys={top10Keys}
              remainingKeys={remainingKeys}
              uniqueTags={uniqueTags}
              tagCounts={tagCounts}
              remainingTags={remainingTags}
            />
            <div className="mb-6 mt-6 flex flex-col justify-between gap-4 md:mb-10 md:mt-0 md:flex-row md:items-start">
              <div className="flex items-baseline gap-5">
                <h3 className="font-heading text-2xl font-bold uppercase text-white">
                  Directory
                </h3>
              </div>
              <div className="w-full md:w-auto">
                <SearchInput />
              </div>
            </div>

            <NewScrollableProjects projects={newProjects} />
            <SearchProjects />
          </div>
        </div>
      </div>
    </section>
  );
}
