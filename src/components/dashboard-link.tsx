import { SidebarGroup } from "./ui/sidebar";
import { NavLink } from "react-router-dom";

interface DashboardLinkProps {
  href: string;
  icon: string;
  name: string;
  className?: string;
}

export const DashboardLink = ({
  href,
  icon,
  name,
  className,
}: DashboardLinkProps) => {
  return (
    <SidebarGroup className={className}>
      <NavLink
        to={href}
        className={({ isActive }) =>
          `flex items-center gap-4 p-[5px] ${isActive ? "text-primary" : ""}`
        }
      >
        <img src={icon} alt={name} width={24} height={24} />
        <span>{name}</span>
      </NavLink>
    </SidebarGroup>
  );
};
