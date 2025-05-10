interface EntityPreviewCardProps {
  id: string;
  name: string;
  bottomLeftText: string;
  bottomRightText: string;
}

export const EntityPreviewCard = ({
  id,
  name,
  bottomLeftText,
  bottomRightText,
}: EntityPreviewCardProps) => {
  const handleClick = () => {
    console.log(id);
  };

  return (
    <div
      className="bg-white text-[#0c2134] shadow-md p-4 mb-2 cursor-pointer transition-all hover:bg-[#465BC8] group"
      onClick={handleClick}
    >
      <h4 className="text-[14px] select-none font-semibold text-[#0c2134] transition-colors group-hover:text-white">
        {name}
      </h4>
      <div className="h-[2px] bg-[#0000000D] w-[34px] my-4 transition-colors group-hover:bg-[#FFFFFF73]"></div>
      <div className="flex justify-between items-center">
        <span className="font-bold select-none text-[12px] text-[#0C213473] transition-colors group-hover:text-[#FFFFFF73]">
          {bottomLeftText}
        </span>
        <span className="font-light select-none text-[12px] text-[#0C213473] transition-colors group-hover:text-[#FFFFFF73]">
          {bottomRightText}
        </span>
      </div>
    </div>
  );
};
