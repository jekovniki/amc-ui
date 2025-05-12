import { CompanyWelcomeCard } from "@/features/company/components/company-welcome-card";
import EntityListContainer from "@/features/entity/containers/entity-list-container";
import ObligationWidgetContainer from "@/features/obligations/containers/obligation-widget-container";
import { motion } from "framer-motion";
import { usePageTitle } from "@/hooks/use-page-title";
import EntityAssetListWidget from "@/features/entity/containers/entity-asset-list-widget";

const DashboardPage = () => {
  usePageTitle("Начало");

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
  return (
    <motion.div
      className="p-4 grid grid-cols-12 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="col-span-8" variants={itemVariants}>
        <CompanyWelcomeCard />
      </motion.div>

      <motion.div className="col-span-4" variants={itemVariants}>
        <EntityListContainer />
      </motion.div>

      <motion.div className="col-span-8" variants={itemVariants}>
        <EntityAssetListWidget />
      </motion.div>

      <motion.div className="col-span-4" variants={itemVariants}>
        <ObligationWidgetContainer />
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
