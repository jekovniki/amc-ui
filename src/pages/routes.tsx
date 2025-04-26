import { ReactElement } from "react";
import RegisterCompanyPage from "./register/company";
import RegisterUserPage from "./register/user";
import LoginPage from "./login";

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
}

export enum PrivateRoutePath {
  Dashboard = "dashboard/home",
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
];

export const dahsboardRoutes = [
  {
    name: "Начало",
    key: "dashboard",
    element: <div>Dashboard</div>,
    path: "/",
  },
];
