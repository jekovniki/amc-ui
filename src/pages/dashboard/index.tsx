import { CompanyWelcomeCard } from "@/features/company/components/company-welcome-card";

const DashboardPage = () => {
  return (
    <div className="p-4 grid grid-cols-12 gap-4">
      <div className="col-span-8">
        <CompanyWelcomeCard />
      </div>
      <div className="col-span-4">asd</div>
    </div>
  );
};

export default DashboardPage;
