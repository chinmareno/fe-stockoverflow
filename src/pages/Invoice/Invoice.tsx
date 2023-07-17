import axiosInstance from "@/utils/axiosInstance";
import InvoiceCard from "./InvoiceCard";
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
  const selectDate = (e) => {
    if (e) {
      setDate(e);
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <Popover>
          <PopoverTrigger asChild>
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
      </div>
      {error ? (
        <div className="flex justify-center">Gada</div>
      ) : isLoading ? (
        <div className="flex justify-center">loading</div>
      ) : (
        data && <InvoiceList data={data} />
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
