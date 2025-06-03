import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarProvider } from "@/components/ui/sidebar";
import DahsboardSidebar from "@/containers/dashboard-sidebar";
import { usePageTitleContext } from "@/context/PageTitleContext";
import { useSignOut } from "@/features/auth/api/use-sign-out";
import session from "@/features/auth/services/session";
import { PrivateRoutePath, PublicRoutePath } from "@/pages/routes";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

const DashboardLayout = () => {
  const { t } = useTranslation();
  const userSession = session.get();
  const { companyId } = useParams();
  const navigate = useNavigate();
  const signOut = useSignOut();
  const { pageTitle } = usePageTitleContext();

  const handleSignOut = () => {
    signOut.mutate(undefined, {
      onSuccess: () => {
        navigate(PublicRoutePath.Login);
      },
      onError: () => {
        navigate(PublicRoutePath.Login);
      },
    });
  };

  useEffect(() => {
    if (!userSession) {
      navigate(`/${PublicRoutePath.Unauthorized}`);
      return;
    }

    if (userSession.companyId !== companyId) {
      navigate(`/${PublicRoutePath.Unauthorized}`);
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
          <h1 className="text-[18px] text-[#0C2134]">{pageTitle}</h1>
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src={userSession?.logo} />
                <AvatarFallback>{userInitials}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="mr-2">
              <ul>
                <li className="pb-2">
                  <Link to={PrivateRoutePath.Profile}>
                    {t("menu.user.profile")}
                  </Link>
                </li>
                <li className="cursor-pointer" onClick={handleSignOut}>
                  Sign out
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
        <Outlet />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
