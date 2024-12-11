import SectionHeading from "@/components/ui/section-heading";
import Fire from "@/components/icons/fire";
import { fetchHotProjects } from "@/lib/near-catalog";
import { ProjectId, ProjectRecord } from "@/lib/types";
import ProjectCard from "@/components/ui/project-card";



// ProjectsListProps
export default async function TrendingProjects() {
    const projects: Record<ProjectId, ProjectRecord> = await fetchHotProjects() || {};

    return (
        <section className="container mx-auto my-16 overflow-x-clip px-4">
            <section id="hot-projects" className="container mx-auto bg-black">
                
                <SectionHeading
                    title={
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Fire />
                            <h3>Trending</h3>
                            <Fire />
                        </div>
                    }
                    // description="Take a look at the hottest projects in our ecosystem based on usage and transactions"
                    description=""
                />
            </section>            

            <div className="mt-25 max-w-full">
                <div className="projects-list mt-4 grid max-w-full grid-cols-1 place-items-center items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Object.values(projects).map((project) => (
                        <ProjectCard key={project.slug} project={project} maxWidth />
                    ))}
                </div>
            </div>
        </section>
    );
}
