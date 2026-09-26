import { execSync } from "node:child_process";
import { statSync } from "node:fs";
import { ProjectRecord } from "@/lib/types";

const BUILD_TIME = new Date();

type Datey = { updated_at?: string; updatedAt?: string; modified?: string };

function parseDate(value: unknown): Date | null {
  if (typeof value !== "string" || value.length === 0) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function projectDateModified(project: ProjectRecord): Date {
  const profile = (project.profile ?? {}) as unknown as Datey;
  const top = project as unknown as Datey;
  return (
    parseDate(top.updated_at) ??
    parseDate(top.updatedAt) ??
    parseDate(profile.updated_at) ??
    parseDate(profile.updatedAt) ??
    parseDate(profile.modified) ??
    BUILD_TIME
  );
}

export function categoryDateModified(projects: ProjectRecord[]): Date {
  if (!projects || projects.length === 0) return BUILD_TIME;
  let max = 0;
  for (const p of projects) {
    const d = projectDateModified(p).getTime();
    if (d > max) max = d;
  }
  return max ? new Date(max) : BUILD_TIME;
}

export function routeDateModified(filePath: string): Date {
  try {
    const iso = execSync(`git log -1 --format=%aI -- ${JSON.stringify(filePath)}`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    const d = parseDate(iso);
    if (d) return d;
  } catch {
    // fall through to fs
  }
  try {
    return statSync(filePath).mtime;
  } catch {
    return BUILD_TIME;
  }
}

export function toIsoDate(d: Date): string {
  return d.toISOString();
}

export function toYmd(d: Date): string {
  return d.toISOString().slice(0, 10);
}
