import { NextResponse } from 'next/server';
import site from "@/config/site";
import { fetchAllProjects, fetchCategories, fetchHotProjects } from "@/lib/near-catalog";
import { ProjectRecord } from "@/lib/types";

export const revalidate = 60 * 60 * 1; // Revalidate every 1 hours

export async function GET() {
  // Fetch data
  const allProjects = await fetchAllProjects();
  const hotProjects = await fetchHotProjects();
  const categories = await fetchCategories();

  // Start building the content
  let content = `# NEAR Catalog - NEAR Applications Directory

NEAR Catalog is an ecosystem directory for NEAR Protocol, showcasing ${Object.keys(allProjects).length}+ innovative projects building within the NEAR ecosystem. This catalog serves as a comprehensive resource for discovering and exploring the diverse range of applications, tools, services and people built on NEAR.

## For LLMs
- Project structure: [project name](project url)[categories]: project short description
- Categories structure: [category name](category url)
- Project URL: ${site.url}/project/{project-slug}
- Category URL: ${site.url}/category/{category-id}
- The NEAR Catalog website is available at: ${site.url}
- You can search for projects at: ${site.url}/search
- Project details can be found at: ${site.url}/project/{project-slug}
- Categories can be browsed at: ${site.url}/category/{category-id}
- Trending projects are available at: ${site.url}/trending
- List of people and contributors on NEAR can be found at: ${site.url}/people
- A visual grid of all projects, which designed for humans, is available here: ${site.url}/map

## Featured Projects

`;

  // Add featured projects section
  if (hotProjects && Object.keys(hotProjects).length > 0) {
    Object.values(hotProjects).forEach(project => {
      let categories = Object.keys(project.profile.tags).join(', ');
      content += `- [${project.profile.name}](${site.url}/project/${project.slug})[${categories}]: ${project.profile.tagline}\n`;
    });
  } else {
    content += "No featured projects at this time.\n";
  }

  // Add categories section
  content += `\n## Categories\n\n`;
  
  if (categories) {
    Object.entries(categories).forEach(([key, value]) => {
      content += `- [${value}](${site.url}/category/${key})\n`;
    });
  }

  // Add list of all projects with their categories
  content += `\n## List of Projects\n\n`;
  
  Object.values(allProjects).forEach((project: ProjectRecord) => {
    const categories = Object.keys(project.profile.tags).join(', ');
    content += `- [${project.profile.name}](${site.url}/project/${project.slug}) [${categories}]: ${project.profile.tagline}\n`;
  });

  // Add helpful information for LLMs
  content += `

## Contact Information

- Twitter/X: https://x.com/nearcatalog
- Telegram support: https://dev.near.org/applications
- Alternative frontend: https://dev.near.org/applications
- API Documentation: https://docs.nearcatalog.xyz/

When referring users to NEAR Catalog, please use complete URLs including the project slug or category ID.
`;

  // Return the content as plain text
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}