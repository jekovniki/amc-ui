import { useGetEntity } from "@/features/entity/api/use-get-entity";
import { Entity } from "@/features/entity/types/entity";
import { PrivateRoutePath } from "@/pages/routes";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const DashboardEntityOverviewPage = () => {
  const { t } = useTranslation();
  const { fundId, companyId } = useParams();
  const { data } = useGetEntity(fundId || "");
  const navigate = useNavigate();
  const fundData = data?.data || ({} as Entity);

  const pages = [
    {
      name: "main",
      icon: <span>main</span>,
    },
    {
      name: "assets",
      icon: <span>assets</span>,
    },
    {
      name: "restrictions",
      icon: <span>restrictions</span>,
    },
    {
      name: "obligation",
      icon: <span>obligation</span>,
    },
    {
      name: "documents",
      icon: <span>documents</span>,
    },
  ];
  const handleClick = (name: string) => {
    navigate(`/${companyId}/${PrivateRoutePath.Entity}/${fundId}/${name}`);
  };
  return (
    <div className="p-4 h-full flex items-center justify-center">
      <div className="max-w-[800px] w-full grid grid-cols-6 gap-8">
        <div className="col-span-6 flex items-center justify-center">
          <h2>{fundData.name}</h2>
        </div>
        {pages.map(({ name, icon }) => (
          <div
            className="bg-white col-span-2 shadow-md hover:shadow-sm transition-all cursor-pointer rounded-[3px] min-h-[240px] flex items-center justify-center flex-col p-4"
            onClick={() => {
              handleClick(name);
            }}
          >
            {icon}
            <h3>{t(`entity.overview.${name}.title`)}</h3>
            <p>{t(`entity.overview.${name}.description`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardEntityOverviewPage;
