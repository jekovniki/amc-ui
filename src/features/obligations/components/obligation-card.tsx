import { useTranslation } from "react-i18next";
import { format, isToday, isTomorrow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface ObligationCardProps {
  obligationName: string;
  entityName: string;
  dueDate: string;
}

export const ObligationCard = ({
  obligationName,
  entityName,
  dueDate,
}: ObligationCardProps) => {
  const { t } = useTranslation();
  const dueDateObj = new Date(dueDate);

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
  }
  return (
    <div
      className={`${dateClassName} p-4 h-[104px] cursor-pointer shadow-md hover:shadow-sm transition-all flex flex-col justify-between`}
    >
      <div className="flex justify-between">
        <h4 className="text-[#0c2134] text-[14px] font-semibold">
          {obligationName}
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
  );
};
