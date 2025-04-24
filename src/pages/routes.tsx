import { ReactElement } from "react";
import RegisterCompanyPage from "./register/company";

type AppRoute = {
  name: string;
  element: ReactElement;
  path: string;
};

export const publicRoutes: AppRoute[] = [
  {
    name: "Влез",
    element: <div>Login</div>,
    path: "/",
  },
  {
    name: "Регистрирай дружество",
    element: <RegisterCompanyPage />,
    path: "register/company",
  },
  {
    name: "Регистрирай служител",
    element: <div>Register user</div>,
    path: "register/user",
  },
];

export const dahsboardRoutes = [
  {
    name: "Начало",
    element: <div>Dashboard</div>,
    path: "/",
  },
];
