import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { InvoiceItem } from "../Invoice";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import AddIcon from "@mui/icons-material/Add";
import InvoiceAddProductForm from "./InvoiceAddProductForm";
import { toast } from "@/components/ui/use-toast";
import BlurScreenWrapper from "@/components/BlurScreenWrapper";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "@/utils/axiosInstance";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PaidStatusSelect from "../EditInvoice/PaidStatusSelect";

interface IMakeInvoice {
  date: string;
  seller: string;
  buyer: string;
  invoiceItem: InvoiceItem[];
  totalPrice: number;
  paidStatus: string;
}

const NewInvoice = () => {
  const date = format(new Date(), "dd MMMM yyyy");
  const [invoiceItem, setInvoiceItem] = useState<InvoiceItem[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const invoiceRef = useRef(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [timeOutId, setTimeOutId] = useState();
  const confirmClear = () => {
    if (confirmDelete) {
      setInvoiceItem([]);
      setConfirmDelete(false);
      clearTimeout(timeOutId);
      return;
    }
    toast({
      description: "Press again to clear",
      duration: 3000,
    });
    setConfirmDelete(true);
    const id = setTimeout(() => {
      setConfirmDelete(false);
    }, 3000);
    setTimeOutId(id as any);
  };

  const [isPaid, setIsPaid] = useState(true);
  const [isDoneOpen, setIsDoneOpen] = useState(false);

  const cache = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    onError: () =>
      toast({
        variant: "destructive",
        title: "Uh oh something wrong!",
        description: "Please try again",
      }),
    onSuccess: () => {
      cache.invalidateQueries(["invoice", date]);
      cache.invalidateQueries(["profit", date]);
      toast({
        title: "Success",
        description: "Invoice created successfully",
        duration: 3000,
        className: "border-green-500 dark:border-green-700 border-l-8",
      });
      navigate("/items/invoice");
    },
    mutationFn: async ({
      buyer,
      date,
      invoiceItem,
      seller,
      totalPrice,
      paidStatus,
    }: IMakeInvoice) => {
      const items = await axiosInstance.post("invoice/", {
        buyer,
        date,
        invoiceItem,
        seller,
        totalPrice,
        paidStatus,
      });
      console.log(items);
    },
  });
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/user/profile");
      return data;
    },
  });
  const { register, watch } = useForm();

  const handleCreate = async () => {
    let paidStatus;
    if (isPaid) {
      paidStatus = "PAID";
    } else {
      paidStatus = "UNPAID";
    }
    mutation.mutate({
      buyer: watch("buyer"),
      seller: watch("seller"),
      date,
      invoiceItem,
      paidStatus,
      totalPrice,
    });
  };

  const handleDoneClick = () => {
    if (!watch("seller")) {
      return toast({ description: "Please enter seller name" });
    }
    if (!watch("buyer")) {
      return toast({ description: "Please enter buyer name" });
    }
    if (invoiceItem.length === 0) {
      return toast({ description: "Please enter atleast one product" });
    }
    setIsDoneOpen(true);
  };
  return (
    <>
      {isDoneOpen && (
        <BlurScreenWrapper>
          <div className="flex h-screen w-screen items-center justify-center">
            <div className="relative flex flex-col gap-4 rounded-md border border-gray-400 bg-white p-4 dark:border-blue-500 dark:bg-black">
              <button
                onClick={() => setIsDoneOpen(false)}
                className="absolute right-1 top-1"
              >
                <CloseIcon />
              </button>
              <header className="font-semibold uppercase">Paid Status :</header>
              <PaidStatusSelect isPaid={isPaid} setIsPaid={setIsPaid} />
              <Button onClick={handleCreate} className="font-semibold">
                Create
              </Button>
            </div>
          </div>
        </BlurScreenWrapper>
      )}

      <div className="fixed bottom-12 right-1 flex flex-col gap-2">
        <Button
          onClick={() => setIsAddOpen(true)}
          className="ml-auto flex w-full text-xs font-semibold shadow-md"
          variant="outline"
          size="sm"
        >
          <AddIcon />
          ADD
        </Button>
        <Button
          onClick={confirmClear}
          className="mr-1 flex w-full text-xs shadow-md"
          size="sm"
          variant="destructive"
        >
          ✕ CLEAR
        </Button>
      </div>
      <div ref={invoiceRef} className="text-xs md:text-base">
        <div>
          Date : <b>{date}</b>
        </div>
        <div className="flex">
          <p className="mr-1">Seller:</p>
          <input
            autoComplete="off"
            {...register("seller", { required: true })}
            placeholder="Enter name"
            defaultValue={profile.seller}
            className="bg-transparent "
          />
        </div>
        <div className="flex ">
          <p className="mr-1">Buyer:</p>
          <input
            autoComplete="off"
            {...register("buyer", { required: true })}
            placeholder="Enter name"
            className="bg-transparent "
          />
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
            {invoiceItem.length > 0 &&
              invoiceItem.map(({ length, name, price, quantity, type }) => {
                return (
                  <TableRow>
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
              })}
          </TableBody>
          {invoiceItem && (
            <TableCaption>Total Price :Rp.{totalPrice}</TableCaption>
          )}
        </Table>
        {isAddOpen && (
          <InvoiceAddProductForm
            setTotalPrice={setTotalPrice}
            setInvoiceItem={setInvoiceItem}
            setIsAddOpen={setIsAddOpen}
          />
        )}
      </div>
      <Button
        className=" fixed bottom-0 left-0 flex w-screen justify-center bg-[#2196f3] text-xs font-semibold dark:bg-[#1976d2]"
        variant="outline"
        size="sm"
        onClick={handleDoneClick}
      >
        Done
      </Button>
    </>
  );
};

export default NewInvoice;
