import type { Metadata, ResolvingMetadata } from "next";
import { fetchProject } from "@/lib/near-catalog";
import { ProjectRecord } from "@/lib/types";

type MetadataProps = {
  params: { pid: string };
};

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata,
// ): Promise<Metadata> {
//   const {pid: id} = await params;

//   const project: ProjectRecord = await fetchProject(id);

//   if (!project) {
//     return {
//       title: "Project not found",
//       description: "Project not found",
//     };
//   }

//   return {
//     title: `${project.profile.name}`,
//     description: project.profile.name + " - " + project.profile.tagline,
//     keywords: Object.values(project.profile.tags),
//     openGraph: {
//       title: `${project.profile.name} - NEAR Catalog`,
//       description:  project.profile.name  + " - " + project.profile.tagline,
//     },
//     alternates: {
//       canonical: `/project/${pid}`,
//     },
//   };
// }

export async function generateMetadata({ 
  params 
}: { 
  params: { pid: string } 
}): Promise<Metadata> {
  const { pid } = await params;
  const project = await fetchProject(pid);
  
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found in NEAR Catalog."
    };
  }

  const projectTags = Object.keys(project.profile.tags || {});
  const imageUrl = project.profile.image?.url || "https://nearcatalog.xyz/favicon.ico";

  return {
    title: `${project.profile.name} - NEAR Project`,
    description: `${project.profile.tagline} - Discover ${project.profile.name} on NEAR Catalog, the #1 NEAR ecosystem directory.`,
    keywords: [project.profile.name, ...projectTags, "NEAR", "NEAR Project"],
    openGraph: {
      type: "website",
      title: `${project.profile.name} - NEAR Catalog`,
      description: `${project.profile.tagline} - Discover ${project.profile.name} on NEAR Catalog, the #1 NEAR ecosystem directory.`,
      url: `https://nearcatalog.xyz/project/${pid}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.profile.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.profile.name} - NEAR Catalog`,
      description: `${project.profile.tagline}`,
      images: [imageUrl],
      creator: "@nearcatalog"
    },
    alternates: {
      canonical: `/project/${pid}`,
    },
  };
}

type Props = MetadataProps & {
  children: React.ReactNode;
};

export default function ProjectLayout({ params, children }: Props) {
  return (
    <div className="relative mt-4" id="top">
      {children}
    </div>
  );
}
