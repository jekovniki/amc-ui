import { TextIcon } from "@/components/icons/text-icon";
import { InputBox } from "@/components/input-box";
import { ImportWalletStructureOther } from "../types/wallet-structure";
import { getTranslatedCurrency } from "../util/currency-translations";
import { PriceTagIcon } from "@/components/icons/price-tag-icon";

interface WalletStructureOtherProps {
  index: number;
  item: ImportWalletStructureOther;
  handleDeleteItem: (indexToDelete: number, assetType: string) => void;
  selectedAssetPreview: string;
}

export const WalletStructureOther = ({
  index,
  item,
}: WalletStructureOtherProps) => {
  const randomNumber = Math.floor(Math.random() * (100000 - 1 + 1) + 1);
  return (
    <div key={randomNumber} className="mb-4 flex gap-4 items-center px-4">
      <div className="text-[#00000066] text-[13px] font-light">{index + 1}</div>
      <div className="outline-[1px] flex w-full">
        <InputBox
          label="Име на актива"
          logo={<TextIcon />}
          disabled={true}
          className="font-bold"
          wrapperClassName="w-[50%] bg-white"
          defaultValue={item["Име на актива"]}
        />
        <InputBox
          label={`Парична стойност (${getTranslatedCurrency(item["Валута"])})`}
          logo={<PriceTagIcon />}
          disabled={true}
          className="font-bold"
          wrapperClassName="w-[50%] bg-white"
          defaultValue={item["Парична стойност"]}
        />
      </div>
      {/* <div onClick={() => handleDeleteItem(index, selectedAssetPreview)}>
        <TrashIcon />
      </div> */}
    </div>
  );
};
