import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PrivateRoutePath } from "@/pages/routes";
import { Link } from "react-router-dom";

const DahsboardSidebar = () => {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex items-center justify-center h-[73px] border-b-[1px]">
        <div>
          <Link to={PrivateRoutePath.Dashboard}>
            <span className="font-black text-[24px] text-primary">УД</span>
            &nbsp;
            <span className="text-[24px] font-thin text-[#0C2134]">
              Мениджър
            </span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  );
};

export default DahsboardSidebar;
