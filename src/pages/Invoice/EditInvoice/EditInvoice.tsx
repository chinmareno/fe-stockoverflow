import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useInvoiceDateStore from "@/store/useInvoiceDateStore";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns/esm";
import { InvoiceProps } from "../Invoice";
import { useEffect, useState } from "react";
import { Select } from "@/components/ui/select";
import PaidStatusSelect from "./PaidStatusSelect";
import { useParams } from "react-router-dom";

const EditInvoice = () => {
  const { date: selectedDate } = useInvoiceDateStore();
  const { data } = useQuery({
    queryKey: ["invoice", format(selectedDate, "dd MMMM yyyy")],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Promise<InvoiceProps[]>>(
        "/invoice/" + format(selectedDate, "dd MMMM yyyy")
      );
      return data;
    },
    retry: 1,
  });
  const { id: selectedInvoiceId } = useParams();
  const invoice = data?.find(
    ({ id, date }) =>
      id === selectedInvoiceId && format(selectedDate, "dd MMMM yyyy") === date
  );
  useEffect(() => {
    if (invoice?.paidStatus === "PAID") {
      setIsPaid(true);
    } else {
      setIsPaid(false);
    }
  }, [invoice?.paidStatus]);

  const [isPaid, setIsPaid] = useState(true);
  return (
    <>
      {invoice ? (
        <>
          <PaidStatusSelect isPaid={isPaid} setIsPaid={setIsPaid} />
          <div className="mt-3 text-xs md:text-base">
            <div>
              Date : <b>{format(selectedDate, "dd MMMM yyyy")}</b>
            </div>
            <div className="flex">
              <p className="mr-1">Seller: {invoice?.seller}</p>
            </div>
            <div className="flex ">
              <p className="mr-1">Buyer: {invoice?.buyer}</p>
            </div>
            <Table className="mb-4">
              <TableHeader className="text-xs md:text-base">
                <TableRow>
                  <TableHead className="w-[20%]">Name</TableHead>
                  <TableHead className="w-[20%]">Type</TableHead>
                  <TableHead className="w-[15%]">Length</TableHead>
                  <TableHead className="w-[15%]">Price/m</TableHead>
                  <TableHead className="w-[15%]">Quantity</TableHead>
                  <TableHead className="w-[15%]">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-xs md:text-base">
                {invoice?.invoiceItem.length > 0 &&
                  invoice.invoiceItem.map(
                    ({ length, name, price, quantity, type }) => {
                      return (
                        <TableRow key={invoice.id + name}>
                          <TableCell className="w-[20%]">{name}</TableCell>
                          <TableCell className="w-[20%]">{type}</TableCell>
                          <TableCell className="w-[15%]">{length}</TableCell>
                          <TableCell className="w-[15%]">Rp.{price}</TableCell>
                          <TableCell className="w-[15%]">{quantity}</TableCell>
                          <TableCell className="w-[15%]">
                            Rp.{Number(price) * Number(quantity)}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
              </TableBody>

              <TableCaption>Total Price :Rp.{invoice.totalPrice}</TableCaption>
            </Table>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

export default EditInvoice;
