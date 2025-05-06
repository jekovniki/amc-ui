import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useGetCompanyEntities } from "../api/use-get-company-entities";
import { getEntityNameByLanguage } from "../utils/entity-translation";
import { EntityPreviewCard } from "../components/entity-preview-card";
import { Loader } from "@/components/loader";
import { DashboardTileHeader } from "@/components/dashboard-tile-header";

const EntityListContainer = () => {
  const { t, i18n } = useTranslation();
  const { data, isLoading } = useGetCompanyEntities();
  const entities = data?.data;

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <DashboardTileHeader>
          {t("dashboard.entityContainer.title")}
        </DashboardTileHeader>
        <Button>+ {t("dashboard.entityContainer.button")}</Button>
      </div>
      <div className="h-[340px] overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : entities ? (
          entities.map((entity) => (
            <EntityPreviewCard
              key={entity.id}
              id={entity.id}
              name={entity.name}
              bottomLeftText={entity.uic}
              bottomRightText={getEntityNameByLanguage(
                entity.entityType.name,
                i18n.language
              )}
            />
          ))
        ) : (
          <div className="h-full flex items-center justify-center"></div>
        )}
      </div>
    </>
  );
};

export default EntityListContainer;
