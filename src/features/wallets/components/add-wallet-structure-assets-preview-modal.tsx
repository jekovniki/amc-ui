import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { ImportWalletStructureAssets } from "../types/wallet-structure";
import { InputBox } from "@/components/input-box";
import { TextIcon } from "@/components/icons/text-icon";
import { PriceTagIcon } from "@/components/icons/price-tag-icon";
import { TrashIcon } from "@/components/icons/trash-icon";
import { getTranslatedCurrency } from "../util/currency-translations";
import { ChequeIcon } from "@/components/icons/cheque-icon";

interface AddWalletStructureAssetsPreviewModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  excelData: ImportWalletStructureAssets[];
  setExcelData: Dispatch<SetStateAction<ImportWalletStructureAssets[]>>;
}

export const AddWalletStructureAssetsPreviewModal = ({
  open,
  setOpen,
  excelData,
  setExcelData,
}: AddWalletStructureAssetsPreviewModalProps) => {
  const { t } = useTranslation();
  const assetTypes = [...new Set(excelData.map((asset) => asset["Вид актив"]))];
  const [selectedAssetPreview, setSelectedAssetPreview] =
    useState<string>("Акции");

  const handleDeleteItem = (indexToDelete: number, assetType: string) => {
    setExcelData((prevData) => {
      const itemsOfCurrentType = prevData.filter(
        (item) => item["Вид актив"] === assetType
      );

      const itemToDelete = itemsOfCurrentType[indexToDelete];
      const actualIndex = prevData.findIndex((item) => item === itemToDelete);

      return prevData.filter((_, index) => index !== actualIndex);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-[90vh] w-custom-full flex flex-col overflow-hidden">
        <DialogTitle className="px-6 font-light mb-4">
          {t("dialog.wallet.preview.title")}
        </DialogTitle>
        <div className="flex justify-start border-b-[1px]">
          {assetTypes.map((assetType, index) => (
            <span
              key={index}
              className={`block px-8 py-4  font-bold cursor-pointer hover:bg-primary/10 transition-colors ${
                assetType === selectedAssetPreview ? "text-primary" : ""
              }`}
              onClick={() => setSelectedAssetPreview(assetType)}
            >
              {assetType}
            </span>
          ))}
        </div>
        <div className="h-full">
          <div className="grid grid-cols-12">
            <div className="col-span-9 pt-4 h-custom-wrap overflow-auto">
              {excelData
                ?.filter((item) => item["Вид актив"] === selectedAssetPreview)
                ?.map((item, index) => (
                  <div
                    key={index}
                    className="mb-4 flex gap-4 items-center px-4"
                  >
                    <div className="text-[#00000066] text-[13px] font-light">
                      {index + 1}
                    </div>
                    <div className="outline-[1px] flex w-full">
                      <InputBox
                        label="Борсов код"
                        logo={<TextIcon />}
                        className="font-bold"
                        wrapperClassName="w-[25%] bg-white"
                        defaultValue={item["Борсов код"]}
                      />
                      <InputBox
                        label="Наименование"
                        logo={<TextIcon />}
                        className="font-bold"
                        wrapperClassName="w-[25%] bg-white"
                        defaultValue={item["Име на актива"]}
                      />
                      <InputBox
                        label={`Цена за брой (${getTranslatedCurrency(
                          item["Валута"]
                        )})`}
                        logo={<PriceTagIcon />}
                        className="font-bold"
                        wrapperClassName="w-[25%] bg-white"
                        defaultValue={item["Цена за един актив"]}
                      />
                      <InputBox
                        label={`Брой акции`}
                        logo={<ChequeIcon />}
                        className="font-bold"
                        wrapperClassName="w-[25%] bg-white"
                        defaultValue={item["Количество"]}
                      />
                    </div>
                    <div
                      onClick={() =>
                        handleDeleteItem(index, selectedAssetPreview)
                      }
                    >
                      <TrashIcon />
                    </div>
                  </div>
                ))}
            </div>
            <div
              className="col-span-3 relative"
              style={{ boxShadow: "-4px 0 6px -1px rgba(0, 0, 0, 0.1)" }}
            >
              <h5 className="text-center py-4">Структура на портфейла</h5>
            </div>
          </div>
        </div>
        <div className="border-t-[1px] px-6 pt-6 flex justify-end gap-4">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            {t("dialog.wallet.preview.buttons.cancel")}
          </Button>
          <Button onClick={() => setOpen(false)}>
            {t("dialog.wallet.preview.buttons.submit")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
