import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { dahsboardRoutes } from "@/pages/routes";

export const usePageTitle = (
  defaultTitle = "Dashboard",
  routes = dahsboardRoutes
) => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState<string>(defaultTitle);

  useEffect(() => {
    // Otherwise determine title from routes
    const currentPath = location.pathname.split("/").pop() || "";
    const currentRoute = routes.find((route) => {
      // Handle both exact match and nested routes
      const routePath = route.path.split("/").pop() || "";
      return (
        currentPath === routePath || currentPath.startsWith(`${routePath}/`)
      );
    });

    if (currentRoute) {
      setPageTitle(currentRoute.name);
    } else {
      setPageTitle(defaultTitle);
    }
  }, [location.pathname, defaultTitle, routes]);

  // Return both the current title and a setter for manual override
  return [pageTitle];
};
