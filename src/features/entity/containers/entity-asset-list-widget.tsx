import { useTranslation } from "react-i18next";
import { useGetCompanyEntities } from "../api/use-get-company-entities";
import { Skeleton } from "@/components/ui/skeleton";
import { DefaultCarouselSlider } from "@/components/default-carousel-slider";
import EntityWalletStructure from "@/features/wallets/containers/entity-wallet-structure";

const EntityAssetListWidget = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetCompanyEntities();
  const entities = data?.data;

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-full w-full " />
      ) : entities?.length ? (
        <DefaultCarouselSlider
          variant="full-width"
          items={entities?.map((entity) => ({
            id: entity.id,
            name: entity.name,
            content: <EntityWalletStructure id={entity.id} />,
          }))}
        />
      ) : (
        <div className="bg-white rounded-md shadow-md min-h-[400px] flex items-center justify-center">
          <div className="text-[#0C2134BF] text-[14px] font-light text-center">
            {t("dashboard.entityContainer.empty")}
          </div>
        </div>
      )}
    </>
  );
};

export default EntityAssetListWidget;
