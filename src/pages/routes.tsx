import { ReactElement, ReactNode } from "react";
import RegisterCompanyPage from "./register/company";
import RegisterUserPage from "./register/user";
import LoginPage from "./login";
import UnauthorizedPage from "./unauthorized";
import DashboardPage from "./dashboard";
import DashboardFundPage from "./dashboard/fund";
import DashboardTeamPage from "./dashboard/team";
import session from "@/features/auth/services/session";
import { Navigate } from "react-router-dom";

type AppRoute = {
  name: string;
  key: string;
  element: ReactElement;
  path: string;
};

export enum PublicRoutePath {
  Login = "/",
  RegisterCompany = "register/company",
  RegisterUser = "register/user",
  ForgotPassword = "forgot-password",
  Unauthorized = "unauthorized",
  Forbidden = "forbidden",
}

export enum PrivateRoutePath {
  Dashboard = "home",
  Funds = "fund",
  Team = "team",
}

export const publicRoutes: AppRoute[] = [
  {
    name: "Влез",
    key: "login",
    element: <LoginPage />,
    path: PublicRoutePath.Login,
  },
  {
    name: "Регистрирай дружество",
    key: "registerCompany",
    element: <RegisterCompanyPage />,
    path: PublicRoutePath.RegisterCompany,
  },
  {
    name: "Регистрирай служител",
    key: "registerUser",
    element: <RegisterUserPage />,
    path: PublicRoutePath.RegisterUser,
  },
  {
    name: "Липса на достъп",
    key: "unauthorized",
    element: <UnauthorizedPage />,
    path: PublicRoutePath.Unauthorized,
  },
];

export const dahsboardRoutes = [
  {
    name: "Начало",
    key: "dashboard",
    element: <DashboardPage />,
    path: PrivateRoutePath.Dashboard,
  },
  {
    name: "Фондове",
    key: "fund",
    element: <DashboardFundPage />,
    path: PrivateRoutePath.Funds,
  },
  {
    name: "Екип",
    key: "team",
    element: <DashboardTeamPage />,
    path: PrivateRoutePath.Team,
  },
];

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const userSession = session.get();

  if (!userSession) {
    return <Navigate to={PublicRoutePath.Unauthorized} />;
  }

  return children;
};
