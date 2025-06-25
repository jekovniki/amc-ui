import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Obligation } from "../types/obligation";
import { Button } from "@/components/ui/button";
import { useDeleteObligation } from "../api/use-delete-obligation";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Dispatch, SetStateAction } from "react";

interface ObligationControlFormProps {
  obligation: Obligation;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const ObligationControlForm = ({
  obligation,
  open,
  setOpen,
}: ObligationControlFormProps) => {
  const { t } = useTranslation();
  console.log("obligation : ", obligation);

  const deleteObligation = useDeleteObligation();

  const isLoading = deleteObligation.isPending;

  const handleDelete = () => {
    deleteObligation.mutate(obligation.id, {
      onSuccess: () => {
        toast.success(`Успешно изтрихте задължението: ${obligation.name}`);
        setOpen(!open);
      },
      onError: (error) => {
        console.error(error);
        toast.error(`Възникна грешка и не успяхме да изтрием задължението.`);
      },
    });
  };

  return (
    <>
      <DialogTitle className="pt-6 pb-2 px-4">{obligation.name}</DialogTitle>
      <DialogDescription className="bg-white border-t-[1px] md:rounded-b p-4">
        {obligation.description}
      </DialogDescription>
      <div className="border-t-[1px] md:rounded-b flex justify-between items-center p-4">
        <Button
          variant="outline"
          autoFocus={false}
          disabled={isLoading}
          onClick={() => setOpen(false)}
        >
          {t("dialog.obligation.preview.buttons.cancel")}
        </Button>
        <div className="flex gap-4 items-center">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {t("dialog.obligation.preview.buttons.delete")}
          </Button>
          <Button disabled={isLoading}>
            {t("dialog.obligation.preview.buttons.done")}
          </Button>
        </div>
      </div>
    </>
  );
};
