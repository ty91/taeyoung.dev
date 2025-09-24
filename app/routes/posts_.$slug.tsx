import { getPost } from "~/utils/post";
import { redirect, useLoaderData } from "react-router";
import type { Route } from "./+types/posts_.$slug";

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPost(params.slug);

  if (post == null) {
    return redirect("/404");
  }

  return post;
}

export default function PostPage() {
  const { title, content } = useLoaderData<typeof loader>();

  return (
    <div>
      <article dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
