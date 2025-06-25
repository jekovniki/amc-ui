import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ImportWalletStructureAssets,
  ImportWalletStructureOther,
} from "../types/wallet-structure";
import { WalletStructureAsset } from "./wallet-structure-asset";
import { useAddAsset } from "../api/use-add-asset";
import { WalletPreviewAssetTypeTitle } from "./wallet-preview-asset-type-title";
import { WalletCurrency } from "../types/asset";
import { useGetAssetTypes } from "../api/use-get-asset-types";
import { getAssetTypeStructureByLanguage } from "../util/wallet-translations";
import { useAddAssetType } from "../api/use-add-asset-type";
import { toast } from "sonner";
import { WalletStructureOther } from "./wallet-structure-other";

interface AddWalletStructureAssetsPreviewModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  excelAssetData: ImportWalletStructureAssets[];
  setExcelAssetData: Dispatch<SetStateAction<ImportWalletStructureAssets[]>>;
  excelOtherData: ImportWalletStructureOther[];
  setExcelOtherData: Dispatch<SetStateAction<ImportWalletStructureOther[]>>;

  entityId: string;
}

export const AddWalletStructureAssetsPreviewModal = ({
  open,
  setOpen,
  excelAssetData,
  excelOtherData,
  entityId,
}: AddWalletStructureAssetsPreviewModalProps) => {
  const { t } = useTranslation();
  const allAssets = [...excelAssetData, ...excelOtherData];
  const assetTypeTitles = [
    ...new Set(allAssets.map((asset) => asset["Вид актив"])),
  ];
  const [selectedAssetPreview, setSelectedAssetPreview] =
    useState<string>("Акции");
  const { data } = useGetAssetTypes();
  const assetTypes = data?.data || [];
  const addAsset = useAddAsset(entityId);
  const addAssetType = useAddAssetType();

  const handleSubmit = () => {
    for (const item of allAssets) {
      const assetType = assetTypes.find(
        (type) =>
          type.name === getAssetTypeStructureByLanguage(item["Вид актив"], "en")
      );

      if (!assetType) {
        if (item["Вид актив"]) {
          addAssetType.mutate(
            {
              name: item["Вид актив"],
            },
            {
              onSuccess: (response) => {
                toast.success(
                  `Успешно създадохте вид актив : ${response.data.name}`
                );
                addAssetToDatabase(item, response.data.id);
              },
              onError: (error) => {
                console.error(error);
                toast.error(
                  `Не успяхме да добавим следният вид актив: ${item["Вид актив"]}. Моля прегледайте и активите към него и ги добавете ръчно. При проблем се свържете с нас`
                );
              },
            }
          );
        }
      } else {
        addAssetToDatabase(item, assetType.id);
      }
    }
  };

  function addAssetToDatabase(
    item: ImportWalletStructureAssets | ImportWalletStructureOther,
    assetTypeId: number
  ) {
    if ("ISIN код" in item) {
      addAsset.mutate(
        {
          isin: item["ISIN код"],
          code: item["Борсов код"],
          currency: item.Валута as WalletCurrency,
          value: item["Цена за един актив"],
          amount: item.Количество,
          assetTypeId: assetTypeId, // do not hardcode
          name: item["Име на актива"],
        },
        {
          onSuccess: () => {
            toast.success(
              `Успешно създадохте актив с код : ${item["Борсов код"]}`
            );
          },
          onError: (error) => {
            console.error(error);
            toast.error(
              `Не успяхме да добавим актив с код ${item["Борсов код"]}. Моля прегледайте портфейла и го добавете ръчно.`
            );
          },
        }
      );
    } else {
      addAsset.mutate(
        {
          isin: "-",
          code: "-",
          currency: item.Валута as WalletCurrency,
          value: item["Парична стойност"],
          amount: 1,
          assetTypeId: assetTypeId, // do not hardcode
          name: item["Име на актива"],
        },
        {
          onSuccess: () => {
            toast.success(`Успешно създадохте актив ${item["Име на актива"]}`);
          },
          onError: (error) => {
            console.error(error);
            toast.error(
              `Не успяхме да добавим актив ${item["Име на актива"]}. Моля прегледайте портфейла и го добавете ръчно.`
            );
          },
        }
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-[90vh] w-custom-full flex flex-col overflow-hidden">
        <DialogTitle className="h-[0px]"></DialogTitle>
        <div className="flex gap-4 px-4 wrap justify-start border-b-[1px]">
          {assetTypeTitles.map((title, index) => (
            <WalletPreviewAssetTypeTitle
              key={index}
              index={index}
              assetType={title}
              setSelectedAssetPreview={setSelectedAssetPreview}
              selectedAssetPreview={selectedAssetPreview}
            />
          ))}
        </div>
        <div className="h-full">
          <div className="grid grid-cols-12">
            <div className="col-span-12 pt-4 h-custom-wrap overflow-auto">
              {allAssets
                ?.filter((item) => item["Вид актив"] === selectedAssetPreview)
                ?.map((item, index) =>
                  "Борсов код" in item ? (
                    <WalletStructureAsset
                      key={index}
                      index={index}
                      item={item}
                      handleDeleteItem={() => {}}
                      selectedAssetPreview={selectedAssetPreview}
                    />
                  ) : (
                    <WalletStructureOther
                      key={index}
                      index={index}
                      item={item}
                      handleDeleteItem={() => {}}
                      selectedAssetPreview={selectedAssetPreview}
                    />
                  )
                )}
            </div>
          </div>
        </div>
        <div className="border-t-[1px] px-6 pt-6 flex justify-end gap-4">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            {t("dialog.wallet.preview.buttons.cancel")}
          </Button>
          <Button onClick={handleSubmit}>
            {t("dialog.wallet.preview.buttons.submit")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
