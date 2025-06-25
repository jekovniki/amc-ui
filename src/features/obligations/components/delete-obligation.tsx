import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteObligation } from "../api/use-delete-obligation";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { Obligation } from "../types/obligation";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface ObligationControlFormProps {
  obligation: Obligation;
  parentClose: boolean;
  setParentClose: Dispatch<SetStateAction<boolean>>;
}

export const DeleteObligation = ({
  parentClose,
  setParentClose,
  obligation,
}: ObligationControlFormProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const deleteObligation = useDeleteObligation();

  const handleDelete = () => {
    deleteObligation.mutate(obligation.id, {
      onSuccess: () => {
        toast.success(`Успешно изтрихте задължението: ${obligation.name}`);
        setOpen(!open);
        setParentClose(!parentClose);
      },
      onError: (error) => {
        console.error(error);
        toast.error(`Възникна грешка и не успяхме да изтрием задължението.`);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          onClick={() => setOpen(!open)}
          disabled={deleteObligation.isPending}
        >
          {t("dialog.obligation.preview.buttons.delete")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{t("dialog.obligation.delete.title")}</DialogTitle>
        <DialogDescription>
          {t("dialog.obligation.delete.description")}
        </DialogDescription>
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" onClick={() => setOpen(!open)}>
            {t("dialog.obligation.preview.buttons.cancel")}
          </Button>
          <Button onClick={handleDelete} variant="destructive">
            {t("dialog.obligation.preview.buttons.delete")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
