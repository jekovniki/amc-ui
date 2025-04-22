import { Routes, Route } from "react-router-dom";
import { publicRoutes, dahsboardRoutes } from "./pages/routes";
import DashboardLayout from "./layouts/dashboard-layout";
import PublicLayout from "./layouts/public-layout";

function App() {
  return (
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
  );
}

export default App;
