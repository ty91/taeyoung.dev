import { NavLink, useLocation } from "react-router";
import { cn } from "~/utils/cn";

export function GlobalNavigationBar() {
  const pathname = useLocation().pathname;

  return (
    <header className="pt-10 md:pt-16 mb-10">
      <nav>
        <ul className="flex gap-4">
          <LinkItem to="/" isActive={pathname === "/"}>
            About
          </LinkItem>
          <LinkItem to="/posts" isActive={pathname === "/posts"}>
            Posts
          </LinkItem>
        </ul>
      </nav>
    </header>
  );
}

function LinkItem({
  to,
  children,
  isActive,
}: {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <li>
      <NavLink
        to={to}
        className={cn(
          isActive ? "border-b-2" : "border-b-0",
          "py-0.5 hover:opacity-50"
        )}
        prefetch="render"
      >
        {children}
      </NavLink>
    </li>
  );
}
