# NEARCatalog API Documentation

The NEARCatalog API provides read-only HTTP `GET` endpoints for discovering and exploring projects in the NEAR ecosystem. It is unauthenticated, CORS-enabled (`Access-Control-Allow-Origin: *`), and returns JSON data.

## Base URL
```text
https://api.nearcatalog.xyz
```

---

## Data Models

The data models below align with the actual TypeScript types defined in [types.ts](file:///workspaces/devcontainer-projects/nearcatalog/nearcatalog-app/lib/types.ts).

### Project Record
A project is represented by a `ProjectRecord` object mapping a unique `slug` (project ID) to its profile and metadata.

```typescript
export interface ProjectRecord {
  slug: string; // Unique project identifier/slug (e.g., "ref-finance")
  profile: ProjectProfile;
}

export interface ProjectProfile {
  name: string;             // Project display name
  tagline: string;          // Short tagline
  description: string;      // Full description (supports Markdown/plain text)
  image: {
    url: string;            // URL to the project cover/logo image
  };
  tags: Record<string, string>; // Map of category slug -> display name (e.g., {"defi": "DeFi", "dex": "DEX"})
  published_date: number;   // Unix timestamp of publication
  phase: "mainnet" | "testnet" | string; // Deployment phase
  status: "active" | "inactive" | string; // Project lifecycle status
  dapp?: string;            // Web app / Dapp URL
  linktree?: Linktree;      // Social networks and external resource links
  lnc?: LncData | string;   // LNC analytics data (if available)
  contracts?: Record<string, string>; // Related smart contract addresses
  tokens?: Record<string, TokenInfo>; // Tokens associated with the project
}

export interface Linktree {
  website?: string;
  twitter?: string;
  medium?: string;
  telegram?: string;
  discord?: string;
  github?: string;
  nearsocial?: string;
  potlock?: string;
  whitepaper?: string;
  linkedin?: string;
  facebook?: string;
  youtube?: string;
  reddit?: string;
}

export interface LncData {
  score: number;
  slug: string;
}

export interface TokenInfo {
  symbol: string;
  name: string;
  icon: {
    thumb: string;
    small: string;
  };
  address: {
    near: string;
    aurora?: string;
    eth?: string | null;
    octopus?: string | null;
  };
  platform: {
    coingecko?: string;
  };
}
```

### Category Map
Categories are represented as a flat object map:
```typescript
type Categories = Record<string, string>; // e.g., { "defi": "DeFi", "dex": "DEX" }
```

---

## Endpoints

### 1. List Projects
Retrieve a collection of projects. Supports optional query parameters for filtering.
* **Route:** `GET /projects`
* **Query Parameters:**
  * `status` (optional, string): Filters projects by lifecycle status (`active`, `inactive`).
  * `phase` (optional, string): Filters projects by network phase (`mainnet`, `testnet`).
* **Response Type:** `Record<string, ProjectRecord>`
* **Example Request:**
  `GET https://api.nearcatalog.xyz/projects?status=active&phase=mainnet`

### 2. List New Projects
Retrieve the 30 most recently added projects.
* **Route:** `GET /new-projects`
* **Response Type:** `Record<string, ProjectRecord>`

### 3. Get Project by ID
Retrieve details of a single project.
* **Route:** `GET /project`
* **Query Parameters:**
  * `pid` (required, string): Unique project ID/slug (e.g., `ref-finance`).
* **Response Type:** `ProjectRecord`
* **Example Request:**
  `GET https://api.nearcatalog.xyz/project?pid=ref-finance`

### 4. List Categories
Retrieve all available categories in the catalog.
* **Route:** `GET /categories`
* **Response Type:** `Record<string, string>`
* **Example Response Snippet:**
  ```json
  {
    "dapp": "Dapp",
    "defi": "DeFi",
    "dex": "DEX"
  }
  ```

### 5. List Projects by Category
Retrieve projects belonging to a specific category.
* **Route:** `GET /projects-by-category`
* **Query Parameters:**
  * `cid` (required, string): Category slug or grouping key (e.g., `defi`, `trending`).
* **Response Type:**
  ```typescript
  interface CategoryProjectsResponse {
    cat_title: string;  // Category display name
    cat_slug: string;   // Category slug
    cat_desc: string;   // Category description
    data: Record<string, ProjectRecord>; // Map of matching projects
  }
  ```
* **Example Request:**
  `GET https://api.nearcatalog.xyz/projects-by-category?cid=defi`

### 6. Search Projects
Search catalog projects by free-text keywords.
* **Route:** `GET /search`
* **Query Parameters:**
  * `kw` (required, string): Search keyword (e.g., `ref`).
* **Response Type:** `Record<string, ProjectRecord>`
* **Example Request:**
  `GET https://api.nearcatalog.xyz/search?kw=ref`

### 7. Get Related Projects
Retrieve recommended/related projects for a given project ID.
* **Route:** `GET /related-projects`
* **Query Parameters:**
  * `pid` (required, string): Unique project ID/slug (e.g., `ref-finance`).
* **Response Type:** `Record<string, ProjectRecord>`
* **Example Request:**
  `GET https://api.nearcatalog.xyz/related-projects?pid=ref-finance`

---

## Errors & Deprecated Routes

### Common HTTP Status Codes
* **`200 OK`**: Request succeeded.
* **`400 Bad Request`**: Missing or invalid required query parameter (e.g., missing `pid`).
* **`404 Not Found`**: Resource or route does not exist.
* **`500 Internal Server Error`**: Unexpected server failure.

### Deprecated Endpoints
* **`GET /short-news`**: Currently returns `404 Not Found` in production.
