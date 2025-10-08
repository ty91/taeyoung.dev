import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "taeyoung.dev" }];
}

export default function Home() {
  return <div>Home</div>;
}
