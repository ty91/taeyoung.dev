import type { Route } from "./+types/$";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Not Found · taeyoung.dev" }];
}

export default function NotFound() {
  return <div>Not Found</div>;
}
