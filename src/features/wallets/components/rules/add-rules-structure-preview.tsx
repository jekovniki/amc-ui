import { Dispatch, SetStateAction } from "react";
import { ImportRulesStructure } from "../../types/wallet-structure";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { RuleStructureItem } from "./rule-structure-item";

interface AddRulesStructurePreviewProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  rules: ImportRulesStructure[];
  entityId: string;
}

export const AddRulesStructurePreview = ({
  open,
  setOpen,
  rules,
  entityId,
}: AddRulesStructurePreviewProps) => {
  const { t } = useTranslation();
  console.log("rules : ", rules);
  console.log("entityId : ", entityId);
  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-[90vh] w-custom-full flex flex-col overflow-hidden">
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <div className="h-full">
          <div className="grid grid-cols-12">
            <div className="col-span-12 pt-4 h-custom-wrap overflow-auto">
              {rules?.map((item, index) => (
                <RuleStructureItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
        <div className="border-t-[1px] px-6 pt-6 flex justify-end gap-4">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            {t("dialog.rules.preview.buttons.cancel")}
          </Button>
          <Button onClick={handleSubmit}>
            {t("dialog.rules.preview.buttons.submit")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
