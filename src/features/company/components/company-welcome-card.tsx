import session from "@/features/auth/services/session";
import { useTranslation } from "react-i18next";
import welcomeImage from "../../../assets/welcome-icon.svg";
import { useGetCompany } from "../api/use-get-company";
import { Skeleton } from "@/components/ui/skeleton";

export const CompanyWelcomeCard = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetCompany();
  const sessionData = session.get();
  const companyName = data?.data.name || "";
  const companyUic = data?.data?.uic || "";
  return (
    <div className="bg-welcome-card flex justify-between shadow-md">
      <div className="pl-4 flex flex-col justify-center">
        <h2 className="text-[#0c2134] text-[24px] font-thin mb-4">
          {t("dashboard.welcomeCard.title")},{" "}
          <strong className="font-bolder">
            {isLoading ? (
              <Skeleton className="h-[20px] inline-block w-[100px] bg-secondary" />
            ) : (
              sessionData?.firstName || ""
            )}
          </strong>
          !
        </h2>
        <p className="font-thin mb-2">{t("dashboard.welcomeCard.text")}.</p>
        <ul className="standard-ul">
          <li className="font-thin">
            {isLoading ? (
              <Skeleton className="h-[20px] inline-block w-[100px] bg-secondary" />
            ) : (
              <strong>{companyName}</strong>
            )}
          </li>
          <li className="font-thin">
            {isLoading ? (
              <Skeleton className="h-[20px] inline-block w-[100px] bg-secondary" />
            ) : (
              <>
                {t("dashboard.welcomeCard.subtext")}:{" "}
                <strong>{companyUic}</strong>
              </>
            )}
          </li>
        </ul>
        <p className="font-thin mt-6 italic">
          {t("dashboard.welcomeCard.message")}
        </p>
      </div>
      <div className="pr-4 h-[386px] flex justify-end items-end">
        <img src={welcomeImage} alt={companyName} />
      </div>
    </div>
  );
};
