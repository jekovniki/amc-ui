import { Dispatch, SetStateAction } from "react";

interface WalletPreviewAssetTypeTitleProps {
  index: number;
  setSelectedAssetPreview: Dispatch<SetStateAction<string>>;
  selectedAssetPreview: string;
  assetType: string;
}

export const WalletPreviewAssetTypeTitle = ({
  index,
  setSelectedAssetPreview,
  assetType,
  selectedAssetPreview,
}: WalletPreviewAssetTypeTitleProps) => {
  return (
    <span
      key={index}
      className={`block min-w-[10%] max-w-[25%] w-fit py-4 flex items-end gap-2 font-bold cursor-pointer hover:text-primary/40 transition-colors`}
      onClick={() => setSelectedAssetPreview(assetType)}
    >
      <span
        className={`leading-none font-extralight text-[38px]  ${
          assetType === selectedAssetPreview
            ? "text-primary"
            : "text-[#0000001A] group-hover:text-primary/40"
        }`}
      >{`0${index + 1}`}</span>
      <span className="block flex flex-col">
        <span className="text-[#00000066] mb-2 leading-none font-light text-[11px]">
          Вид актив
        </span>
        <span className="font-bold leading-none group-hover:text-primary/40 transition-colors">
          {assetType}
        </span>
      </span>
    </span>
  );
};
