import { useGetEntity } from "@/features/entity/api/use-get-entity";
import { Entity } from "@/features/entity/types/entity";
import { usePageTitle } from "@/hooks/use-page-title";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import WalletStructureCard from "@/features/wallets/containers/wallet-structure-card";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Adjust timing between each child animation
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const DashboardEntityOverviewPage = () => {
  const { t } = useTranslation();
  const { fundId, companyId } = useParams();
  const { data, isLoading } = useGetEntity(fundId || "");
  console.log("isLoading : ", isLoading);
  console.log("companyId : ", companyId);
  const fundData = data?.data || ({} as Entity);

  usePageTitle(`${fundData?.name} | ${t("preview.title")}`);
  return (
    <motion.div
      className="p-4 grid grid-cols-12 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="col-span-12 lg:col-span-8" variants={itemVariants}>
        <WalletStructureCard />
      </motion.div>
      <motion.div className="col-span-12 lg:col-span-4" variants={itemVariants}>
        Kiril
      </motion.div>
    </motion.div>
  );
};

export default DashboardEntityOverviewPage;
