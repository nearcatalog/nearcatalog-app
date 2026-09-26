import { create } from "zustand";
import {
  fetchAllProjects,
  searchProjects as apiSearchProjects,
} from "@/lib/near-catalog";
import { ProjectId, ProjectRecord } from "@/lib/types";

type FetchStatus = "idle" | "loading" | "success" | "error";

interface ProjectsStore {
  // --- All projects cache ---
  allProjects: Record<ProjectId, ProjectRecord> | null;
  allProjectsStatus: FetchStatus;
  allProjectsError: string | null;

  // --- Search results cache (keyed by keyword) ---
  searchCache: Map<string, Record<ProjectId, ProjectRecord>>;
  searchLoadingKeys: Set<string>;

  // --- Actions ---
  fetchAllProjects: () => Promise<void>;
  searchProjects: (
    keyword: string,
  ) => Promise<Record<ProjectId, ProjectRecord>>;
}

export const useProjectsStore = create<ProjectsStore>((set, get) => ({
  allProjects: null,
  allProjectsStatus: "idle",
  allProjectsError: null,
  searchCache: new Map(),
  searchLoadingKeys: new Set(),

  fetchAllProjects: async () => {
    const { allProjectsStatus } = get();

    // If already fetched or currently loading, skip the request
    if (allProjectsStatus === "success" || allProjectsStatus === "loading") {
      return;
    }

    set({ allProjectsStatus: "loading", allProjectsError: null });

    try {
      const data = await fetchAllProjects();
      set({ allProjects: data, allProjectsStatus: "success" });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      set({ allProjectsStatus: "error", allProjectsError: message });
    }
  },

  searchProjects: async (keyword: string) => {
    const { searchCache, searchLoadingKeys } = get();

    // Return cached result if available
    if (searchCache.has(keyword)) {
      return searchCache.get(keyword)!;
    }

    // Skip if a request for this keyword is already in-flight
    if (searchLoadingKeys.has(keyword)) {
      // Poll until the result is cached (another call is in-flight)
      return new Promise<Record<ProjectId, ProjectRecord>>((resolve) => {
        const interval = setInterval(() => {
          const cached = get().searchCache.get(keyword);
          if (cached) {
            clearInterval(interval);
            resolve(cached);
          }
        }, 50);
      });
    }

    // Mark as in-flight
    set((state) => ({
      searchLoadingKeys: new Set(state.searchLoadingKeys).add(keyword),
    }));

    try {
      const data = await apiSearchProjects(keyword);
      set((state) => {
        const newCache = new Map(state.searchCache);
        newCache.set(keyword, data);
        const newLoadingKeys = new Set(state.searchLoadingKeys);
        newLoadingKeys.delete(keyword);
        return { searchCache: newCache, searchLoadingKeys: newLoadingKeys };
      });
      return data;
    } catch (err) {
      // Clean up loading key on error
      set((state) => {
        const newLoadingKeys = new Set(state.searchLoadingKeys);
        newLoadingKeys.delete(keyword);
        return { searchLoadingKeys: newLoadingKeys };
      });
      throw err;
    }
  },
}));
