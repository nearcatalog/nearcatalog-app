import SectionHeading from "@/components/ui/section-heading";
import SearchImage from "@/public/assets/images/search.webp";
import Search from "@/components/search";
import { ProjectRecord } from "@/lib/types";
import { fetchAllProjects } from "@/lib/near-catalog";

import SearchProjects from "@/components/home/searchProjects";
import ImageWithFallback from "@/components/ImageWithFallback";
import TagsModal from "@/components/modals/tags";
import { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { searchCrumbs } from "@/lib/seo/breadcrumbs";

export const metadata: Metadata = {
  title: "Search Projects",
  description:
    "Explore a wide range of innovative projects in the NEAR ecosystem and find the ones that inspire you.",
  alternates: { canonical: "/search" },
};

export default async function SearchPage() {
  const projects = await fetchAllProjects();

  if (!projects) {
    return <div>Error fetching projects</div>;
  }

  const projectArray: ProjectRecord[] = Object.values(projects).filter(
    (project) => project.profile?.phase !== "inactive"
  );
  
  const projectsLength = projectArray.length;
  
  let tags: Record<string, string>[] = projectArray
    .map((project: ProjectRecord) => project.profile.tags)
    .flat();

  let uniqueTags: Record<string, string> = {};

  tags.forEach((tag) => {
    Object.keys(tag).forEach((key) => {
      if (!uniqueTags[key]) {
        uniqueTags[key] = tag[key];
      }
    });
  });

  const priorities = ["near-intents", "near-ai", "defi"];
  let sortedUniqueTags: Record<string, string> = {};
  
  Object.keys(uniqueTags).sort((a, b) => {
    const aPriority = priorities.indexOf(a);
    const bPriority = priorities.indexOf(b);
    if (aPriority !== -1 && bPriority !== -1) return aPriority - bPriority;
    if (aPriority !== -1) return -1;
    if (bPriority !== -1) return 1;
    return uniqueTags[a].localeCompare(uniqueTags[b]);
  }).forEach(key => {
    sortedUniqueTags[key] = uniqueTags[key];
  });

  return (
    <section
      id="all-projects"
      className="container mx-auto my-15 overflow-x-clip px-4"
    >
      <BreadcrumbSchema items={searchCrumbs()} />
      <h1 className="sr-only">Search NEAR Protocol projects</h1>
      <div className="relative flex flex-col items-center pt-24 md:pt-12">
        <SectionHeading
          title="Discover All Projects"
          description={`Explore ${projectsLength}+ active innovative projects building within our vibrant ecosystem`}
        />
        <ImageWithFallback
          className="absolute right-1/2 top-0 z-0 h-[8.8125rem] w-[13.8125rem] -translate-y-1/3 translate-x-1/2 object-cover md:right-0 md:h-[13.875rem] md:w-[21.6875rem] md:translate-x-0"
          src={SearchImage}
          alt={"Discover All Projects"}
          placeholder="blur"
          width={347}
          height={222}
        />
      </div>
      
      <div className="z-1 relative my-16">
        <Search tags={sortedUniqueTags} autoSelect={true}/>
        <TagsModal tags={sortedUniqueTags} />
        <SearchProjects />
      </div>
    </section>
  );
}
