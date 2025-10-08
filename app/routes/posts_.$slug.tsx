import { getPost } from "~/utils/post";
import { redirect, useLoaderData } from "react-router";
import type { Route } from "./+types/posts_.$slug";

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: `${loaderData.title} | taeyoung.dev` }];
}

export async function loader({ params }: Route.LoaderArgs) {
  const post = await getPost(params.slug);

  if (post == null) {
    throw new Error("Post not found");
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
