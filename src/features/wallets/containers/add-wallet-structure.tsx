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

enum StructureTabs {
  Manual = "manual",
  Automatic = "automatic",
}

const AddWalletStructure = ({ triggerType }: AddWalletStructureProps) => {
  const { t } = useTranslation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tab, setTab] = useState<StructureTabs>(StructureTabs.Manual);
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
        <DialogTitle className="pt-6 pb-2 px-4">
          {t("dialog.wallet.add.title")}
        </DialogTitle>
        <div className="bg-white border-t-[1px] border-b-[1px] md:rounded-b flex items-center justify-center">
          <div
            className={`py-4 px-6 transition-all border-b-2 text-[#0C2134] text-sm ${
              tab === StructureTabs.Manual
                ? "bg-[#2038B612] border-primary font-bold"
                : "bg-transparent cursor-pointer hover:bg-[#2038B612] border-transparent font-light"
            }`}
            onClick={() => {
              setTab(StructureTabs.Manual);
            }}
          >
            {t("dialog.wallet.tab.manual.title")}
          </div>
          <div
            className={`py-4 px-6 transition-all border-b-2 text-[#0C2134] text-sm ${
              tab === StructureTabs.Automatic
                ? "bg-[#2038B612] border-primary font-bold"
                : "bg-transparent cursor-pointer hover:bg-[#2038B612] border-transparent font-light"
            }`}
            onClick={() => {
              setTab(StructureTabs.Automatic);
            }}
          >
            {t("dialog.wallet.tab.automatic.title")}
          </div>
        </div>
        {tab === StructureTabs.Manual ? <div></div> : <div></div>}
      </DialogContent>
    </Dialog>
  );
};

export default AddWalletStructure;
