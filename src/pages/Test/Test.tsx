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
import { useToast } from "@/components/ui/use-toast";
import InvoiceCard from "../items/Invoice/InvoiceCard";
import InvoiceTable from "../items/Invoice/InvoiceTable";
import useTest, { useTemporalStore } from "@/store/useTest";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Test = () => {
  const { toast } = useToast();
  const { bears, increasePopulation, removeAllBears } = useTest();
  const { redo, undo, pastStates, futureStates } = useTemporalStore(
    (state) => state
  );
  const [isRedo, setisRedo] = useState(false);
  if (isRedo) {
    console.log("sesudah" + bears);
    setisRedo(false);
    setisRedo(false);
  }
  const handle = async () => {
    console.log("sebelum");
    console.log(bears);
    console.log(
      "ini adalahahahdhah" + futureStates[futureStates.length - 1].bears
    );
    setisRedo(true);
    redo();
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center border bg-cyan-100">
      <div className="mb-10 flex gap-7 rounded-3xl border   bg-slate-700/25 p-10">
        {/* Put Your Component Down Here */}
        <div>{bears}</div>
        <Button onClick={() => undo()}>undo</Button>
        <Button onClick={handle}>redo</Button>
        <Button onClick={() => increasePopulation()}>increase</Button>
        <Button onClick={() => removeAllBears()}>remove</Button>
      </div>
    </div>
  );
};

export default Test;
