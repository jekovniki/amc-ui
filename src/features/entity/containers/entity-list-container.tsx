import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useGetCompanyEntities } from "../api/use-get-company-entities";
import { getEntityNameByLanguage } from "../utils/entity-translation";
import { EntityPreviewCard } from "../components/entity-preview-card";
import { DashboardTileHeader } from "@/components/dashboard-tile-header";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddEntityForm } from "../components/add-entity-form";

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
        <Dialog>
          <DialogTrigger asChild>
            <Button>+ {t("dashboard.entityContainer.button")}</Button>
          </DialogTrigger>
          <DialogContent className="wide-modal">
            <DialogTitle className="pt-6 pb-2 px-4">
              {t("dialog.entity.add.title")}
            </DialogTitle>
            <div className="bg-white border-t-[1px] md:rounded-b">
              <AddEntityForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="h-[340px] overflow-auto">
        {isLoading ? (
          <div>
            <Skeleton className="w-full h-[108px] mb-2" />
            <Skeleton className="w-full h-[108px] mb-2" />
            <Skeleton className="w-full h-[108px] mb-2" />
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
