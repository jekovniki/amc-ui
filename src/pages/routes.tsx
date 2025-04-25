import { ReactElement } from "react";
import RegisterCompanyPage from "./register/company";

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
}

export const publicRoutes: AppRoute[] = [
  {
    name: "Влез",
    key: "login",
    element: <div>Login</div>,
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
    element: <div>Register user</div>,
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
