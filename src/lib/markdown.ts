import type { Element, Root, RootContent } from "hast";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

/**
 * Shifts heading levels down (e.g. h2 → h3) so Markdown embedded inside a page
 * section keeps a valid document outline while authors write plain `##`.
 */
function rehypeDemoteHeadings({ by }: { by: number }) {
  const visit = (node: Root | RootContent) => {
    if (node.type === "element") {
      const match = /^h([1-6])$/.exec(node.tagName);
      if (match) (node as Element).tagName = `h${Math.min(6, Number(match[1]) + by)}`;
    }
    if ("children" in node) node.children.forEach(visit);
  };
  return (tree: Root) => visit(tree);
}

function createProcessor(demote: number) {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeDemoteHeadings, { by: demote })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: { className: ["heading-anchor"], ariaHidden: "true", tabIndex: -1 },
      content: { type: "text" as const, value: "#" },
    })
    .use(rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: false })
    .use(rehypeStringify);
}

const processors = new Map<number, ReturnType<typeof createProcessor>>();

/** Markdown → HTML at build time. Runs only on the server; nothing ships to the client. */
export async function renderMarkdown(source: string, { demoteHeadings = 0 } = {}): Promise<string> {
  let processor = processors.get(demoteHeadings);
  if (!processor) {
    processor = createProcessor(demoteHeadings);
    processors.set(demoteHeadings, processor);
  }
  return String(await processor.process(source));
}

export function readingTime(source: string): number {
  const words = source.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
