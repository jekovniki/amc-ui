import session from "@/features/auth/services/session";
import { PrivateRoutePath, PublicRoutePath } from "@/pages/routes";

export const getDashboardUrl = (path: PrivateRoutePath): string => {
  const userSession = session.get();

  if (!userSession?.companyId) {
    console.error("No company ID found in session");
    return PublicRoutePath.Unauthorized;
  }

  const relativePath = path.split("/").pop();
  return `/${userSession.companyId}/${relativePath}`;
};

export const navigateToDashboard = (
  navigate: (path: string) => void,
  path: PrivateRoutePath,
  companyId?: string
): void => {
  if (companyId) {
    const relativePath = path.split("/").pop();
    navigate(`/${companyId}/${relativePath}`);
  } else {
    navigate(getDashboardUrl(path));
  }
};
