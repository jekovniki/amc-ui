import { InputBox } from "@/components/input-box";
import { ImportRulesStructure } from "../../types/rules";
import { TextIcon } from "@/components/icons/text-icon";
import { PriceTagIcon } from "@/components/icons/price-tag-icon";
import { ChequeIcon } from "@/components/icons/cheque-icon";
import { WalletIcon } from "@/components/icons/wallet-icon";

interface RuleStructureItemProps {
  index: number;
  item: ImportRulesStructure;
}

export const RuleStructureItem = ({ index, item }: RuleStructureItemProps) => {
  return (
    <div key={index} className="mb-4 flex gap-4 items-center px-4">
      <div className="text-[#00000066] text-[13px] font-light">{index + 1}</div>
      <div className="outline-[1px] flex w-full">
        <InputBox
          label="Име на ограничението"
          logo={<TextIcon />}
          disabled={true}
          className="font-bold"
          wrapperClassName="w-[35%] bg-white"
          defaultValue={item["Име на ограничението"]}
        />
        <InputBox
          label="Мин. стойност"
          logo={<PriceTagIcon />}
          disabled={true}
          className="font-bold"
          wrapperClassName="w-[15%] bg-white"
          defaultValue={item["Минимална стойност"]}
        />
        <InputBox
          label="Макс. стойност"
          logo={<PriceTagIcon />}
          disabled={true}
          className="font-bold"
          wrapperClassName="w-[15%] bg-white"
          defaultValue={item["Максимална стойност"]}
        />
        <InputBox
          label="Тип стойност"
          logo={<ChequeIcon />}
          disabled={true}
          className="font-bold"
          wrapperClassName="w-[15%] bg-white"
          defaultValue={item["Тип стойност"]}
        />
        <InputBox
          label="Ниво на ограничение"
          logo={<WalletIcon />}
          disabled={true}
          className="font-bold"
          wrapperClassName="w-[20%] bg-white"
          defaultValue={item["Ниво на ограничение"]}
        />
      </div>
      {/* <div onClick={() => handleDeleteItem(index, selectedAssetPreview)}>
        <TrashIcon />
      </div> */}
    </div>
  );
};
