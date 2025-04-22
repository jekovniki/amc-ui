import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="public-layout">
      <div>Public layout</div>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
