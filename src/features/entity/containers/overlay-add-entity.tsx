import { useState } from "react";
import { useGetCompanyEntities } from "../api/use-get-company-entities";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { AddEntityForm } from "../components/add-entity-form";

const OverlayAddEntity = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetCompanyEntities();

  const companyEntities = data?.data || [];
  const [open, setIsOpen] = useState<boolean>(
    !isLoading && !companyEntities.length
  );
  const [openAddEntityModal, setOpenAddEntityModal] = useState(false);

  const handleCloseBothModals = () => {
    setIsOpen(!open);
    setOpenAddEntityModal(!openAddEntityModal);
  };

  return !isLoading && !companyEntities.length ? (
    <Dialog open={open}>
      <DialogContent className="wide-modal">
        <DialogTitle className="pt-6 pb-2 px-4 text-center">
          {t("dialog.entity.navigate.title")}
        </DialogTitle>
        <div className="border-t border-t-[1px] p-4">
          <DialogDescription>
            <p className="pb-2 text-[16px] text-center">
              {t("dialog.entity.navigate.description.first")}
            </p>
            <p className="pb-2 text-[16px] text-center">
              {t("dialog.entity.navigate.description.second")}
            </p>
            <p className="pb-2 text-[16px] text-center">
              {t("dialog.entity.navigate.description.third")}
            </p>
          </DialogDescription>
        </div>
        <div className="border-t border-t-[1px] p-4 flex items-center justify-center gap-4">
          <Dialog open={openAddEntityModal}>
            <DialogContent className="wide-modal">
              <DialogTitle className="pt-6 pb-2 px-4">
                {t("dialog.entity.add.title")}
              </DialogTitle>
              <div className="bg-white border-t-[1px] md:rounded-b">
                <AddEntityForm toggleFormVisibility={handleCloseBothModals} />
              </div>
            </DialogContent>
          </Dialog>
          <Button
            onClick={() => {
              setOpenAddEntityModal(true);
            }}
          >
            {t("dialog.entity.navigate.buttons.continue")}
          </Button>
          <Button onClick={() => setIsOpen(false)} variant="outline">
            {t("dialog.entity.navigate.buttons.cancel")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <></>
  );
};

export default OverlayAddEntity;
