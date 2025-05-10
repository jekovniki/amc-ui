import { ReactNode } from "react";

export const DashboardTileHeader = ({ children }: { children: ReactNode }) => {
  return <h2 className="text-[18px] text-[#0c2134]">{children} </h2>;
};
