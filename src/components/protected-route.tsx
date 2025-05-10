import session from "@/features/auth/services/session";
import { PublicRoutePath } from "@/pages/routes";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const userSession = session.get();

  if (!userSession) {
    return <Navigate to={PublicRoutePath.Unauthorized} />;
  }

  return children;
};
