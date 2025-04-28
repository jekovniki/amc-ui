import { SidebarProvider } from "@/components/ui/sidebar";
import DahsboardSidebar from "@/containers/dashboard-sidebar";
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
    <SidebarProvider>
      <DahsboardSidebar />
      <div className="w-full">
        <div className="flex items-center justify-cetenr gap-4 h-[73px] bg-white shadow-md w-full px-4">
          <h1 className="text-[18px] text-[#0C2134]">Title</h1>
        </div>
        <Outlet />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
