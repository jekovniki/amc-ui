import { useTranslation } from "react-i18next";
import { format, isToday, isTomorrow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { ObligationControlForm } from "./obligation-control-form";
import { Obligation } from "../types/obligation";

interface ObligationCardProps {
  obligation: Obligation;
  entityName: string;
  dueDate: string;
}

export const ObligationCard = ({
  obligation,
  entityName,
  dueDate,
}: ObligationCardProps) => {
  const { t } = useTranslation();
  const dueDateObj = new Date(dueDate);
  const [open, setOpen] = useState(false);

  let formattedDate = format(dueDateObj, "dd.MM");
  let dateClassName = "obligation-info-bg";
  let badgeVariant: "default" | "secondary" | "destructive" = "default";

  if (isToday(dueDateObj)) {
    formattedDate = t("dashboard.obligationContainer.status.today");
    dateClassName = "obligation-critical-bg";
    badgeVariant = "destructive";
  }
  if (isTomorrow(dueDateObj)) {
    formattedDate = t("dashboard.obligationContainer.status.tomorrow");
    dateClassName = "obligation-warning-bg";
    badgeVariant = "warning" as "default"; // couldn't find out how to add warning as an option in ts, so this is my hack
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={`${dateClassName} p-4 h-[104px] cursor-pointer shadow-md hover:shadow-sm transition-all flex flex-col justify-between`}
        >
          <div className="flex justify-between">
            <h4 className="text-[#0c2134] text-[14px] font-semibold">
              {obligation.name}
            </h4>
            <div></div>
            <Badge variant={badgeVariant}>{formattedDate}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#0C2134BF] text-[12px] font-light">
              {entityName}
            </span>
            <span className="text-[12px] flex items-center gap-[5px] text-[#2038B6] font-semibold hover:text-primary transition-all">
              {t("dashboard.obligationContainer.link")}
              <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="wide-modal">
        <ObligationControlForm obligation={obligation} />
      </DialogContent>
    </Dialog>
  );
};
