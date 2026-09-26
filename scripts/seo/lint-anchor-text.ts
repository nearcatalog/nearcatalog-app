#!/usr/bin/env node
import { readdirSync, statSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const FORBIDDEN = [/>\s*click here\s*</i, /\bread more\b/i, /\bthis link\b/i];
const SCAN_DIRS = ["app", "components"];
const EXTS = new Set([".tsx", ".ts", ".jsx", ".js"]);

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (name === "node_modules" || name.startsWith(".")) continue;
      walk(p, out);
    } else if (EXTS.has(p.slice(p.lastIndexOf(".")))) {
      out.push(p);
    }
  }
  return out;
}

function main() {
  const failures: string[] = [];
  for (const dir of SCAN_DIRS) {
    for (const file of walk(join(ROOT, dir))) {
      const text = readFileSync(file, "utf8");
      const lines = text.split("\n");
      lines.forEach((line, i) => {
        for (const rx of FORBIDDEN) {
          if (rx.test(line)) {
            failures.push(`${file}:${i + 1} → matches ${rx}`);
          }
        }
      });
    }
  }
  if (failures.length) {
    console.error("[lint-anchor-text] failures:");
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
  }
  console.log("[lint-anchor-text] ok");
}

main();
