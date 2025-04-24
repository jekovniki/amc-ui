import { Routes, Route } from "react-router-dom";
import { publicRoutes, dahsboardRoutes } from "./pages/routes";
import DashboardLayout from "./layouts/dashboard-layout";
import PublicLayout from "./layouts/public-layout";
import ReactQueryProvider from "./lib/react-query-provider";

function App() {
  return (
    <ReactQueryProvider>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          {publicRoutes.map((route) => (
            <Route
              element={route.element}
              index={route.path === "/"}
              path={route.path === "/" ? undefined : route.path}
            />
          ))}
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          {dahsboardRoutes.map((route) => (
            <Route
              element={route.element}
              index={route.path === "/"}
              path={route.path === "/" ? undefined : route.path}
            />
          ))}
        </Route>
      </Routes>
    </ReactQueryProvider>
  );
}

export default App;
