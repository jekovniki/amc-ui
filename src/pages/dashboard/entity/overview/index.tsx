import { EntityBarChartIcon } from "@/components/icons/entity-bar-chart-icon";
import { EntityBillIcon } from "@/components/icons/entity-bill-icon";
import { EntityChartIcon } from "@/components/icons/entity-chart-icon";
import { EntityDatabaseIcon } from "@/components/icons/entity-database-icon";
import { EntityDocumentIcon } from "@/components/icons/entity-document.icon";
import { EntityWalletIcon } from "@/components/icons/entity-wallet-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetEntity } from "@/features/entity/api/use-get-entity";
import { Entity } from "@/features/entity/types/entity";
import { PrivateRoutePath } from "@/pages/routes";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { usePageTitle } from "@/hooks/use-page-title";

const DashboardEntityNavigationPage = () => {
  const { t } = useTranslation();
  const { fundId, companyId } = useParams();
  const { data, isLoading } = useGetEntity(fundId || "");
  const navigate = useNavigate();
  const fundData = data?.data || ({} as Entity);

  usePageTitle(data?.data?.name);

  const pages = [
    {
      name: "main",
      icon: (
        <EntityChartIcon className="text-[#0C213480] group-hover:text-primary transition-colors duration-200" />
      ),
    },
    {
      name: "assets",
      icon: (
        <EntityDatabaseIcon className="text-[#0C213480] group-hover:text-primary transition-colors duration-200" />
      ),
    },
    {
      name: "restrictions",
      icon: (
        <EntityBarChartIcon className="text-[#0C213480] group-hover:text-primary transition-colors duration-200" />
      ),
    },
    {
      name: "obligation",
      icon: (
        <EntityBillIcon className="text-[#0C213480] group-hover:text-primary transition-colors duration-200" />
      ),
    },
    {
      name: "documents",
      icon: (
        <EntityDocumentIcon className="text-[#0C213480] group-hover:text-primary transition-colors duration-200" />
      ),
    },
  ];
  const handleClick = (name: string) => {
    navigate(`/${companyId}/${PrivateRoutePath.Entity}/${fundId}/${name}`);
  };
  return (
    <div className="p-4 h-full flex items-start justify-center">
      <div className="max-w-[800px] w-full grid grid-cols-6 gap-6">
        <div className="col-span-6 flex flex-col items-center justify-center my-20">
          <EntityWalletIcon className="text-[#0C213440] mb-6" />
          {isLoading ? (
            <Skeleton className="h-[36px] w-[300px]" />
          ) : (
            <h2 className="text-[#0C2134] text-[24px] font-semibold">
              {fundData.name}
            </h2>
          )}
        </div>
        {pages.map(({ name, icon }) => (
          <div
            key={name}
            className="group bg-white col-span-2 shadow-md hover:shadow-sm transition-all cursor-pointer rounded-[3px] min-h-[240px] flex gap-2 text-center items-center justify-center flex-col p-4"
            onClick={() => {
              handleClick(name);
            }}
          >
            {icon}
            <h3 className="text-[#0C2134] font-semibold text-[16px] mt-4">
              {t(`entity.overview.${name}.title`)}
            </h3>
            <p className="text-[13px] text-[#0C213473]">
              {t(`entity.overview.${name}.description`)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardEntityNavigationPage;
