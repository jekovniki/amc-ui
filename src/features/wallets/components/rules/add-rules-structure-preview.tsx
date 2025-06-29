import { Dispatch, SetStateAction } from "react";
import { ImportRulesStructure } from "../../types/rules";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { RuleStructureItem } from "./rule-structure-item";
import { useAddRule } from "../../api/rules/use-add-rules";
import { getTranslatedRuleType } from "../../util/rule-translations";
import { toast } from "sonner";

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
  const addRule = useAddRule(entityId);

  const handleSubmit = () => {
    for (const rule of rules) {
      addRule.mutate(
        {
          name: rule["Име на ограничението"],
          minLimit: Number(rule["Минимална стойност"]),
          maxLimit: Number(rule["Максимална стойност"]),
          type: getTranslatedRuleType(rule["Ниво на ограничение"]),
          typeValue: rule["Тип стойност"],
        },
        {
          onSuccess: () => {
            toast.success(
              `Успешно създадохте правилото: ${rule["Име на ограничението"]}`
            );
          },
          onError: (error) => {
            console.error(error);
            toast.error(
              `Не успяхме да добавим правилото: ${rule["Име на ограничението"]}. Моля прегледайте добавете го ръчно. При проблем се свържете с нас`
            );
          },
        }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-[90vh] w-custom-full flex flex-col overflow-hidden">
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
        <div className="flex gap-4 px-4 pb-6 wrap justify-start border-b-[1px]">
          <h2 className="font-bold text-xl leading-none group-hover:text-primary/40 transition-colors">
            {t("dialog.rules.preview.title")}
          </h2>
        </div>
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
