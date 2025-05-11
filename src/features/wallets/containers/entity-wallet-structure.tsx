import { useTranslation } from "react-i18next";
import { useGetWalletStructureBy } from "../api/use-get-wallet";
import { Skeleton } from "@/components/ui/skeleton";

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
  return (
    <div className="bg-white shadow-md hover:shadow-sm transition-all p-4">
      <h3 className="mb-6 font-light text-[13px] text-[#0C213473]">
        {t("dashboard.assetsLabel")}
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
          <>{allAssets?.length ? <div>Nqma</div> : <div>Ima</div>}</>
        )}
      </div>
    </div>
  );
};

export default EntityWalletStructure;
