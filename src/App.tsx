import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, dahsboardRoutes } from "./pages/routes";
import DashboardLayout from "./layouts/dashboard-layout";
import PublicLayout from "./layouts/public-layout";
import ReactQueryProvider from "./lib/react-query-provider";
import { ProtectedRoute } from "./components/protected-route";

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
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="home" replace />} />
          {dahsboardRoutes.map((route) => {
            const relativePath = route.path.split("/").pop();
            return (
              <Route
                key={route.key}
                element={route.element}
                path={relativePath}
              />
            );
          })}
        </Route>
      </Routes>
    </ReactQueryProvider>
  );
}

export default App;
