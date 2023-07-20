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
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns/esm";
import { InvoiceProps } from "../Invoice";
import { useEffect, useState } from "react";
import { Select } from "@/components/ui/select";
import PaidStatusSelect from "./PaidStatusSelect";
import { useNavigate, useParams } from "react-router-dom";
import toRupiahFormat from "@/utils/toRupiahFormat";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import BlurScreenWrapper from "@/components/BlurScreenWrapper";
import CloseIcon from "@mui/icons-material/Close";

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

  const { toast } = useToast();
  const cache = useQueryClient();
  const navigate = useNavigate();
  const mutationPaidStatus = useMutation({
    mutationFn: async ({ paidStatus }: { paidStatus: string }) => {
      await axiosInstance.patch("invoice/", {
        invoiceId: invoice?.id,
        paidStatus,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Paid status changed successfully",
        duration: 3000,
        className: "border-green-500 dark:border-green-700 border-l-8",
      });
      cache.invalidateQueries([
        "invoice",
        format(selectedDate, "dd MMMM yyyy"),
      ]);
      navigate("/items/invoice");
    },
    onError: () => {
      toast({
        title: "Uh oh something wrong!",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete("invoice/" + selectedInvoiceId);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Invoice deleted successfully",
        duration: 3000,
        className: "border-green-500 dark:border-green-700 border-l-8",
      });
      cache.invalidateQueries([
        "invoice",
        format(selectedDate, "dd MMMM yyyy"),
      ]);
      navigate("/items/invoice");
    },
    onError: () => {
      toast({
        title: "Uh oh something wrong!",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDoneClick = () => {
    let paidStatusBoolean;
    if (invoice?.paidStatus == "PAID") {
      paidStatusBoolean = true;
    } else {
      paidStatusBoolean = false;
    }
    if (paidStatusBoolean == isPaid) {
      return navigate("/items/invoice");
    }
    let paidStatus;
    if (isPaid) {
      paidStatus = "PAID";
    } else {
      paidStatus = "UNPAID";
    }
    mutationPaidStatus.mutate({ paidStatus });
  };
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = () => {
    mutationDelete.mutate();
  };
  return (
    <>
      {invoice ? (
        <>
          {confirmDelete && (
            <BlurScreenWrapper>
              <div className="flex h-screen w-screen items-center justify-center">
                <div className="relative flex flex-col gap-4 rounded-md border border-gray-400 bg-white p-4 dark:border-blue-500 dark:bg-black">
                  <button
                    className="absolute right-1 top-1"
                    onClick={() => setConfirmDelete(false)}
                  >
                    <CloseIcon />
                  </button>
                  <h3>Invoice Delete Confirmation</h3>
                  <header>Are you sure want to delete permanently ?</header>
                  <Button onClick={handleDeleteClick}>Confirm</Button>
                </div>
              </div>
            </BlurScreenWrapper>
          )}
          <div className="ml-1 mt-2 flex">
            <PaidStatusSelect isPaid={isPaid} setIsPaid={setIsPaid} />

            <Button
              onClick={() => setConfirmDelete(true)}
              className="ml-auto mr-2 bg-red-500 text-black hover:bg-red-600 dark:bg-red-700 dark:text-white hover:dark:bg-red-800"
            >
              <DeleteIcon />
            </Button>
          </div>
          <div className="ml-2 mt-3 text-xs md:text-base">
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
                            Rp.
                            {toRupiahFormat(Number(price) * Number(quantity))}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
              </TableBody>

              <TableCaption>
                Total Price :Rp.{toRupiahFormat(invoice.totalPrice)}
              </TableCaption>
            </Table>
            <Button
              onClick={handleDoneClick}
              className="fixed bottom-0 left-0 w-screen font-semibold uppercase"
            >
              Done
            </Button>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

export default EditInvoice;
