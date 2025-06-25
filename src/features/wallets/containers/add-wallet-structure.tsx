import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import excelWalletUrl from "../../../assets/AMC_Manager_-_Wallet.xlsx?url";
import excelWalletExampleUrl from "../../../assets/AMC_Manager_-_Wallet.xlsx?url";
import {
  ImportWalletStructureAssets,
  ImportWalletStructureOther,
} from "../types/wallet-structure";
import { AddWalletStructureAssetsPreviewModal } from "../components/add-wallet-structure-assets-preview-modal";
import { useExcelToJson } from "@/hooks/use-excel-to-json";

interface AddWalletStructureProps {
  triggerType: "button" | "link";
  entityId: string;
}

enum StructureTabs {
  Manual = "manual",
  Automatic = "automatic",
}

const AddWalletStructure = ({
  triggerType,
  entityId,
}: AddWalletStructureProps) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [excelAssetData, setExcelAssetData] = useState<
    ImportWalletStructureAssets[]
  >([]);
  const [excelOtherData, setExcelOtherData] = useState<
    ImportWalletStructureOther[]
  >([]);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<StructureTabs>(StructureTabs.Manual);
  const [error, setError] = useState("");

  const { convertExcelToJsonWithKeys } = useExcelToJson();

  const handleFormVisibility = () => {
    setOpen(!open);
  };

  const downloadTemplate = () => {
    const link = document.createElement("a");
    link.href = excelWalletUrl;
    link.download = "AMC_Manager_-_Wallet.xlsx";
    link.click();
  };

  const downloadExampleTemplate = () => {
    const link = document.createElement("a");
    link.href = excelWalletExampleUrl;
    link.download = "AMC_Manager_-_Wallet_Example.xlsx";
    link.click();
  };

  const handleFileUpload = async (file: File) => {
    const jsonData = await convertExcelToJsonWithKeys(file);
    if (jsonData.securities.length || jsonData.other.length) {
      if (jsonData.securities.length) {
        setExcelAssetData(jsonData.securities);
      }
      if (jsonData.other.length) {
        setExcelOtherData(jsonData.other);
      }
      setOpenPreview(true);
    } else {
      setError(t("errors.walletStructure.corruptFile"));
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerType === "link" ? (
          <Button onClick={handleFormVisibility}>
            {t("dashboard.assets.noAssets.button")}
          </Button>
        ) : (
          <Button onClick={handleFormVisibility}>
            {t("dashboard.assets.noAssets.button")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="wide-modal">
        <DialogTitle className="pt-6 pb-2 px-4">
          {t("dialog.wallet.add.title")}
        </DialogTitle>
        <div className="bg-white border-t-[1px] border-b-[1px] md:rounded-b flex items-center justify-center">
          <div
            className={`py-4 px-6 transition-all border-b-2 text-[#0C2134] text-sm ${
              tab === StructureTabs.Manual
                ? "bg-[#2038B612] border-primary font-bold"
                : "bg-transparent cursor-pointer hover:bg-[#2038B612] border-transparent font-light"
            }`}
            onClick={() => {
              setTab(StructureTabs.Manual);
            }}
          >
            {t("dialog.wallet.tab.manual.title")}
          </div>
          <div
            className={`py-4 px-6 transition-all border-b-2 text-[#0C2134] text-sm ${
              tab === StructureTabs.Automatic
                ? "bg-[#2038B612] border-primary font-bold"
                : "bg-transparent cursor-pointer hover:bg-[#2038B612] border-transparent font-light"
            }`}
            onClick={() => {
              setTab(StructureTabs.Automatic);
            }}
          >
            {t("dialog.wallet.tab.automatic.title")}
          </div>
        </div>
        <div className="px-6 pb-2 pt-2">
          {tab === StructureTabs.Manual && (
            <>
              <div className="flex items-start gap-4">
                <Info size={24} color="#0C2134BF" />
                <p className="text-[#0C2134BF] text-[13px] font-light mb-2">
                  <span
                    className="text-primary underline hover:no-underline cursor-pointer"
                    onClick={downloadTemplate}
                  >
                    {t("dialog.wallet.tab.manual.description.link")}
                  </span>
                  {t("dialog.wallet.tab.manual.description.text")}
                </p>
              </div>
              <div>
                {error ? (
                  <div className="text-sm text-red-500 my-4">{error}</div>
                ) : (
                  ""
                )}
                <div
                  className={`h-[150px] w-full flex items-center cursor-pointer justify-center rounded-md border-dashed border-2 mt-4 transition-colors ${
                    isDragOver
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={handleClick}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <p className="text-[14px] text-center text-[#0C2134BF] mb-4">
                    {t("dialog.wallet.add.manual.upload")}
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".xlsx,.xls"
                />
                <AddWalletStructureAssetsPreviewModal
                  open={openPreview}
                  setOpen={setOpenPreview}
                  excelAssetData={excelAssetData}
                  setExcelAssetData={setExcelAssetData}
                  excelOtherData={excelOtherData}
                  setExcelOtherData={setExcelOtherData}
                  entityId={entityId}
                />
              </div>
              <div className="mt-4">
                <p className="text-[#0C2134BF] text-[12px] font-light">
                  1.&nbsp;
                  {t("dialog.wallet.tab.manual.description.notes.one")}
                </p>
                <p className="text-[#0C2134BF] text-[12px] font-light">
                  2.&nbsp;
                  {t("dialog.wallet.tab.manual.description.notes.two")}
                </p>
                <p className="text-[#0C2134BF] text-[12px] font-light">
                  3.&nbsp;
                  <span
                    className="text-primary underline hover:no-underline cursor-pointer"
                    onClick={downloadExampleTemplate}
                  >
                    {t("dialog.wallet.tab.manual.description.notes.three")}
                  </span>
                </p>
              </div>
            </>
          )}
          {tab === StructureTabs.Automatic && (
            <>
              <div className="flex items-start gap-4">
                <div>
                  <Info size={24} color="#0C2134BF" />
                </div>
                <div>
                  <p className="text-[#0C2134BF] text-[13px] font-light mb-2">
                    {t("dialog.wallet.tab.automatic.description")}{" "}
                    <a
                      href={`mailto:${
                        import.meta.env.VITE_WALLET_UPLOAD_EMAIL
                      }`}
                      className="font-bold"
                    >
                      {import.meta.env.VITE_WALLET_UPLOAD_EMAIL}
                    </a>
                  </p>
                  <p className="text-[#0C2134BF] text-[13px] font-light mb-2">
                    1.&nbsp;{t("dialog.wallet.tab.automatic.partTwo")}
                  </p>
                  <p className="text-[#0C2134BF] text-[13px] font-light">
                    2.&nbsp;{t("dialog.wallet.tab.automatic.final")}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="bg-white border-t-[1px] md:rounded-b p-6 flex items-center justify-end gap-4">
          <Button variant="outline" onClick={handleFormVisibility}>
            {t("dialog.wallet.tab.manual.buttons.cancel")}
          </Button>
          {tab === StructureTabs.Manual && (
            <Button disabled>
              {t("dialog.wallet.tab.manual.buttons.add")}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddWalletStructure;
