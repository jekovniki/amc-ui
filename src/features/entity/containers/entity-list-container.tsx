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
import { useState } from "react";
import { AccessVisibility } from "@/features/auth/components/access-visibility";
import { UserPermission } from "@/features/auth/types/permissions";

const EntityListContainer = () => {
  const { t, i18n } = useTranslation();
  const { data, isLoading } = useGetCompanyEntities();
  const entities = data?.data;
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleFormVisibility = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <DashboardTileHeader>
          {t("dashboard.entityContainer.title")}
        </DashboardTileHeader>
        <AccessVisibility accessLevelRequired={UserPermission.entityCreate}>
          <Dialog open={modalIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleFormVisibility}>
                + {t("dashboard.entityContainer.button")}
              </Button>
            </DialogTrigger>
            <DialogContent className="wide-modal">
              <DialogTitle className="pt-6 pb-2 px-4">
                {t("dialog.entity.add.title")}
              </DialogTitle>
              <div className="bg-white border-t-[1px] md:rounded-b">
                <AddEntityForm toggleFormVisibility={handleFormVisibility} />
              </div>
            </DialogContent>
          </Dialog>
        </AccessVisibility>
      </div>
      <div className="h-[340px] overflow-auto">
        {isLoading ? (
          <div>
            <Skeleton className="w-full h-[108px] mb-2" />
            <Skeleton className="w-full h-[108px] mb-2" />
            <Skeleton className="w-full h-[108px] mb-2" />
          </div>
        ) : entities?.length ? (
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
          <div className="flex items-center justify-center h-full text-[#0C2134BF] text-[14px] font-light text-center">
            {t("dashboard.entityContainer.empty")}
          </div>
        )}
      </div>
    </>
  );
};

export default EntityListContainer;
