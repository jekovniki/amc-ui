import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PrivateRoutePath } from "@/pages/routes";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import homeIcon from "../assets/home.svg";
import walletIcon from "../assets/wallet.svg";
import teamIcon from "../assets/team.svg";
import { DashboardLink } from "@/components/dashboard-link";
import { useState } from "react";
import { useGetCompanyEntities } from "@/features/entity/api/use-get-company-entities";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCompany } from "@/features/company/api/use-get-company";
import { AccessVisibility } from "@/features/auth/components/access-visibility";
import { UserPermission } from "@/features/auth/types/permissions";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddEntityForm } from "@/features/entity/components/add-entity-form";

interface DashboardSidebarProps {
  companyId: string;
}

const DahsboardSidebar = ({ companyId }: DashboardSidebarProps) => {
  const { t } = useTranslation();
  const [isDropdownToggled, setIsDropdownToggled] = useState(true);
  const { data, isLoading } = useGetCompanyEntities();
  const companyResponse = useGetCompany();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleFormVisibility = () => {
    setModalOpen(!isModalOpen);
  };

  const logo = companyResponse?.data?.data?.logo;
  const name = companyResponse?.data?.data?.name;

  const companyEntities = data?.data || [];

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex items-center justify-center h-[73px] border-b-[1px]">
        <div>
          <Link to={PrivateRoutePath.Dashboard}>
            {companyResponse.isLoading ? (
              <Skeleton className="h-[60px] w-[245px]" />
            ) : logo ? (
              <img
                src={logo}
                alt={name}
                className="h-full w-full max-h-[60px] max-w-[245px]"
              />
            ) : (
              <>
                <span className="font-black text-[24px] text-primary">УД</span>
                &nbsp;
                <span className="text-[24px] font-thin text-[#0C2134]">
                  Мениджър
                </span>
              </>
            )}
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <DashboardLink
          icon={homeIcon}
          name={t("menu.main.home")}
          href={`/${companyId}/${PrivateRoutePath.Dashboard}`}
        />
        <SidebarGroup>
          <div
            className={`flex items-center gap-4 cursor-pointer p-[5px] ${
              isDropdownToggled ? "text-[#0a6dc8]" : ""
            }`}
            onClick={() => {
              setIsDropdownToggled(!isDropdownToggled);
            }}
          >
            <img
              src={walletIcon}
              alt={t("menu.main.funds")}
              width={24}
              height={24}
            />
            <span>{t("menu.main.funds")}</span>
          </div>
          <div
            className={`${
              isDropdownToggled
                ? "pointer-events-auto pl-10 pr-2 h-auto"
                : "h-[0px] opacity-0 pointer-events-none"
            } transition-all pt-[5px]`}
          >
            {isLoading ? (
              <>
                <Skeleton className="h-[26px] mb-2" />
                <Skeleton className="h-[26px] mb-2" />
                <Skeleton className="h-[26px]" />
              </>
            ) : (
              companyEntities.map((entity) => (
                <NavLink
                  key={entity.id}
                  to={`/${companyId}/${PrivateRoutePath.Entity}/${entity.id}`}
                  className={({ isActive }) =>
                    `block p-[5px] ${isActive ? "text-primary" : ""}`
                  }
                >
                  <span className="font-light text-[14px]">{entity.name}</span>
                </NavLink>
              ))
            )}
            <AccessVisibility accessLevelRequired={UserPermission.entityCreate}>
              <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                <DialogTrigger asChild>
                  <span className="font-light text-[14px] p-[5px] cursor-pointer transition-all hover:text-primary">
                    + {t("dashboard.entityContainer.button")}
                  </span>
                </DialogTrigger>
                <DialogContent className="wide-modal">
                  <DialogTitle className="pt-6 pb-2 px-4">
                    {t("dialog.entity.add.title")}
                  </DialogTitle>
                  <div className="bg-white border-t-[1px] md:rounded-b">
                    <AddEntityForm
                      toggleFormVisibility={handleFormVisibility}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </AccessVisibility>
          </div>
        </SidebarGroup>
        <DashboardLink
          icon={teamIcon}
          name={t("menu.main.team")}
          className={`pt-[0px]`}
          href={`/${companyId}/${PrivateRoutePath.Team}`}
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger onClick={() => setIsDropdownToggled(false)} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default DahsboardSidebar;
