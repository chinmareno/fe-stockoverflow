import toRupiahFormat from "@/utils/toRupiahFormat";
import { InvoiceProps } from "./Invoice";
import { NavLink } from "react-router-dom";

interface InvoiceListProps {
  data?: InvoiceProps[];
}
const InvoiceList = ({ data }: InvoiceListProps) => {
  const invoices = data;

  return (
    <div className="mt-4 flex flex-col divide-y-2 divide-gray-300 border-b-2 border-b-gray-300">
      <div className="mb-1 flex text-xs font-semibold uppercase md:text-base lg:text-xl">
        <div className="w-2/5">Date</div>
        <div className="w-1/4">Buyer</div>
        <div className="w-1/4">Status</div>
        <div className="w-2/5">Total price</div>
      </div>
      {invoices?.map(({ buyer, date, id, totalPrice, paidStatus }) => {
        return (
          <NavLink
            key={id}
            className="flex items-end pt-3 text-xs hover:bg-slate-200 dark:hover:bg-neutral-800 md:text-base lg:text-xl  "
            to={`edit-invoice/${id}`}
          >
            <div className="w-2/5">{date}</div>
            <div className="w-1/4 capitalize">{buyer}</div>
            <div
              className={`w-1/4 ${
                paidStatus == "PAID" ? "text-green-500" : "text-red-500"
              }`}
            >
              {paidStatus}
            </div>
            <div className="w-2/5">Rp.{toRupiahFormat(totalPrice)}</div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default InvoiceList;
