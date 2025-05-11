import { useParams } from "react-router-dom";

const DashboardEntityOverviewPage = () => {
  const { fundId } = useParams();

  return <div>Fund overview: {fundId}</div>;
};

export default DashboardEntityOverviewPage;
