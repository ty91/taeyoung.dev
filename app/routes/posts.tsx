import { Link, useLoaderData } from "react-router";
import { getPosts } from "~/utils/post";

export async function loader() {
  const posts = await getPosts();
  return posts;
}

export default function PostsPage() {
  const posts = useLoaderData<typeof loader>();

  return (
    <ul>
      {posts.map(({ title, slug }) => (
        <li key={slug}>
          <Link to={`/posts/${slug}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}
