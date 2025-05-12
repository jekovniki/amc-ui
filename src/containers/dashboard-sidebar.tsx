import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PrivateRoutePath } from "@/pages/routes";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import homeIcon from "../assets/home.svg";
import walletIcon from "../assets/wallet.svg";
import teamIcon from "../assets/team.svg";
import { DashboardLink } from "@/components/dashboard-link";

interface DashboardSidebarProps {
  companyId: string;
}

const DahsboardSidebar = ({ companyId }: DashboardSidebarProps) => {
  const { t } = useTranslation();
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex items-center justify-center h-[73px] border-b-[1px]">
        <div>
          <Link to={PrivateRoutePath.Dashboard}>
            <span className="font-black text-[24px] text-primary">УД</span>
            &nbsp;
            <span className="text-[24px] font-thin text-[#0C2134]">
              Мениджър
            </span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <DashboardLink
          icon={homeIcon}
          name={t("menu.main.home")}
          href={`/${companyId}/${PrivateRoutePath.Dashboard}`}
        />
        <DashboardLink
          icon={walletIcon}
          name={t("menu.main.funds")}
          href={`/${companyId}/${PrivateRoutePath.Entity}`}
        />
        <DashboardLink
          icon={teamIcon}
          name={t("menu.main.team")}
          href={`/${companyId}/${PrivateRoutePath.Team}`}
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
};

export default DahsboardSidebar;
