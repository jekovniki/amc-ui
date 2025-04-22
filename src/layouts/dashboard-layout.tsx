import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <div>Dashboard layout</div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
