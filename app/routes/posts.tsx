import { Link, useLoaderData } from "react-router";
import { getPosts } from "~/utils/post";
import type { Route } from "./+types/posts";
import { formatDate } from "~/utils/date";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Posts · taeyoung.dev" }];
}

export async function loader() {
  const posts = await getPosts();
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export default function PostsPage() {
  const posts = useLoaderData<typeof loader>();

  return (
    <section className="grid grid-cols-1 gap-2">
      {posts.map(({ title, date, slug }) => (
        <Link
          key={slug}
          to={`/posts/${slug}`}
          prefetch="viewport"
          className="grid grid-cols-[120px_1fr] gap-2 justify-between items-center"
        >
          <span className="text-sm text-gray-500">{formatDate(date)}</span>
          <h2 className="hover:opacity-50 font-bold py-2">{title}</h2>
        </Link>
      ))}
    </section>
  );
}
