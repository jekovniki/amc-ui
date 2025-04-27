import session from "@/features/auth/services/session";
import { PublicRoutePath } from "@/pages/routes";
import { Outlet, useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const userSession = session.get();
  console.log("userSession", userSession);
  const navigate = useNavigate();
  if (!userSession) {
    navigate(PublicRoutePath.Unauthorized);
  }
  return (
    <div className="dashboard-layout">
      <div>Dashboard layout</div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
