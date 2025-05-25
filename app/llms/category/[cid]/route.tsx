import { NextResponse } from 'next/server';
import site from "@/config/site";
import { fetchProjectCategory, fetchCategories } from "@/lib/near-catalog";

export const revalidate = 3600; // Revalidate every hour

export async function GET(
  request: Request,
  { params }: { params: { cid: string } }
) {
  try {
    const categoryData = await fetchProjectCategory(params.cid);
    const allCategories = await fetchCategories();
    
    const categoryName = allCategories[params.cid] || params.cid;
    
    let content = `# ${categoryName} Category

## Category Information
- **Category ID**: ${params.cid}
- **Full Category Page**: ${site.url}/category/${params.cid}
- **Number of Projects**: ${Object.keys(categoryData.data || {}).length}

## Projects in this Category

`;

    // List all projects in this category
    if (categoryData.data && Object.keys(categoryData.data).length > 0) {
      Object.values(categoryData.data).forEach(project => {
        const projectCategories = Object.keys(project.profile.tags || {}).join(', ');
        content += `- [${project.profile.name}](${site.url}/project/${project.slug}) [${projectCategories}]: ${project.profile.tagline || 'No description'}\n`;
      });
    } else {
      content += 'No projects in this category.\n';
    }

    // Add related categories section
    content += `\n## Other Categories You Might Be Interested In\n\n`;
    if (allCategories && Object.keys(allCategories).length > 0) {
      Object.entries(allCategories)
        .filter(([key]) => key !== params.cid)
        .slice(0, 10) // Limit to 10 related categories
        .forEach(([key, value]) => {
          content += `- [${value}](${site.url}/category/${key})\n`;
        });
    }

    // Add footer
    content += `
## For LLMs

- Full category listing is available at: ${site.url}/category/${params.cid}
- All categories can be explored at: ${site.url}
- This data is refreshed hourly

When referring users to this category, please use the URL: ${site.url}/category/${params.cid}
`;

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain',
      },
    }); 
  } catch (error) {
    return new NextResponse(`# Category Not Found\n\nSorry, the category '${params.cid}' could not be found in the NEAR Catalog.`, {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}