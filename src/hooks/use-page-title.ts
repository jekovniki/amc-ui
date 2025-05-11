import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { dahsboardRoutes } from "@/pages/routes";
import { usePageTitleContext } from "@/context/PageTitleContext";

export const usePageTitle = (
  overrideTitle?: string,
  routes = dahsboardRoutes
) => {
  const location = useLocation();
  const { setPageTitle, pageTitle } = usePageTitleContext();

  useEffect(() => {
    if (overrideTitle) {
      setPageTitle(overrideTitle);
      return;
    }

    const currentPath = location.pathname.split("/").pop() || "";
    const currentRoute = routes.find((route) => {
      const routePath = route.path.split("/").pop() || "";
      return (
        currentPath === routePath || currentPath.startsWith(`${routePath}/`)
      );
    });
    if (currentRoute) {
      setPageTitle(currentRoute.name);
    } else {
      setPageTitle("");
    }
  }, [location.pathname, overrideTitle, routes, setPageTitle]);
  // Return both the current title and a setter for manual override
  return [pageTitle];
};
