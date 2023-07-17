import AccountCard from "../../components/Card/AccountCard";
import AccountMenu from "../../components/Menu/AccountMenu";
import imagepagination from "../../components/ImagePagination";
import NavLinkCustom2 from "@/components/NavLinkCustom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditAccount from "../auth/EditAccount/EditAccount";
import ChangeAccount from "../auth/ChangeAccount/ChangeAccount";
import Tooltip from "@/components/TooltipCustom";
import DataGrid from "@/pages/items/Stock/DataGridStock";
import DataGridCustom from "@/pages/items/Stock/DataGridStock";
import InvoiceTable from "../Invoice/InvoiceTable";
import InvoiceCard from "../Invoice/InvoiceCard";
import InvoiceAddProductForm from "../Invoice/InvoiceAddProductForm";
import { useForm, SubmitHandler } from "react-hook-form";
const Test2 = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of
  return (
    <div className="flex h-screen w-screen items-center justify-center border bg-cyan-100">
      <div className="mb-10 rounded-3xl border   bg-slate-700/25 p-10">
        {/* Put Your Component Down Here */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input defaultValue="test" {...register("example")} />

          {/* include validation with required or other standard HTML validation rules */}
          <input {...register("exampleRequired", { required: true })} />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <p>This field is required</p>}

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Test2;
