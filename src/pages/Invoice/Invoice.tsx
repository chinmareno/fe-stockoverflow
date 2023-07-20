import axiosInstance from "@/utils/axiosInstance";
import InvoiceTable from "./InvoiceTable";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import InvoiceList from "./InvoiceList";
import { NavLink } from "react-router-dom";
import useInvoiceDateStore from "@/store/useInvoiceDateStore";
import InvoiceSkeleton from "./InvoiceSkeleton";

export type InvoiceItem = {
  name: string;
  type: string;
  length: number;
  price: number;
  quantity: number;
};
export interface InvoiceProps {
  id: string;
  date: string;
  seller: string;
  buyer: string;
  totalPrice: number;
  invoiceItem: InvoiceItem[];
  paidStatus: string;
}
const Invoice = () => {
  const { date, setDate } = useInvoiceDateStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["invoice", format(date, "dd MMMM yyyy")],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Promise<InvoiceProps[]>>(
        "/invoice/" + format(date, "dd MMMM yyyy")
      );
      return data;
    },
    retry: 1,
  });
  const selectDate = (e: any) => {
    if (e) {
      setDate(e);
    }
  };

  return (
    <>
      <div className="mt-2 flex flex-col items-center justify-center">
        <Popover>
          <PopoverTrigger asChild className="w-1/2 lg:w-1/3">
            <Button variant={"outline"}>
              <CalendarMonthIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "dd MMM yyyy") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={selectDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <NavLink to="unpaid-invoice" className="ml-auto mr-2">
          <Button
            className="text-blue-700 dark:text-blue-800 md:text-lg lg:mr-7"
            variant="link"
          >
            Go To Unpaid Invoice
          </Button>
        </NavLink>
      </div>
      {isLoading && <InvoiceSkeleton />}
      {(data?.length as any) > 0 ? (
        <InvoiceList data={data} />
      ) : (
        !isLoading && <div>No Invoice In This Date</div>
      )}
      <NavLink to="new-invoice">
        <Button
          variant={"outline"}
          className="fixed bottom-0 flex w-full justify-center bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
        >
          + New Invoice
        </Button>
      </NavLink>
    </>
  );
};

export default Invoice;
