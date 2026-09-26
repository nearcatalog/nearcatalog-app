import SectionHeading from "@/components/ui/section-heading";
import { fetchHotProjects } from "@/lib/near-catalog";
import { ProjectId, ProjectRecord } from "@/lib/types";
import { Metadata } from "next";
import TrendingList from "./_components/trending-list";
import { BreadcrumbSchema } from "@/components/seo/json-ld";
import { trendingCrumbs } from "@/lib/seo/breadcrumbs";
import SearchImage from "@/public/assets/images/search.webp";
import ImageWithFallback from "@/components/ImageWithFallback";

export const metadata: Metadata = {
  title: "Trending Projects",
  description:
    "Discover the hottest and most popular projects in the NEAR ecosystem, based on usage and transactions.",
  alternates: { canonical: "/trending" },
};

export default async function TrendingProjects() {
    const projects: Record<ProjectId, ProjectRecord> = await fetchHotProjects() || {};

    return (
        <section
            id="trending-projects"
            className="container mx-auto my-20 overflow-x-clip px-4"
        >
            <BreadcrumbSchema items={trendingCrumbs()} />
            <h1 className="sr-only">Trending NEAR Protocol projects</h1>
            <div className="relative flex flex-col items-center md:pt-0">
                <SectionHeading
                    title="Trending Projects"
                    description="Discover the hottest and most popular projects in the NEAR ecosystem"
                />
                {/* <ImageWithFallback
                    className="absolute right-1/2 top-0 z-0 h-[8.8125rem] w-[13.8125rem] -translate-y-1/3 translate-x-1/2 object-cover md:right-0 md:h-[13.875rem] md:w-[21.6875rem] md:translate-x-0"
                    src={SearchImage}
                    alt={"Trending Projects"}
                    placeholder="blur"
                    width={347}
                    height={222}
                /> */}
            </div>

            <div className="z-1 relative my-16">
                <TrendingList projects={projects} />
            </div>
        </section>
    );
}
