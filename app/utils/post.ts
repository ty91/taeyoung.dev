import siteConfig from "site-config";
import fs from "fs-extra";
import type { Post } from "~/types/post";

export async function getPosts() {
  const posts: Post[] = await fs.readJson(
    `${siteConfig.blog.generatedPath}/posts.json`
  );
  return posts;
}

export async function getPost(slug: string) {
  try {
    const post: Post = await fs.readJson(
      `${siteConfig.blog.generatedPath}/${slug}.json`
    );
    return post;
  } catch {
    return null;
  }
}
