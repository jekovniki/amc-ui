import { EntityBarChartIcon } from "@/components/icons/entity-bar-chart-icon";
import { EntityBillIcon } from "@/components/icons/entity-bill-icon";
import { EntityChartIcon } from "@/components/icons/entity-chart-icon";
import { EntityDatabaseIcon } from "@/components/icons/entity-database-icon";
import { EntityDocumentIcon } from "@/components/icons/entity-document.icon";
import { EntityWalletIcon } from "@/components/icons/entity-wallet-icon";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetEntity } from "@/features/entity/api/use-get-entity";
import { Entity } from "@/features/entity/types/entity";
import { PrivateFundRoutePath, PrivateRoutePath } from "@/pages/routes";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { usePageTitle } from "@/hooks/use-page-title";
import { motion } from "framer-motion";
import { useGetWalletStructureBy } from "@/features/wallets/api/use-get-wallet";
import { WalletStructureFilter } from "@/features/wallets/types/wallet-structure";
import { DangerBox } from "@/components/danger-box";
import AddWalletStructure from "@/features/wallets/containers/add-wallet-structure";
import { useGetRule } from "@/features/wallets/api/rules/use-get-rules";
import AddRulesByExcel from "@/features/wallets/containers/add-rules-by-excel";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
import { WalletQueries } from "@/features/wallets/api/query-keys";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const DashboardEntityNavigationPage = () => {
  const { t } = useTranslation();
  const { fundId, companyId } = useParams();
  const { data, isLoading } = useGetEntity(fundId || "");
  const client = useQueryClient();
  const navigate = useNavigate();
  const walletStructure = useGetWalletStructureBy(
    fundId || "",
    WalletStructureFilter.AssetType
  );
  const rulesResonse = useGetRule(fundId || "");
  const hasRules = rulesResonse?.data?.data?.length;
  const hasAssets = walletStructure.data?.data?.assets?.length;

  const fundData = data?.data || ({} as Entity);
  usePageTitle(fundData?.name);
  const pages = [
    {
      name: PrivateFundRoutePath.Overview,
      icon: (
        <EntityChartIcon className="text-[#0C213480] group-hover:text-primary transition-colors duration-200" />
      ),
    },
    {
      name: PrivateFundRoutePath.Assets,
      icon: (
        <EntityDatabaseIcon className="text-[#0C213480] group-hover:text-primary transition-colors duration-200" />
      ),
    },
    {
      name: PrivateFundRoutePath.Restrictions,
      icon: (
        <EntityBarChartIcon className="text-[#0C213480] group-hover:text-primary transition-colors duration-200" />
      ),
    },
    {
      name: PrivateFundRoutePath.Obligations,
      icon: (
        <EntityBillIcon className="text-[#0C213480] group-hover:text-primary transition-colors duration-200" />
      ),
    },
    {
      name: "documents",
      icon: (
        <EntityDocumentIcon className="text-[#0C213480] group-hover:text-primary transition-colors duration-200" />
      ),
    },
  ];
  const handleClick = (name: string) => {
    navigate(`/${companyId}/${PrivateRoutePath.Entity}/${fundId}/${name}`);
    client.invalidateQueries(WalletQueries.Rules as InvalidateQueryFilters);
  };
  return (
    <div className="p-4 h-full flex items-start justify-center">
      <motion.div
        className="max-w-[800px] w-full grid grid-cols-6 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="col-span-6 flex flex-col items-center justify-center mt-20"
          variants={itemVariants}
        >
          <EntityWalletIcon className="text-[#0C213440] mb-6" />
          {isLoading ? (
            <Skeleton className="h-[36px] w-[300px]" />
          ) : (
            <h2 className="text-[#0C2134] text-[24px] font-semibold">
              {fundData.name}
            </h2>
          )}
        </motion.div>
        <motion.div className="col-span-6 gap-6 w-full">
          {walletStructure.isLoading || rulesResonse.isLoading ? (
            <Skeleton className="h-[60px] w-full" />
          ) : (
            <>
              {hasAssets && hasRules ? <div className="my-10"></div> : ""}
              {!hasAssets ? (
                <div className={!hasAssets ? `mb-4` : ""}>
                  <DangerBox
                    key={`${fundId}-structure`}
                    title={t("entity.overview.notifications.noAssets")}
                  >
                    <AddWalletStructure
                      triggerType="link"
                      entityId={fundId || ""}
                    />
                  </DangerBox>
                </div>
              ) : (
                ""
              )}
              {!hasRules ? (
                <DangerBox
                  key={`${fundId}-rule`}
                  title={t("entity.overview.notifications.noRestrictions")}
                >
                  <AddRulesByExcel triggerType="link" entityId={fundId || ""} />
                </DangerBox>
              ) : (
                ""
              )}
            </>
          )}
        </motion.div>

        {pages.map(({ name, icon }) => (
          <motion.div
            key={name}
            variants={itemVariants}
            className="group bg-white col-span-2 shadow-md hover:shadow-sm transition-all cursor-pointer rounded-[3px] min-h-[240px] flex gap-2 text-center items-center justify-center flex-col p-4"
            onClick={() => {
              handleClick(name);
            }}
          >
            {icon}
            <h3 className="text-[#0C2134] font-semibold text-[16px] mt-4">
              {t(`entity.overview.${name}.title`)}
            </h3>
            <p className="text-[13px] text-[#0C213473]">
              {t(`entity.overview.${name}.description`)}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DashboardEntityNavigationPage;
