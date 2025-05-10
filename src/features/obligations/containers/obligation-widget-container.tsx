import { DashboardTileHeader } from "@/components/dashboard-tile-header";
import { useGetObligations } from "../api/use-get-obligations";
import { ObligationStatus } from "../types/obligation";
import { useTranslation } from "react-i18next";
import { ObligationCard } from "../components/obligation-card";
import { Skeleton } from "@/components/ui/skeleton";

const ObligationWidgetContainer = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetObligations(ObligationStatus.PENDING);
  const obligationList = data?.data || [];
  return (
    <div>
      <DashboardTileHeader>
        {t("dashboard.obligationContainer.title")}
      </DashboardTileHeader>
      <div className="mt-4 flex flex-col gap-2">
        {isLoading ? (
          <div>
            <Skeleton className="w-full h-[104px] mb-2" />
            <Skeleton className="w-full h-[104px] mb-2" />
            <Skeleton className="w-full h-[104px] mb-2" />
          </div>
        ) : (
          obligationList.map((obligation) => (
            <ObligationCard
              key={obligation.id}
              obligationName={obligation.name}
              entityName={obligation.entity.name}
              dueDate={obligation.dueDateAt}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ObligationWidgetContainer;
