import { useGetEntity } from "@/features/entity/api/use-get-entity";
import { Entity } from "@/features/entity/types/entity";
import { usePageTitle } from "@/hooks/use-page-title";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const DashboardEntityRestrictionsPage = () => {
  const { t } = useTranslation();
  const { fundId, companyId } = useParams();
  const { data, isLoading } = useGetEntity(fundId || "");
  console.log("isLoading : ", isLoading);

  const fundData = data?.data || ({} as Entity);

  usePageTitle(`${fundData?.name} | ${t("restrictions.title")}`);
  return (
    <div>
      {t("restrictions.title")} : {fundId} | {companyId}
    </div>
  );
};

export default DashboardEntityRestrictionsPage;
