import rss from "@astrojs/rss";
import { getCollection, type CollectionEntry } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts", ({ data }: CollectionEntry<"posts">) => !data.draft);
  posts.sort((a: CollectionEntry<"posts">, b: CollectionEntry<"posts">) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "taeyoung.dev",
    description: "taeyoung.dev",
    site: context.site!,
    items: posts.map((post: CollectionEntry<"posts">) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/posts/${post.slug}/`,
    })),
  });
}
