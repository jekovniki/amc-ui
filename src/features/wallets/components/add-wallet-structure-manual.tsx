import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const AddWalletStructureManual = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-[16px] text-center text-[#0C2134BF] mb-4">
        {t("dialog.wallet.add.manual.description")}
      </p>
      <Button>{t("dialog.wallet.add.manual.download")}</Button>
      <div className="h-[150px] w-full flex items-center cursor-pointer justify-center rounded-md border-dashed border-2 mt-4">
        <p className="text-[14px] text-center text-[#0C2134BF] mb-4">
          {t("dialog.wallet.add.manual.upload")}
        </p>
      </div>
    </div>
  );
};
