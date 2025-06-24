import { Info } from "lucide-react";
import { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";

interface DangerBoxProps {
  title: string;
  children: ReactNode;
}

export const DangerBox = ({ title, children }: DangerBoxProps) => {
  const { t } = useTranslation();
  const [open, setIsOpen] = useState(true);
  return open ? (
    <div className="p-[20px] bg-[#FF4E4E12] flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Info size={24} className="text-[#FF4E4E]" />
        <span className="text-[14px] text-[#0C2134]">{title}</span>
      </div>
      <div className="flex items-center gap-[5px]">
        <div>{children}</div>
        <div className="text-[14px]">/</div>
        <div onClick={() => setIsOpen(false)}>
          {t("commonComponents.dangerBox.hide")}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
