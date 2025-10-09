import { getPost } from "~/utils/post";
import { data, redirect, useLoaderData } from "react-router";
import type { Route } from "./+types/posts_.$slug";

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: `${loaderData.title} · taeyoung.dev` }];
}

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
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
