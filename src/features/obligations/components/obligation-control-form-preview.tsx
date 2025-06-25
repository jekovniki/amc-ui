import { Button } from "@/components/ui/button";
import { Obligation, ObligationStatus } from "../types/obligation";
import { useTranslation } from "react-i18next";
import { DeleteObligation } from "./delete-obligation";
import { Dispatch, SetStateAction } from "react";
import { useEditObligation } from "../api/use-edit-obligation";
import { toast } from "sonner";

interface ObligationControlFormProps {
  obligation: Obligation;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const ObligationControlFormPreview = ({
  obligation,
  open,
  setOpen,
}: ObligationControlFormProps) => {
  const { t } = useTranslation();
  const editObligation = useEditObligation();

  const setAsComplete = () => {
    editObligation.mutate(
      {
        id: obligation.id,
        status: ObligationStatus.RESOLVED,
      },
      {
        onSuccess: () => {
          toast.success(`Задължението ${obligation.name} беше изпълнено.`);
        },
        onError: (error) => {
          console.error(error);
          toast.error(
            `Възникна грешка. Моля, опитайте по-късно или се свържете с нас.`
          );
        },
      }
    );
  };

  return (
    <div className="border-t-[1px] md:rounded-b flex justify-between items-center p-4">
      <Button
        variant="outline"
        autoFocus={false}
        onClick={() => setOpen(false)}
      >
        {t("dialog.obligation.preview.buttons.cancel")}
      </Button>
      <div className="flex gap-4 items-center">
        <DeleteObligation
          obligation={obligation}
          parentClose={open}
          setParentClose={setOpen}
        />
        <Button onClick={setAsComplete}>
          {t("dialog.obligation.preview.buttons.done")}
        </Button>
      </div>
    </div>
  );
};
