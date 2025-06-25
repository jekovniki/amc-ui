import { useTranslation } from "react-i18next";
import { useGetWalletStructureBy } from "../api/use-get-wallet";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { AccessVisibility } from "@/features/auth/components/access-visibility";
import { UserPermission } from "@/features/auth/types/permissions";
import { WalletStructureFilter } from "../types/wallet-structure";
import { useGetAssetTypes } from "../api/use-get-asset-types";
import { getAssetTypeStructureByLanguage } from "../util/wallet-translations";
import AddWalletStructure from "./add-wallet-structure";

interface EntityWalletStructureProps {
  id: string;
}

const EntityWalletStructure = ({ id }: EntityWalletStructureProps) => {
  const { t, i18n } = useTranslation();
  const { data, isLoading } = useGetWalletStructureBy(
    id,
    WalletStructureFilter.AssetType
  );
  const allAssets = data?.data?.assets;
  const assetTypesRequest = useGetAssetTypes();
  const allAssetTypes = assetTypesRequest.data?.data;

  const combinedTotal = allAssets?.reduce(
    (sum, item) => sum + parseFloat(item.totalValue),
    0
  );
  const formattedTotal = combinedTotal?.toFixed(2) || 0;

  return (
    <div className="bg-white shadow-md hover:shadow-sm transition-all p-4">
      <h3 className="mb-4 font-light text-[13px] text-[#0C213473]">
        {t("dashboard.assets.title")}
      </h3>
      <div className="flex flex-col justify-between h-full">
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
                allAssets?.map((asset, index) => (
                  <div
                    key={index}
                    className="w-full h-[40px] border-[#0000000D] rounded-md border-[2px] mb-2 flex items-center justify-between p-4"
                  >
                    <h5 className="text-[13px] font-light truncate">
                      {getAssetTypeStructureByLanguage(
                        allAssetTypes?.find(
                          (assetType) =>
                            assetType.id.toString() === asset.groupKey
                        )?.name || "",
                        i18n.language
                      )}
                    </h5>
                    <div className="flex items-center gap-6">
                      <Progress
                        value={Number(asset.percentage)}
                        className="w-[300px]"
                      />
                      <div className="flex items-center justify-end gap-2 min-w-[175px]">
                        <div className="text-[13px] font-light flex gap-[2px]">
                          {asset.totalValue}{" "}
                          <span className="text-[#0C213473]">лв.</span>
                        </div>
                        <div className="text-[13px] font-light flex gap-[2px]">
                          {asset.percentage}
                          <span className="text-[#0C213473]">%</span>
                        </div>
                      </div>
                    </div>
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
                  <AccessVisibility
                    accessLevelRequired={UserPermission.assetCreate}
                  >
                    <AddWalletStructure triggerType="button" entityId={id} />
                  </AccessVisibility>
                </div>
              )}
            </>
          )}
        </div>
        {allAssets?.length ? (
          <div className="px-2 flex justify-between items-center">
            <h5 className="text-[13px] font-bold">Общо</h5>
            <div className="flex gap-2">
              <span className="text-[14px] font-light">
                {formattedTotal} <span className="text-[#0C213473]">лв.</span>
              </span>
              <span className="text-[14px]">
                <strong>100.00</strong>%
              </span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default EntityWalletStructure;
