import { Routes, Route, Navigate } from "react-router-dom";
import {
  publicRoutes,
  dahsboardRoutes,
  entityDashboardRoutes,
} from "./pages/routes";
import DashboardLayout from "./layouts/dashboard-layout";
import PublicLayout from "./layouts/public-layout";
import ReactQueryProvider from "./lib/react-query-provider";
import { ProtectedRoute } from "./components/protected-route";
import { PageTitleProvider } from "./context/PageTitleContext";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <ReactQueryProvider>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          {publicRoutes.map((route) => (
            <Route
              key={route.key}
              element={route.element}
              index={route.path === "/"}
              path={route.path === "/" ? undefined : route.path}
            />
          ))}
        </Route>
        <Route
          path="/:companyId/"
          element={
            <ProtectedRoute>
              <PageTitleProvider>
                <DashboardLayout />
              </PageTitleProvider>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          {dahsboardRoutes
            .filter((route) => route.key !== "entity")
            .map((route) => {
              const relativePath = route.path.split("/").pop();
              return (
                <Route
                  key={route.key}
                  element={route.element}
                  path={relativePath}
                />
              );
            })}
          {dahsboardRoutes
            .filter((route) => route.key === "entity")
            .map((route) => {
              const relativePath = route.path.split("/").pop();
              return (
                <>
                  <Route
                    key={route.key}
                    path={relativePath}
                    element={route.element}
                  />

                  <Route path={`${relativePath}/:fundId`}>
                    {entityDashboardRoutes.map((fundRoute) => {
                      const fundRelativePath = fundRoute.path.split("/").pop();
                      return (
                        <Route
                          key={fundRoute.key}
                          element={fundRoute.element}
                          path={fundRelativePath}
                        />
                      );
                    })}
                  </Route>
                </>
              );
            })}
        </Route>
      </Routes>
      <Toaster />
    </ReactQueryProvider>
  );
}

export default App;
