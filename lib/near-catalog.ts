import { ProjectCategory, ProjectId, ProjectRecord } from "@/lib/types";
import { Person } from "@/lib/types";
export const NEAR_CATALOG_API = process.env.NEXT_PUBLIC_NEAR_CATALOG_API;

function normalizeProject(project: ProjectRecord): ProjectRecord {
  if (project?.profile?.image?.url) {
    project.profile.image.url = project.profile.image.url.replace(
      "indexer.nearcatalog.org",
      "indexer.nearcatalog.xyz"
    );
  }
  return project;
}

function normalizeProjectsMap(
  projects: Record<ProjectId, ProjectRecord>
): Record<ProjectId, ProjectRecord> {
  if (!projects) return projects;
  for (const key in projects) {
    if (projects[key]) {
      normalizeProject(projects[key]);
    }
  }
  return projects;
}

/**
 * Fetches all projects
 */
export async function fetchAllProjects(): Promise<
  Record<ProjectId, ProjectRecord>
> {
  const response = await fetch(`${NEAR_CATALOG_API}/projects`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error(
      "Request to Near Catalog API failed with status: " + NEAR_CATALOG_API + response.status,
    );
  }
  const rs = await response.json();
  return normalizeProjectsMap(rs);
}

/**
 * Fetches top 20 new projects
 */
export async function fetchNewProjects(): Promise<
  Record<ProjectId, ProjectRecord>
> {
  const response = await fetch(`${NEAR_CATALOG_API}/new-projects`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error(
      "Request to Near Catalog API failed with status: " + response.status,
    );
  }
  const rs = await response.json();
  return normalizeProjectsMap(rs);
}


/**
 * fetch all categories
 */
export async function fetchCategories(): Promise<Record<string, string>> {
  const response = await fetch(`${NEAR_CATALOG_API}/categories`, {
    next: { revalidate: 3600 },
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
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error(
      "Request to Near Catalog API failed with status: " + response.status,
    );
  }
  const rs = await response.json();
  return normalizeProject(rs);
}

/**
 * Fetches projects by keywords
 */
export async function searchProjects(
  keywords: string,
): Promise<Record<ProjectId, ProjectRecord>> {
  const response = await fetch(`${NEAR_CATALOG_API}/search?kw=${keywords}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error(
      "Request to Near Catalog API failed with status: " + response.status,
    );
  }
  const rs = await response.json();
  return normalizeProjectsMap(rs);
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
      next: { revalidate: 3600 },
    },
  );
  if (!response.ok) {
    throw new Error(
      "Request to Near Catalog API failed with status: " + response.status,
    );
  }
  const rs = await response.json();
  return normalizeProjectsMap(rs);
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
      next: { revalidate: 3600 },
    },
  );
  let rs =  await response.json();
  // console.log("rs: " , rs);
  if (!response.ok) {
    throw new Error(
      "Request to Near Catalog API failed with status: " + response.status,
    );
  }
  if (rs && rs.data) {
    rs.data = normalizeProjectsMap(rs.data);
  }
  return rs;
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
    next: { revalidate: 3600 },
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
  
  const people = await response.json() as Person[];
  return people.map(p => {
    if (p.avatar) {
      p.avatar = p.avatar.replace("indexer.nearcatalog.org", "indexer.nearcatalog.xyz");
    }
    return p;
  });
}