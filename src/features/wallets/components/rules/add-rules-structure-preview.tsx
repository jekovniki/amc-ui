import { Dispatch, SetStateAction } from "react";
import { ImportRulesStructure } from "../../types/wallet-structure";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

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
  console.log("rules : ", rules);
  console.log("entityId : ", entityId);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
