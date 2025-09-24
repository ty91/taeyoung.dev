import { getPost } from "~/utils/post";
import { useLoaderData } from "react-router";
import type { Route } from "./+types/posts_.$slug";

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPost(params.slug);
  return post;
}

export default function PostPage() {
  const post = useLoaderData<typeof loader>();
  return <div>{post.title}</div>;
}
