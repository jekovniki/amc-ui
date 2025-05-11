import { useParams } from "react-router-dom";

const DashboardFundOverviewPage = () => {
  const { fundId } = useParams();

  return <div>Fund overview: {fundId}</div>;
};

export default DashboardFundOverviewPage;
