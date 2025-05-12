import { useTranslation } from "react-i18next";
import { useGetWalletStructureBy } from "../api/use-get-wallet";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface EntityWalletStructureProps {
  id: string;
}

const EntityWalletStructure = ({ id }: EntityWalletStructureProps) => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetWalletStructureBy(id, "code");
  const allAssets = data?.data?.assets;
  const assetOverview = data?.data?.overview;
  console.log("id : ", id);
  console.log("allAssets : ", allAssets);
  console.log("allAssets.length : ", allAssets?.length);
  return (
    <div className="bg-white shadow-md hover:shadow-sm transition-all p-4">
      <h3 className="mb-4 font-light text-[13px] text-[#0C213473]">
        {t("dashboard.assets.title")}
      </h3>
      <div>
        {isLoading ? (
          <>
            <Skeleton className="w-full h-[40px] rounded-md bg-[#0000000D] mb-2" />
            <Skeleton className="w-full h-[40px] rounded-md bg-[#0000000D] mb-2" />
            <Skeleton className="w-full h-[40px] rounded-md bg-[#0000000D] mb-2" />
            <Skeleton className="w-full h-[40px] rounded-md bg-[#0000000D] mb-2" />
            <Skeleton className="w-full h-[40px] rounded-md bg-[#0000000D]" />
          </>
        ) : (
          <>
            {allAssets?.length ? (
              allAssets?.map((asset) => (
                <div className="w-full h-[40px] border-[#0000000D] rounded-md border-[2px] mb-2 flex items-center justify-between p-4">
                  <h5 className="text-[13px] font-light ">{asset.groupKey}</h5>
                  <div></div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center flex-col gap-2 h-[250px]">
                <h4 className="font-light text-[#0C2134B]">
                  {t("dashboard.assets.noAssets.title")}
                </h4>
                <p className="text-[#0C2134BF] font-light text-[14px] mb-4">
                  {t("dashboard.assets.noAssets.description")}
                </p>
                <Button>{t("dashboard.assets.noAssets.button")}</Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EntityWalletStructure;
