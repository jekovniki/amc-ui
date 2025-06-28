import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDragAndDrop } from "@/hooks/use-drag-and-drop";
import { useExcelToJson } from "@/hooks/use-excel-to-json";
import { Info } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import excelRulesUrl from "../../../assets/AMC_Manager_-_Rules.xlsx?url";
import excelRulesExampleUrl from "../../../assets/AMC_Manager_-_Rules_Example.xlsx?url";
import { ImportRulesStructure } from "../types/wallet-structure";
import { AddRulesStructurePreview } from "../components/rules/add-rules-structure-preview";

enum StructureTabs {
  Manual = "manual",
  Automatic = "automatic",
}

interface AddRulesByExcelProps {
  triggerType: "button" | "link";
  entityId: string;
}

const AddRulesByExcel = ({ entityId, triggerType }: AddRulesByExcelProps) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<StructureTabs>(StructureTabs.Manual);
  const [error, setError] = useState("");
  const [openPreview, setOpenPreview] = useState(false);
  const [excelData, setExcelData] = useState<ImportRulesStructure[]>([]);

  const { convertExcelToJsonRules } = useExcelToJson();

  const downloadTemplate = () => {
    const link = document.createElement("a");
    link.href = excelRulesUrl;
    link.download = "AMC_Manager_-_Rules.xlsx";
    link.click();
  };

  const downloadExampleTemplate = () => {
    const link = document.createElement("a");
    link.href = excelRulesExampleUrl;
    link.download = "AMC_Manager_-_Rules_Example.xlsx";
    link.click();
  };

  const handleFileUpload = async (file: File) => {
    const jsonData = await convertExcelToJsonRules(file);
    if (jsonData.length) {
      setExcelData(jsonData);
      setOpenPreview(true);
    } else {
      setError(t("errors.walletStructure.corruptFile"));
    }
  };

  const { isDragOver, handleDragOver, handleDragLeave, handleDrop } =
    useDragAndDrop({ onFileUpload: handleFileUpload });

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerType === "link" ? (
          <span
            onClick={() => setOpen(!open)}
            className="text-primary text-sm cursor-pointer"
          >
            {t("dashboard.assets.noRestrictions.link")}
          </span>
        ) : (
          <Button onClick={() => setOpen(!open)}>
            {t("dashboard.assets.noRestrictions.button")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="wide-modal">
        <DialogTitle className="pt-6 pb-2 px-4">
          {t("dialog.rules.add.title")}
        </DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>
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
            {t("dialog.rules.tab.manual.title")}
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
            {t("dialog.rules.tab.automatic.title")}
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
                    {t("dialog.rules.tab.manual.description.link")}
                  </span>
                  {t("dialog.rules.tab.manual.description.text")}
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
                    {t("dialog.rules.add.manual.upload")}
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".xlsx,.xls"
                />
                <AddRulesStructurePreview
                  open={openPreview}
                  setOpen={setOpenPreview}
                  rules={excelData}
                  entityId={entityId}
                />
              </div>
              <div className="mt-4">
                <p className="text-[#0C2134BF] text-[12px] font-light">
                  1.&nbsp;
                  {t("dialog.rules.tab.manual.description.notes.one")}
                </p>
                <p
                  className="text-[#0C2134BF] text-[12px] font-light"
                  onClick={downloadExampleTemplate}
                >
                  2.&nbsp;
                  <span
                    onClick={downloadExampleTemplate}
                    className="text-primary underline hover:no-underline cursor-pointer"
                  >
                    {t("dialog.rules.tab.manual.description.notes.two")}
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
                    {t("dialog.rules.tab.automatic.description")}{" "}
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
                    1.&nbsp;{t("dialog.rules.tab.automatic.partTwo")}
                  </p>
                  <p className="text-[#0C2134BF] text-[13px] font-light">
                    2.&nbsp;{t("dialog.rules.tab.automatic.final")}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="bg-white border-t-[1px] md:rounded-b p-6 flex items-center justify-end gap-4">
          <Button variant="outline" onClick={() => setOpen(!open)}>
            {t("dialog.rules.tab.manual.buttons.cancel")}
          </Button>
          {tab === StructureTabs.Manual && (
            <Button disabled>{t("dialog.rules.tab.manual.buttons.add")}</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddRulesByExcel;
