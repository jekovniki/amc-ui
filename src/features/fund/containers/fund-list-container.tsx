import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useGetCompanyEntities } from "../api/use-get-company-entities";
import { getEntityNameByLanguage } from "../utils/entity-translation";
import { FundPreviewCard } from "../components/fund-preview-card";
import { Dispatch, SetStateAction } from "react";

interface FundListContainerProps {
  selectedCard: string;
  onSelectCard: Dispatch<SetStateAction<string>>;
}

const FundListContainer = ({
  selectedCard,
  onSelectCard,
}: FundListContainerProps) => {
  const { t, i18n } = useTranslation();
  const { data } = useGetCompanyEntities();
  const entities = data?.data;

  const handleSelectCard = (id: string) => {
    onSelectCard(id);
  };
  console.log(entities);
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] text-[#0c2134]">
          {t("dashboard.fundContainer.title")}
        </h2>
        <Button>+ {t("dashboard.fundContainer.button")}</Button>
      </div>
      <div className="h-[340px] overflow-auto">
        {entities ? (
          entities.map((entity) => (
            <FundPreviewCard
              key={entity.id}
              name={entity.name}
              bottomLeftText={entity.uic}
              bottomRightText={getEntityNameByLanguage(
                entity.entityType.name,
                i18n.language
              )}
              isSelected={entity.id === selectedCard}
              onClick={() => handleSelectCard(entity.id)}
            />
          ))
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default FundListContainer;
