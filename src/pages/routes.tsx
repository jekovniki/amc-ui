import { ReactElement } from "react";
import RegisterCompanyPage from "./register/company";
import RegisterUserPage from "./register/user";
import LoginPage from "./login";
import UnauthorizedPage from "./unauthorized";
import DashboardPage from "./dashboard";
import DashboardTeamPage from "./dashboard/team";
import DashboardProfilePage from "./dashboard/profile";
import DashboardEntityPage from "./dashboard/entity";
import DashboardEntityNavigationPage from "./dashboard/entity/navigation";
import DashboardEntityOverviewPage from "./dashboard/entity/preview";
import DashboardEntityAssetsPage from "./dashboard/entity/assets";
import DashboardEntityObligationsPage from "./dashboard/entity/obligations";
import DashboardEntityRestrictionsPage from "./dashboard/entity/restrictions";

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
  Entity = "entity",
  Team = "team",
  Profile = "my-profile",
}

export enum PrivateFundRoutePath {
  Overview = "overview",
  Assets = "assets",
  Restrictions = "restrictions",
  Obligations = "obligations",
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
    name: "Субекти",
    key: "entity",
    element: <DashboardEntityPage />,
    path: PrivateRoutePath.Entity,
  },
  {
    name: "Екип",
    key: "team",
    element: <DashboardTeamPage />,
    path: PrivateRoutePath.Team,
  },
  {
    name: "Профил",
    key: "profile",
    element: <DashboardProfilePage />,
    path: PrivateRoutePath.Profile,
  },
];

export const entityDashboardRoutes: AppRoute[] = [
  {
    name: "Фонд - Преглед",
    key: "entity-nav",
    element: <DashboardEntityNavigationPage />,
    path: "",
  },
  {
    name: "Фонд - Преглед",
    key: "entity-preview",
    element: <DashboardEntityOverviewPage />,
    path: PrivateFundRoutePath.Overview,
  },
  {
    name: "Фонд - Активи",
    key: "entity-assets",
    element: <DashboardEntityAssetsPage />,
    path: PrivateFundRoutePath.Assets,
  },
  {
    name: "Фонд - Задължения",
    key: "entity-obligations",
    element: <DashboardEntityObligationsPage />,
    path: PrivateFundRoutePath.Obligations,
  },
  {
    name: "Фонд - Ограничения",
    key: "entity-restrictions",
    element: <DashboardEntityRestrictionsPage />,
    path: PrivateFundRoutePath.Restrictions,
  },
];
