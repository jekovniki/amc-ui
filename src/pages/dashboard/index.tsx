import { CompanyWelcomeCard } from "@/features/company/components/company-welcome-card";
import EntityListContainer from "@/features/entity/containers/entity-list-container";
import ObligationWidgetContainer from "@/features/obligations/containers/obligation-widget-container";
import { useTranslation } from "react-i18next";

const DashboardPage = () => {
  const { t } = useTranslation();
  return (
    <div className="p-4 grid grid-cols-12 gap-8">
      <div className="col-span-8">
        <CompanyWelcomeCard />
      </div>
      <div className="col-span-4">
        <EntityListContainer />
      </div>
      <div className="col-span-8">
        <div className="bg-white rounded-md shadow-md min-h-[400px] flex items-center justify-center">
          <div className="text-[#0C2134BF] text-[14px] font-light text-center">
            {t("dashboard.entityContainer.empty")}
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <ObligationWidgetContainer />
      </div>
    </div>
  );
};

export default DashboardPage;
