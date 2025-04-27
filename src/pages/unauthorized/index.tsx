import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { PublicRoutePath } from "../routes";

const UnauthorizedPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-around h-screen">
      <div className="relative bg-white shadow-xl max-w-[768px] w-full mx-10 relative">
        <div className="p-8">
          <h1 className="font-light text-[24px] ">{t("unauthorized.title")}</h1>
          <p className="mb-4">{t("unauthorized.description")}</p>
          <Link
            to={PublicRoutePath.Login}
            className="bg-primary-button-effect px-8 py-[10px] font-light rounded-[2px] transition-all"
          >
            {t("unauthorized.button")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
