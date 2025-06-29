import { Skeleton } from "@/components/ui/skeleton";
import { useGetCompanyUsers } from "@/features/user/api/use-get-company-users";
import { usePageTitle } from "@/hooks/use-page-title";

const DashboardTeamPage = () => {
  usePageTitle("Екип");
  const { data, isLoading } = useGetCompanyUsers();

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {isLoading ? (
        <>
          <Skeleton className="col-span-6 lg:col-span-4 aspect-square" />
          <Skeleton className="col-span-6 lg:col-span-4 aspect-square" />
          <Skeleton className="col-span-6 lg:col-span-4 aspect-square" />
        </>
      ) : (
        data?.data?.map((user) => (
          <div
            key={user.id}
            className="col-span-6 lg:col-span-4 user-select-none aspect-square shadow-md hover:shadow-sm transition-all bg-white flex flex-col items-center justify-center"
          >
            <h3 className="text-[18px] font-semibold">
              {user.firstName} {user.lastName}
            </h3>
            <div className="my-4 h-[2px] w-[30px] bg-[#0C213473]"></div>
            <h5 className="text-[15px] text-[#0C2134]">{user.email}</h5>
            <p className="text-[13px] text-[#0C213473]">{user.job}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default DashboardTeamPage;
