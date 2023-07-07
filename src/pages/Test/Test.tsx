import AccountCard from "../../components/Card/AccountCard";
import AccountMenu from "../../components/Menu/AccountMenu";
import imagepagination from "../../components/ImagePagination";
import NavLinkCustom2 from "@/components/NavLinkCustom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditAccount from "../auth/EditAccount/EditAccount";
import ChangeAccount from "../auth/ChangeAccount/ChangeAccount";
import Tooltip from "@/components/TooltipCustom";
import DataGrid from "@/components/DataGrid/DataGrid";
import EditModalStock from "../items/Stock/EditModalStock";

const Test = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center border bg-cyan-100">
      <div className="mb-10 rounded-3xl border   bg-slate-700/25 p-10">
        {/* Put Your Component Down Here */}
        <EditModalStock />
      </div>
    </div>
  );
};

export default Test;
