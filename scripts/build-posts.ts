import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import siteConfig from "../site.config";
import type { Post } from "../app/types/post";
import fg from "fast-glob";
import fs from "fs-extra";

/**
 * Rewrite relative attachment paths to absolute public paths.
 * Example: ./attachments/image.png -> /posts/attachments/image.png
 */
function rewriteAttachmentPaths(markdown: string): string {
  return markdown.replace(
    /!\[([^\]]*)\]\((\.\/)?attachments\/([^)]+)\)/g,
    "![$1](/posts/attachments/$3)"
  );
}

/**
 * Read all Markdown files under SiteConfig.blog.contentPath and convert them to Post objects.
 * - Parses frontmatter with gray-matter
 * - Converts Markdown body to HTML with marked
 * - Rewrites attachment paths to public URLs
 *
 * TODO: Support additional extensions (e.g., .mdx) if needed.
 */
export async function readPostsFromContent(
  contentRoot: string = siteConfig.blog.contentPath
): Promise<Post[]> {
  const absRoot = path.resolve(contentRoot);

  // Ensure the path exists and is a directory
  const s = await stat(absRoot);
  if (!s.isDirectory()) {
    throw new Error(`Content path is not a directory: ${absRoot}`);
  }

  const filePaths = await fg("**/*.md", { cwd: absRoot, absolute: true });

  const posts: Post[] = [];
  for (const absoluteFilePath of filePaths) {
    const raw = await readFile(absoluteFilePath, "utf8");
    const parsed = matter(raw);

    // Rewrite attachment paths before converting to HTML
    const rewrittenContent = rewriteAttachmentPaths(parsed.content);

    // Convert Markdown to HTML
    const html = marked.parse(rewrittenContent);

    // Derive slug from frontmatter or filename (without extension)
    const relativePath = path.relative(absRoot, absoluteFilePath);
    const filename = path.basename(relativePath);
    const basename = filename.replace(path.extname(filename), "");

    const fm = parsed.data as {
      title: string;
      date: string;
      draft: boolean;
      slug: string;
    };

    const slug = (fm.slug ?? basename).toString();
    const title = (fm.title ?? slug).toString();
    const date = fm.date ?? "";
    const draft = typeof fm.draft === "boolean" ? fm.draft : false;

    posts.push({
      slug,
      title,
      date,
      draft,
      content: typeof html === "string" ? html : String(html),
    });
  }

  return posts;
}

export async function generatePostsJson() {
  const posts = await readPostsFromContent();

  await Promise.all(
    posts.map(async (post) => {
      console.log(`generating post ${post.slug}`);
      await fs.outputJson(
        path.join(siteConfig.blog.generatedPath, `${post.slug}.json`),
        post
      );
    })
  );

  await fs.outputJson(
    path.join(siteConfig.blog.generatedPath, "posts.json"),
    posts
  );
}

export async function copyAttachments() {
  const attachmentsDir = path.join(siteConfig.blog.contentPath, "attachments");
  const attachments = await fg("**/*", { cwd: attachmentsDir, absolute: true });
  for (const attachment of attachments) {
    const outFile = path.join(
      "public/posts/attachments",
      path.basename(attachment)
    );
    await fs.copy(attachment, outFile);
  }
}

(async () => {
  await generatePostsJson();
  await copyAttachments();
})();
