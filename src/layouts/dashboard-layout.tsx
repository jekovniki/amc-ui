import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarProvider } from "@/components/ui/sidebar";
import DahsboardSidebar from "@/containers/dashboard-sidebar";
import session from "@/features/auth/services/session";
import { PublicRoutePath } from "@/pages/routes";
import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const DashboardLayout = () => {
  const userSession = session.get();
  const { companyId } = useParams();
  const navigate = useNavigate();
  console.log("userSession", userSession);

  useEffect(() => {
    if (!userSession) {
      navigate(PublicRoutePath.Unauthorized);
      return;
    }

    if (userSession.companyId !== companyId) {
      navigate(PublicRoutePath.Unauthorized);
      return;
    }
  }, [userSession, companyId, navigate]);

  if (!userSession) {
    return null; // Don't render anything while redirecting
  }

  const userInitials = `${userSession?.firstName.substring(
    0,
    1
  )}${userSession?.lastName.substring(0, 1)}`;
  return (
    <SidebarProvider>
      <DahsboardSidebar companyId={companyId || ""} />
      <div className="w-full bg-[#FAFAFA]">
        <div className="flex items-center justify-between gap-4 h-[73px] bg-white shadow-md w-full px-4">
          <h1 className="text-[18px] text-[#0C2134]">Title</h1>
          <Avatar className="cursor-pointer">
            <AvatarImage src={userSession?.logo} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </div>
        <Outlet />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
