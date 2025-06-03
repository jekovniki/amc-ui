import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AddWalletStructureManual } from "../components/add-wallet-structure-manual";

interface AddWalletStructureModalProps {
  toggleFormVisibility: () => void;
  entityId: string;
}

const AddWalletStructureModal = ({
  toggleFormVisibility,
  entityId,
}: AddWalletStructureModalProps) => {
  const { t } = useTranslation();
  const [view, setView] = useState<"overview" | "manual" | "email" | "assets">(
    "overview"
  );

  return (
    <>
      <div className="p-6 flex items-center justify-center">
        {view === "overview" && (
          <div className="py-6">
            <p className="text-[16px] text-center text-[#0C2134BF]">
              {t("dialog.wallet.add.overview.description")}
            </p>
          </div>
        )}
        {view === "email" && (
          <div className="flex-col">
            <p className="text-[16px] text-center text-[#0C2134BF] mb-4">
              {t("dialog.wallet.add.email.description.partOne")}{" "}
              <strong>{import.meta.env.VITE_WALLET_UPLOAD_EMAIL}</strong>
            </p>
            <p className="text-[16px] text-center text-[#0C2134BF] mb-4">
              {t("dialog.wallet.add.email.description.partTwo")}
            </p>
            <p className="text-[16px] text-center text-[#0C2134BF]">
              {t("dialog.wallet.add.email.description.final")}
            </p>
          </div>
        )}
        {view === "manual" && <AddWalletStructureManual entityId={entityId} />}
      </div>
      <div className="border-t-[1px] p-6 flex items-center justify-between gap-4">
        <Button
          variant="secondary"
          type="button"
          onClick={toggleFormVisibility}
        >
          {t("dialog.wallet.add.buttons.cancel")}
        </Button>
        <div className="flex items-center gap-4">
          {view === "overview" && (
            <>
              <Button onClick={() => setView("manual")}>
                {t("dialog.wallet.add.overview.buttons.manual")}
              </Button>
              <Button onClick={() => setView("email")}>
                {t("dialog.wallet.add.overview.buttons.automatic")}
              </Button>
            </>
          )}
          {view === "manual" && (
            <>
              <Button
                variant="secondary"
                type="button"
                onClick={() => setView("overview")}
              >
                {t("dialog.wallet.add.email.goBack")}
              </Button>
              <Button onClick={() => setView("manual")}>
                {t("dialog.wallet.add.overview.buttons.manual")}
              </Button>
            </>
          )}
          {view === "email" && (
            <>
              <Button
                variant="secondary"
                type="button"
                onClick={() => setView("overview")}
              >
                {t("dialog.wallet.add.email.goBack")}
              </Button>
              <Button type="button" onClick={toggleFormVisibility}>
                {t("dialog.wallet.add.email.button")}
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AddWalletStructureModal;
