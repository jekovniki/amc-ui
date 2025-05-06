import { CompanyWelcomeCard } from "@/features/company/components/company-welcome-card";
import EntityListContainer from "@/features/entity/containers/entity-list-container";
import ObligationWidgetContainer from "@/features/obligations/containers/obligation-widget-container";

const DashboardPage = () => {
  return (
    <div className="p-4 grid grid-cols-12 gap-8">
      <div className="col-span-8">
        <CompanyWelcomeCard />
      </div>
      <div className="col-span-4">
        <EntityListContainer />
      </div>
      <div className="col-span-8"></div>
      <div className="col-span-4">
        <ObligationWidgetContainer />
      </div>
    </div>
  );
};

export default DashboardPage;
