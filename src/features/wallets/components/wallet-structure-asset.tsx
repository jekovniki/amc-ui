import { TextIcon } from "@/components/icons/text-icon";
import { InputBox } from "@/components/input-box";
import { ImportWalletStructureAssets } from "../types/wallet-structure";
import { getTranslatedCurrency } from "../util/currency-translations";
import { PriceTagIcon } from "@/components/icons/price-tag-icon";
import { ChequeIcon } from "@/components/icons/cheque-icon";
import { TrashIcon } from "@/components/icons/trash-icon";

interface WalletStructureAssetProps {
  index: number;
  item: ImportWalletStructureAssets;
  handleDeleteItem: (indexToDelete: number, assetType: string) => void;
  selectedAssetPreview: string;
}

export const WalletStructureAsset = ({
  index,
  item,
  handleDeleteItem,
  selectedAssetPreview,
}: WalletStructureAssetProps) => {
  const randomNumber = Math.floor(Math.random() * (100000 - 1 + 1) + 1);
  return (
    <div
      key={item["Борсов код"] || randomNumber}
      className="mb-4 flex gap-4 items-center px-4"
    >
      <div className="text-[#00000066] text-[13px] font-light">{index + 1}</div>
      <div className="outline-[1px] flex w-full">
        <InputBox
          label="Борсов код"
          logo={<TextIcon />}
          className="font-bold"
          disabled={true}
          wrapperClassName="w-[15%] bg-white"
          defaultValue={item["Борсов код"]}
        />
        <InputBox
          label="Наименование"
          logo={<TextIcon />}
          disabled={true}
          className="font-bold"
          wrapperClassName="w-[25%] bg-white"
          defaultValue={item["Име на актива"]}
        />
        <InputBox
          label="ISIN"
          logo={<TextIcon />}
          disabled={true}
          className="font-bold"
          wrapperClassName="w-[25%] bg-white"
          defaultValue={item["ISIN код"]}
        />
        <InputBox
          label={`Цена за брой (${getTranslatedCurrency(item["Валута"])})`}
          logo={<PriceTagIcon />}
          disabled={true}
          className="font-bold"
          wrapperClassName="w-[20%] bg-white"
          defaultValue={item["Цена за един актив"]}
        />
        <InputBox
          label={`Брой акции`}
          disabled={true}
          logo={<ChequeIcon />}
          className="font-bold"
          wrapperClassName="w-[25%] bg-white"
          defaultValue={item["Количество"]}
        />
      </div>
      {/* <div onClick={() => handleDeleteItem(index, selectedAssetPreview)}>
        <TrashIcon />
      </div> */}
    </div>
  );
};
