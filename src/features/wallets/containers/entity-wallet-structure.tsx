import { useTranslation } from "react-i18next";
import { useGetWalletStructureBy } from "../api/use-get-wallet";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AccessVisibility } from "@/features/auth/components/access-visibility";
import { UserPermission } from "@/features/auth/types/permissions";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import AddWalletStructureModal from "./add-wallet-structure-modal";
import { useState } from "react";

interface EntityWalletStructureProps {
  id: string;
}

const EntityWalletStructure = ({ id }: EntityWalletStructureProps) => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetWalletStructureBy(id, "code");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const allAssets = data?.data?.assets;
  //   const assetOverview = data?.data?.overview;

  const handleFormVisibility = () => {
    setModalIsOpen(!modalIsOpen);
  };

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
                  <Dialog open={modalIsOpen}>
                    <DialogTrigger asChild>
                      <Button onClick={handleFormVisibility}>
                        {t("dashboard.assets.noAssets.button")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="wide-modal">
                      <DialogTitle className="pt-6 pb-2 px-4 text-center">
                        {t("dialog.wallet.add.title")}
                      </DialogTitle>
                      <div className="bg-white border-t-[1px] md:rounded-b">
                        <AddWalletStructureModal
                          toggleFormVisibility={handleFormVisibility}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </AccessVisibility>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EntityWalletStructure;
