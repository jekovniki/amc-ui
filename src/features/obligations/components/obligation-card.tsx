import { useTranslation } from "react-i18next";
import { format, isToday, isTomorrow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Obligation } from "../types/obligation";
import { ObligationControlFormPreview } from "./obligation-control-form-preview";
import { ObligationControlFormEdit } from "./obligation-control-form-edit";

interface ObligationCardProps {
  obligation: Obligation;
  entityName: string;
  dueDate: string;
}

enum ObligationTabs {
  Preview = "preview",
  Edit = "edit",
}

export const ObligationCard = ({
  obligation,
  entityName,
  dueDate,
}: ObligationCardProps) => {
  const { t } = useTranslation();
  const dueDateObj = new Date(dueDate);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<ObligationTabs>(ObligationTabs.Preview);

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
        <DialogTitle className="pt-6 pb-2 px-4">{obligation.name}</DialogTitle>
        <DialogDescription className="none"></DialogDescription>
        <div className="bg-white border-t-[1px] border-b-[1px] md:rounded-b flex items-center justify-start">
          <div
            className={`py-4 px-6 transition-all border-b-2 text-[#0C2134] text-sm ${
              tab === ObligationTabs.Preview
                ? "bg-[#2038B612] border-primary font-bold"
                : "bg-transparent cursor-pointer hover:bg-[#2038B612] border-transparent font-light"
            }`}
            onClick={() => {
              setTab(ObligationTabs.Preview);
            }}
          >
            {t("dialog.obligation.preview.tabs.preview")}
          </div>
          <div
            className={`py-4 px-6 transition-all border-b-2 text-[#0C2134] text-sm ${
              tab === ObligationTabs.Edit
                ? "bg-[#2038B612] border-primary font-bold"
                : "bg-transparent cursor-pointer hover:bg-[#2038B612] border-transparent font-light"
            }`}
            onClick={() => {
              setTab(ObligationTabs.Edit);
            }}
          >
            {t("dialog.obligation.preview.tabs.edit")}
          </div>
        </div>
        {tab === ObligationTabs.Preview && (
          <ObligationControlFormPreview
            obligation={obligation}
            open={open}
            setOpen={setOpen}
          />
        )}
        {tab === ObligationTabs.Edit && (
          <ObligationControlFormEdit
            obligation={obligation}
            open={open}
            setOpen={setOpen}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
