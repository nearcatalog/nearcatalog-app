import { ProjectCategory, ProjectId, ProjectRecord } from "@/lib/types";
import { Person } from "@/lib/types";
export const NEAR_CATALOG_API = process.env.NEXT_PUBLIC_NEAR_CATALOG_API;

/**
 * Fetches all projects
 */
export async function fetchAllProjects(): Promise<
  Record<ProjectId, ProjectRecord>
> {
  const response = await fetch(`${NEAR_CATALOG_API}/projects`, {
    next: { revalidate: 30 },
  });
  if (!response.ok) {
    throw new Error(
      "Request to Near Catalog API failed with status: " + NEAR_CATALOG_API + response.status,
    );
  }
  const rs = await response.json();
  return await rs;
}

/**
 * Fetches top 20 new projects
 */
export async function fetchNewProjects(): Promise<
  Record<ProjectId, ProjectRecord>
> {
  const response = await fetch(`${NEAR_CATALOG_API}/new-projects`, {
    next: { revalidate: 30 },
  });
  if (!response.ok) {
    throw new Error(
      "Request to Near Catalog API failed with status: " + response.status,
    );
  }
  const rs = await response.json();
  return await rs;
}


/**
 * fetch all categories
 */
export async function fetchCategories(): Promise<{String:String}> {
  const response = await fetch(`${NEAR_CATALOG_API}/categories`, {
    next: { revalidate: 30 },
  });
  if (!response.ok) {
    throw new Error(
      "Request to Near Catalog API failed with status: " + response.status,
    );
  }
  const rs = await response.json();
  return await rs;
}



/**
 * Fetches a project by its PID (project ID)
 */
export async function fetchProject(pid: string): Promise<ProjectRecord> {
  const response = await fetch(`${NEAR_CATALOG_API}/project?pid=${pid}`, {
    next: { revalidate: 300 },
  });
  if (!response.ok) {
    throw new Error(
      "Request to Near Catalog API failed with status: " + response.status,
    );
  }
  return await response.json();
}

/**
 * Fetches projects by keywords
 */
export async function searchProjects(
  keywords: string,
): Promise<Record<ProjectId, ProjectRecord>> {
  const response = await fetch(`${NEAR_CATALOG_API}/search?kw=${keywords}`, {
    next: { revalidate: 300 },
  });
  if (!response.ok) {
    throw new Error(
      "Request to Near Catalog API failed with status: " + response.status,
    );
  }
  return await response.json();
}

/**
 * Fetches related projects by PID
 */
export async function fetchRelatedProjects(
  pid: string,
): Promise<Record<ProjectId, ProjectRecord>> {
  const response = await fetch(
    `${NEAR_CATALOG_API}/related-projects?pid=${pid}`,
    {
      next: { revalidate: 300 },
    },
  );
  if (!response.ok) {
    throw new Error(
      "Request to Near Catalog API failed with status: " + response.status,
    );
  }
  return await response.json();
}

/**
 * Fetches a project category by its CID (category ID)
 */
export async function fetchProjectCategory(
  cid: string,
): Promise<ProjectCategory> {
  const response = await fetch(
    `${NEAR_CATALOG_API}/projects-by-category?cid=${cid}`,
    {
      next: { revalidate: 30 },
    },
  );
  let rs =  await response.json();
  // console.log("rs: " , rs);
  if (!response.ok) {
    throw new Error(
      "Request to Near Catalog API failed with status: " + response.status,
    );
  }
  return await rs;
}

/**
 * Fetches hot projects (trending category)
 */
export async function fetchHotProjects(): Promise<
  Record<ProjectId, ProjectRecord>
> {
  const { data } = await fetchProjectCategory("trending");
  return data;
}

/**
 * fetches short news 
 */
export async function fetchShortNews(): Promise<
  Record<string, { title: string; description: string; url: string }> | null
> {
  const response = await fetch(`${NEAR_CATALOG_API}/short-news`, {
    next: { revalidate: 1800 },
  });
  if (response.ok) {
    const rs = await response.json();
    return rs;
  }
  return null;
}


// Fetch people data from GitHub with 1 hour cache
export async function fetchPeopleData(): Promise<Person[]> {
  const response = await fetch(
    "https://raw.githubusercontent.com/nearcatalog/nearcatalog-people/refs/heads/main/people-on-near.json",
    {
      next: { revalidate: 3600 } // Revalidate every hour (3600 seconds)
    }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch people data: ${response.status}`);
  }
  
  return response.json();
}