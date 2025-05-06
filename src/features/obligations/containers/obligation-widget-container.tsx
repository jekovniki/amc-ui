import { DashboardTileHeader } from "@/components/dashboard-tile-header";
import { useGetObligations } from "../api/use-get-obligations";
import { ObligationStatus } from "../types/obligation";
import { useTranslation } from "react-i18next";
import { ObligationCard } from "../components/obligation-card";

const ObligationWidgetContainer = () => {
  const { t } = useTranslation();
  const { data } = useGetObligations(ObligationStatus.PENDING);
  console.log("data : ", data);
  const obligationList = data?.data || [];
  return (
    <div>
      <DashboardTileHeader>
        {t("dashboard.obligationContainer.title")}
      </DashboardTileHeader>
      <div className="mt-4 flex flex-col gap-2">
        {obligationList.map((obligation) => (
          <ObligationCard
            key={obligation.id}
            obligationName={obligation.name}
            entityName={obligation.entity.name}
            dueDate={obligation.dueDateAt}
          />
        ))}
      </div>
    </div>
  );
};

export default ObligationWidgetContainer;
