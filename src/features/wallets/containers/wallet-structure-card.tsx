// import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useGetWalletStructureBy } from "../api/use-get-wallet";
import { WalletStructureFilter } from "../types/wallet-structure";

const WalletStructureCard = () => {
  //   const { t } = useTranslation();
  const { fundId } = useParams();
  const { data } = useGetWalletStructureBy(
    fundId || "",
    WalletStructureFilter.AssetType
  );
  console.log("data :", data?.data);
  return <div className="bg-white shadow-md p-4"></div>;
};

export default WalletStructureCard;
