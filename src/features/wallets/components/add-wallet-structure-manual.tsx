import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import excelWalletUrl from "../../../assets/AMC_Manager_-_Wallet.xlsx?url";
import excelWalletExampleUrl from "../../../assets/AMC_Manager_-_Wallet.xlsx?url";
import { useRef, useState } from "react";
import { useExcelToJson } from "@/hooks/use-excel-to-json";
import { AddWalletStructureAssetsPreviewModal } from "./add-wallet-structure-assets-preview-modal";
import { ImportWalletStructureAssets } from "../types/wallet-structure";

export const AddWalletStructureManual = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [excelData, setExcelData] = useState<ImportWalletStructureAssets[]>([]);
  const [error, setError] = useState("");

  const { convertExcelToJsonWithKeys } = useExcelToJson();

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
    if (jsonData.length) {
      setOpenPreview(true);
      setExcelData(jsonData);
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
    <div className="flex flex-col items-center gap-4">
      <p className="text-[16px] text-center text-[#0C2134BF] mb-4">
        {t("dialog.wallet.add.manual.description")}
      </p>
      <div className="flex gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={downloadExampleTemplate}
        >
          {t("dialog.wallet.add.manual.downloadExample")}
        </Button>
        <Button type="button" onClick={downloadTemplate}>
          {t("dialog.wallet.add.manual.download")}
        </Button>
      </div>

      {error ? <div className="text-sm text-red-500 my-4">{error}</div> : ""}
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
        excelData={excelData}
        setExcelData={setExcelData}
      />
    </div>
  );
};
