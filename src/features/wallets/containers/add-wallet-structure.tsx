import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface AddWalletStructureProps {
  triggerType: "button" | "link";
}

const AddWalletStructure = ({ triggerType }: AddWalletStructureProps) => {
  const { t } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleFormVisibility = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <Dialog>
      <DialogTrigger>
        {triggerType === "link" ? (
          <Button onClick={handleFormVisibility}>
            {t("dashboard.assets.noAssets.button")}
          </Button>
        ) : (
          <Button onClick={handleFormVisibility}>
            {t("dashboard.assets.noAssets.button")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="wide-modal">
        <DialogTitle className="pt-6 pb-2 px-4 text-center">
          {t("dialog.wallet.add.title")}
        </DialogTitle>
        <div className="bg-white border-t-[1px] md:rounded-b"></div>
      </DialogContent>
    </Dialog>
  );
};

export default AddWalletStructure;
