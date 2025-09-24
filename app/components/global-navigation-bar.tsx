import { NavLink } from "react-router";

export function GlobalNavigationBar() {
  return (
    <nav>
      <ul>
        <LinkItem to="/">Home</LinkItem>
        <LinkItem to="/posts">Posts</LinkItem>
        <LinkItem to="/about">About</LinkItem>
      </ul>
    </nav>
  );
}

function LinkItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <NavLink to={to} prefetch="render">
        {children}
      </NavLink>
    </li>
  );
}
