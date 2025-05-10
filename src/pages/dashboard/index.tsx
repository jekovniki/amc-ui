import { CompanyWelcomeCard } from "@/features/company/components/company-welcome-card";
import EntityListContainer from "@/features/entity/containers/entity-list-container";
import ObligationWidgetContainer from "@/features/obligations/containers/obligation-widget-container";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const { t } = useTranslation();

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
        <div className="bg-white rounded-md shadow-md min-h-[400px] flex items-center justify-center">
          <div className="text-[#0C2134BF] text-[14px] font-light text-center">
            {t("dashboard.entityContainer.empty")}
          </div>
        </div>
      </motion.div>

      <motion.div className="col-span-4" variants={itemVariants}>
        <ObligationWidgetContainer />
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;
