import { DashboardTileHeader } from "@/components/dashboard-tile-header";
import { useGetObligations } from "../api/use-get-obligations";
import { ObligationStatus } from "../types/obligation";

const ObligationWidgetContainer = () => {
  const { data } = useGetObligations(ObligationStatus.PENDING);
  console.log("data : ", data);
  return (
    <div>
      <DashboardTileHeader>Sd</DashboardTileHeader>
    </div>
  );
};

export default ObligationWidgetContainer;
