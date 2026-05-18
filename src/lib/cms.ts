type FrontmatterValue = string | number | boolean | string[] | Record<string, string>;

export interface ProjectContent {
  slug: string;
  title: string;
  description: string;
  details: string;
  tags: string[];
  order: number;
  githubUrl?: string;
  liveUrl?: string;
  articleUrl?: string;
}

export interface EssayContent {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  type: string;
  published: boolean;
  content: string;
  html: string;
}

export interface ResumeContent {
  title: string;
  summary: string;
  pdfUrl: string;
  externalUrl?: string;
  updated: string;
  researchFocus: string[];
  quickFacts: string[];
  links: Record<string, string>;
  content: string;
}

const projectFiles = import.meta.glob("../content/projects/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const essayFiles = import.meta.glob("../content/essays/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const resumeFiles = import.meta.glob("../content/resume/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const slugFromPath = (path: string) =>
  path
    .split("/")
    .pop()
    ?.replace(/^\d+-/, "")
    .replace(/\.md$/, "") ?? "";

const parseScalar = (value: string): FrontmatterValue => {
  const trimmed = value.trim();

  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (/^\d+$/.test(trimmed)) return Number(trimmed);

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }

  return trimmed.replace(/^["']|["']$/g, "");
};

const parseMarkdownFile = (source: string) => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return { data: {} as Record<string, FrontmatterValue>, content: source.trim() };
  }

  const data: Record<string, FrontmatterValue> = {};
  const lines = match[1].split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!pair) continue;

    const [, key, rawValue] = pair;
    if (rawValue === "") {
      const nested: Record<string, string> = {};
      while (lines[index + 1]?.startsWith("  ")) {
        index += 1;
        const nestedPair = lines[index].trim().match(/^([^:]+):\s*(.*)$/);
        if (nestedPair) {
          nested[nestedPair[1]] = String(parseScalar(nestedPair[2]));
        }
      }
      data[key] = nested;
    } else {
      data[key] = parseScalar(rawValue);
    }
  }

  return { data, content: match[2].trim() };
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const markdownToHtml = (markdown: string) => {
  if (markdown.trim().startsWith("<")) return markdown;

  return markdown
    .split(/\n{2,}/)
    .map((block) => {
      const text = escapeHtml(block.trim())
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/`([^`]+)`/g, "<code>$1</code>");

      if (text.startsWith("### ")) return `<h3>${text.slice(4)}</h3>`;
      if (text.startsWith("## ")) return `<h2>${text.slice(3)}</h2>`;
      if (text.startsWith("# ")) return `<h1>${text.slice(2)}</h1>`;

      return `<p>${text.replace(/\n/g, "<br />")}</p>`;
    })
    .join("\n");
};

export const getProjects = (): ProjectContent[] =>
  Object.entries(projectFiles)
    .map(([path, source]) => {
      const { data } = parseMarkdownFile(source);
      return {
        slug: slugFromPath(path),
        title: String(data.title ?? ""),
        description: String(data.description ?? ""),
        details: String(data.details ?? ""),
        tags: Array.isArray(data.tags) ? data.tags : [],
        order: Number(data.order ?? 999),
        githubUrl: data.githubUrl ? String(data.githubUrl) : undefined,
        liveUrl: data.liveUrl ? String(data.liveUrl) : undefined,
        articleUrl: data.articleUrl ? String(data.articleUrl) : undefined,
      };
    })
    .sort((a, b) => a.order - b.order);

export const getEssays = (): EssayContent[] =>
  Object.entries(essayFiles)
    .map(([path, source]) => {
      const { data, content } = parseMarkdownFile(source);
      return {
        slug: slugFromPath(path),
        title: String(data.title ?? ""),
        excerpt: String(data.excerpt ?? ""),
        date: String(data.date ?? ""),
        readTime: String(data.readTime ?? ""),
        tags: Array.isArray(data.tags) ? data.tags : [],
        type: String(data.type ?? "Essay"),
        published: Boolean(data.published ?? true),
        content,
        html: markdownToHtml(content),
      };
    })
    .filter((essay) => essay.published)
    .sort((a, b) => b.date.localeCompare(a.date));

export const getEssayBySlug = (slug: string | undefined) =>
  getEssays().find((essay) => essay.slug === slug);

export const getResume = (): ResumeContent => {
  const source = Object.values(resumeFiles)[0] ?? "";
  const { data, content } = parseMarkdownFile(source);

  return {
    title: String(data.title ?? "Resume"),
    summary: String(data.summary ?? ""),
    pdfUrl: String(data.pdfUrl ?? ""),
    externalUrl: data.externalUrl ? String(data.externalUrl) : undefined,
    updated: String(data.updated ?? ""),
    researchFocus: Array.isArray(data.researchFocus) ? data.researchFocus : [],
    quickFacts: Array.isArray(data.quickFacts) ? data.quickFacts : [],
    links: typeof data.links === "object" && !Array.isArray(data.links) ? data.links : {},
    content,
  };
};
