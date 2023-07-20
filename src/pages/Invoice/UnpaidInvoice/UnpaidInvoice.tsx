import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { InvoiceProps } from "../Invoice";
import InvoiceSkeleton from "../InvoiceSkeleton";
import { NavLink } from "react-router-dom";
import toRupiahFormat from "@/utils/toRupiahFormat";
import { Button } from "@/components/ui/button";

const UnpaidInvoice = () => {
  const { data: invoices, isLoading } = useQuery({
    queryKey: ["unpaidinvoice"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Promise<InvoiceProps[]>>(
        "/invoice/unpaid"
      );
      return data;
    },
    retry: 1,
  });
  return (
    <div className="mt-4 flex flex-col divide-y-2 divide-gray-300 border-b-2 border-b-gray-300">
      <NavLink to="/items/invoice/" className="ml-auto mr-2">
        <Button
          className="text-blue-700 dark:text-blue-800 md:text-lg lg:mr-7"
          variant="link"
        >
          Go To Invoice By Date
        </Button>
      </NavLink>
      {isLoading && <InvoiceSkeleton />}
      {invoices.length > 0 && (
        <div className="mb-1 flex text-xs font-semibold uppercase md:text-base lg:text-xl">
          <div className="w-2/5">Date</div>
          <div className="w-1/4">Buyer</div>
          <div className="w-1/4">Status</div>
          <div className="w-2/5">Total price</div>
        </div>
      )}

      {invoices?.length > 0
        ? invoices.map(({ buyer, date, id, totalPrice, paidStatus }) => {
            return (
              <NavLink
                key={id}
                className="flex items-end pt-3 text-xs hover:bg-slate-200 dark:hover:bg-neutral-800 md:text-base lg:text-xl  "
                to={`/items/invoice/edit-invoice/${id}`}
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
          })
        : !isLoading && <div> No Unpaid Invoice Left</div>}
    </div>
  );
};

export default UnpaidInvoice;
