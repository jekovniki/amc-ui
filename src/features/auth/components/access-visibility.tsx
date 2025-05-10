import { ReactNode } from "react";
import session from "../services/session";
import { UserPermission } from "../types/permissions";

interface AccessVisibilityProps {
  children: ReactNode;
  accessLevelRequired: UserPermission;
}

export const AccessVisibility = ({
  children,
  accessLevelRequired,
}: AccessVisibilityProps) => {
  const sessionData = session.get();
  if (sessionData?.permissions.includes(accessLevelRequired)) {
    return <>{children}</>;
  }
  return <div></div>;
};
