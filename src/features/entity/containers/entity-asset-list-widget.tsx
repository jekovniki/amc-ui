import { useTranslation } from "react-i18next";
import { useGetCompanyEntities } from "../api/use-get-company-entities";
import { Skeleton } from "@/components/ui/skeleton";
import { DefaultCarouselSlider } from "@/components/default-carousel-slider";

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
            name: entity.name,
            content: (
              <div className="bg-white rounded-md shadow-md hover:shadow-sm p-4">
                {entity.name}
              </div>
            ),
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
