import { Link, useLoaderData } from "react-router";
import { getPosts } from "~/utils/post";

export async function loader() {
  const posts = await getPosts();
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export default function PostsPage() {
  const posts = useLoaderData<typeof loader>();

  return (
    <ul className="grid grid-cols-1 gap-2">
      {posts.map(({ title, date, slug }) => (
        <li key={slug} className="flex justify-between items-center">
          <Link
            to={`/posts/${slug}`}
            className="flex-1 hover:opacity-50 py-2"
            prefetch="intent"
          >
            {title}
          </Link>
          <span className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString()}
          </span>
        </li>
      ))}
    </ul>
  );
}
