import { MouseEventHandler } from "react";

interface EntityPreviewCardProps {
  name: string;
  bottomLeftText: string;
  bottomRightText: string;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
}

export const EntityPreviewCard = ({
  name,
  bottomLeftText,
  bottomRightText,
  isSelected,
  onClick,
}: EntityPreviewCardProps) => {
  const cardClasses = isSelected
    ? "bg-[#465BC8] text-white shadow-md p-4 mb-2 cursor-pointer transition-all hover:bg-[#3A4DA6]"
    : "bg-white text-[#0c2134] shadow-md p-4 mb-2 cursor-pointer transition-all hover:bg-[#465bc833]";

  const dividerClasses = isSelected
    ? "h-[2px] bg-[#FFFFFF73] bg-opacity-20 w-[34px] my-4"
    : "h-[2px] bg-[#0000000D] w-[34px] my-4";

  const bottomTextClasses = isSelected
    ? "font-light text-[12px] text-[#FFFFFF73] text-opacity-80"
    : "font-light text-[12px] text-[#0C213473]";

  return (
    <div className={cardClasses} onClick={onClick}>
      <h4
        className={`text-[14px] font-semibold ${
          isSelected ? "text-white" : "text-[#0c2134]"
        }`}
      >
        {name}
      </h4>
      <div className={dividerClasses}></div>
      <div className="flex justify-between items-center">
        <span
          className={`font-bold text-[12px] ${
            isSelected ? "text-[#FFFFFF73]" : "text-[#0C213473]"
          }`}
        >
          {bottomLeftText}
        </span>
        <span className={bottomTextClasses}>{bottomRightText}</span>
      </div>
    </div>
  );
};

export default EntityPreviewCard;
