import toRupiahFormat from "@/utils/toRupiahFormat";
import { InvoiceProps } from "./Invoice";
import { NavLink, useNavigate } from "react-router-dom";

interface InvoiceListProps {
  data: InvoiceProps[];
}
const InvoiceList = ({ data }: InvoiceListProps) => {
  const navigate = useNavigate();
  const invoices = data;

  return (
    <div className="mt-2 flex flex-col divide-y-2 divide-gray-300 border-b-2 border-b-gray-300">
      <div className="mb-1 flex text-xs uppercase">
        <div className="w-2/5">Date</div>
        <div className="w-1/4">Seller</div>
        <div className="w-1/4">Buyer</div>
        <div className="w-2/5">Total price</div>
      </div>
      {invoices.map(({ buyer, date, id, seller, totalPrice, paidStatus }) => {
        return (
          <NavLink
            key={id}
            className="flex items-end pt-3 text-xs hover:bg-slate-200 dark:hover:bg-neutral-800  "
            to={`edit-invoice/${id}`}
          >
            <div className="w-2/5">{date}</div>
            <div className="w-1/4">{buyer}</div>
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
