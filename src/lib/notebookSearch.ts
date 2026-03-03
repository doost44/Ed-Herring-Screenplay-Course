import { courseStructure } from "@/content/courseStructure";

export type SearchResultType =
  | "notes"
  | "decisions"
  | "exercises"
  | "revision"
  | "archive";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  snippet: string;
  href: string;
  pageTitle: string;
}

type RevisionEntry = {
  id: string;
  date: string;
  category: string;
  description: string;
};

type ArchiveExcerpt = {
  id: string;
  date: string;
  title: string;
  content: string;
};

function normalize(text: string): string {
  return text.toLowerCase().trim();
}

function compactSnippet(text: string, max = 180): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 3)}...`;
}

function collectPageTitles() {
  const titles = new Map<string, string>();
  for (const section of courseStructure) {
    titles.set(section.href, section.title);
    if (section.children) {
      for (const child of section.children) {
        titles.set(child.href, child.title);
      }
    }
  }
  return titles;
}

const PAGE_TITLES = collectPageTitles();

function pageTitleFor(href: string): string {
  return PAGE_TITLES.get(href) ?? href;
}

function safeJSON<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function searchNotebook(query: string): SearchResult[] {
  if (typeof window === "undefined") return [];

  const search = normalize(query);
  if (!search) return [];

  const results: SearchResult[] = [];

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (!key) continue;

    const raw = window.localStorage.getItem(key);

    if (key.startsWith("mm_notes:")) {
      const slug = key.slice("mm_notes:".length);
      const payload = safeJSON<{ content?: string } | string | null>(raw, null);
      const content =
        typeof payload === "string" ? payload : (payload?.content ?? "");
      if (!content || !normalize(content).includes(search)) continue;

      results.push({
        id: `${key}:notes`,
        type: "notes",
        title: "Notes Match",
        snippet: compactSnippet(content),
        href: slug,
        pageTitle: pageTitleFor(slug),
      });
      continue;
    }

    const weekMatch = key.match(/^mm_week:(\d+):(decisions|exercises)$/);
    if (weekMatch) {
      const week = weekMatch[1];
      const section = weekMatch[2];
      const payload = safeJSON<Record<string, string>>(raw, {});
      const merged = Object.values(payload).join(" \n ");
      if (!normalize(merged).includes(search)) continue;

      const href = `/week/${week}/${section}`;
      results.push({
        id: `${key}:week`,
        type: section as "decisions" | "exercises",
        title: `${section === "decisions" ? "Decisions" : "Exercises"} Match`,
        snippet: compactSnippet(merged),
        href,
        pageTitle: pageTitleFor(href),
      });
      continue;
    }

    if (key === "mm_revisionLog") {
      const entries = safeJSON<RevisionEntry[]>(raw, []);
      for (const entry of entries) {
        const block = `${entry.date} ${entry.category} ${entry.description}`;
        if (!normalize(block).includes(search)) continue;

        results.push({
          id: `${key}:${entry.id}`,
          type: "revision",
          title: `${entry.date} [${entry.category}]`,
          snippet: compactSnippet(entry.description),
          href: "/infrastructure/revision-log",
          pageTitle: pageTitleFor("/infrastructure/revision-log"),
        });
      }
      continue;
    }

    const archiveMatch = key.match(/^mm_archive:(week-\d+)$/);
    if (archiveMatch) {
      const week = archiveMatch[1];
      const excerpts = safeJSON<ArchiveExcerpt[]>(raw, []);
      for (const excerpt of excerpts) {
        const block = `${excerpt.date} ${excerpt.title} ${excerpt.content}`;
        if (!normalize(block).includes(search)) continue;

        const href = `/archive/${week}`;
        results.push({
          id: `${key}:${excerpt.id}`,
          type: "archive",
          title: excerpt.title || "Archive Excerpt",
          snippet: compactSnippet(excerpt.content),
          href,
          pageTitle: pageTitleFor(href),
        });
      }
    }
  }

  return results;
}