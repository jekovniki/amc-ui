import { DashboardTileHeader } from "@/components/dashboard-tile-header";
import { useGetObligations } from "../api/use-get-obligations";
import { ObligationStatus } from "../types/obligation";
import { useTranslation } from "react-i18next";
import { ObligationCard } from "../components/obligation-card";
import { Skeleton } from "@/components/ui/skeleton";
import { AccessVisibility } from "@/features/auth/components/access-visibility";
import { UserPermission } from "@/features/auth/types/permissions";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddObligationForm } from "../components/add-obligation-form";
import { useGetCompanyEntities } from "@/features/entity/api/use-get-company-entities";

const ObligationWidgetContainer = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetObligations(ObligationStatus.PENDING);
  const entityResponse = useGetCompanyEntities();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const obligationList =
    data?.data
      .filter((obligation) => {
        const today = new Date();
        const dueDate = new Date(obligation.dueDateAt);

        today.setHours(0, 0, 0, 0);
        dueDate.setHours(0, 0, 0, 0);

        return dueDate >= today;
      })
      .slice()
      .reverse() || [];

  const entities = entityResponse.data?.data || [];

  const handleFormVisibility = () => {
    setModalIsOpen(!modalIsOpen);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <DashboardTileHeader>
          {t("dashboard.obligationContainer.title")}
        </DashboardTileHeader>
        {entities.length ? (
          <AccessVisibility
            accessLevelRequired={UserPermission.obligationCreate}
          >
            <Dialog open={modalIsOpen}>
              <DialogTrigger asChild>
                <Button onClick={handleFormVisibility}>
                  + {t("dashboard.obligationContainer.button")}
                </Button>
              </DialogTrigger>
              <DialogContent className="wide-modal">
                <DialogTitle className="pt-6 pb-2 px-4">
                  {t("dialog.entity.add.title")}
                </DialogTitle>
                <div className="bg-white border-t-[1px] md:rounded-b">
                  <AddObligationForm
                    toggleFormVisibility={handleFormVisibility}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </AccessVisibility>
        ) : (
          ""
        )}
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {isLoading ? (
          <div>
            <Skeleton className="w-full h-[104px] mb-2" />
            <Skeleton className="w-full h-[104px] mb-2" />
            <Skeleton className="w-full h-[104px] mb-2" />
          </div>
        ) : obligationList.length ? (
          obligationList.map((obligation) => (
            <ObligationCard
              key={obligation.id}
              obligation={obligation}
              entityName={obligation.entity.name}
              dueDate={obligation.dueDateAt}
            />
          ))
        ) : entities?.length ? (
          <div className="bg-white h-[108px] text-[#0C2134BF] text-[14px] font-light shadow-md px-4 mb-2 transition-all flex items-center justify-center">
            {t("dashboard.obligationContainer.empty")}
          </div>
        ) : (
          <div className="bg-white h-[108px] text-[#0C2134BF] text-[14px] font-light shadow-md px-4 mb-2 transition-all flex items-center justify-center">
            {t("dashboard.entityContainer.empty")}
          </div>
        )}
      </div>
    </div>
  );
};

export default ObligationWidgetContainer;
