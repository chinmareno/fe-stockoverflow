import { Input } from "@/components/ui/input";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@/components/ui/button";
import { Autocomplete, TextField, useMediaQuery } from "@mui/material";
import { largeQuery, mediumQuery, mobileQuery } from "@/utils/mediaQuery";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import useIsModalStockOpenStore from "@/store/useIsModalStockOpenStore";
import { useToast } from "@/components/ui/use-toast";
import toRupiahFormat from "@/utils/toRupiahFormat";
import { InvoiceItem } from "../Invoice";
import { useForm } from "react-hook-form";

interface InvoiceAddProductFormProps {
  setIsAddOpen: (isAddOpen: boolean) => void;
  setInvoiceItem: (InvoiceItem: InvoiceItem) => void;
  setTotalPrice: (totalPrice: number) => void;
}
const InvoiceAddProductForm = ({
  setIsAddOpen,
  setInvoiceItem,
  setTotalPrice,
}: InvoiceAddProductFormProps) => {
  const { toast } = useToast();

  const handleAddSubmit = (e: any) => {
    e.preventDefault();
    if (!rupiah) {
      toast({
        duration: 5000,
        description: "Don't forget to enter the price :)",
      });
      return;
    }
    const selectedProduct = [];
    productData?.map(({ name, type, length, quantity }) => {
      if (
        name == nameSelected &&
        type == typeSelected &&
        length == watch("length")
      ) {
        selectedProduct.push({ name, type, length, quantity });
      }
    });
    if (!selectedProduct.length > 0) {
      return toast({
        description: "We don't have that length",
        className: "dark:border-0",
      });
    }
    console.log(selectedProduct);
    if (watch("quantity") > selectedProduct[0].quantity) {
      return toast({
        description: "We don't have that amount of quantity",
        className: "dark:border-0",
      });
    }
    setIsAddOpen(false);
    const name = nameSelected;
    const type = typeSelected;
    const length = watch("length");
    const quantitySelected = watch("quantity");
    setInvoiceItem((prev) => [
      ...prev,
      {
        name,
        length,
        price: Number(rupiah),
        quantity: Number(quantitySelected),
        type,
      },
    ]);
    setTotalPrice((prev) => prev + Number(rupiah) * Number(quantitySelected));

    setRupiah("");
  };

  const [rupiah, setRupiah] = useState("");
  const handleCostChange = (e: any) => {
    const { value, inputType } = e.target;
    const formattedValue = value.replace(/[^0-9]/g, "");
    if (inputType === "deleteContentBackward") {
      setRupiah(formattedValue);
    } else {
      if (formattedValue.length == 10) {
        return;
      }
      if (!isNaN(formattedValue)) {
        setRupiah(formattedValue);
      }
    }
  };

  const isMobile = useMediaQuery(mobileQuery);
  const isMedium = useMediaQuery(mediumQuery);
  const isLarge = useMediaQuery(largeQuery);

  type ProductData = {
    name: string;
    type: string;
    length: number;
    quantity: number;
  };
  const { data: productData } = useQuery({
    queryKey: ["stock"],
    queryFn: async (): Promise<ProductData[]> => {
      const { data } = await axiosInstance.get("/items/");
      return data;
    },

    keepPreviousData: true,
  });
  const [name, setName] = useState<Set<string> | unknown>([]);
  const [nameSelected, setNameSelected] = useState("");
  const [type, setType] = useState<Set<string> | unknown>([]);
  const [typeSelected, setTypeSelected] = useState("");
  useEffect(() => {
    const nameUnique = new Set();
    productData?.map(({ name }) => {
      if (!nameUnique.has(name)) {
        nameUnique.add(name);
      }
    });
    setName(Array.from(nameUnique).map((name) => name));
  }, [productData]);

  const handleNameChange = (e) => {
    const nameSelected = e.target.innerText;
    const typeUnique = new Set();
    productData?.map(({ name, type, length, quantity }) => {
      if (name == nameSelected && !typeUnique.has(type)) {
        typeUnique.add(type);
      }
    });
    setNameSelected(nameSelected);
    setType(Array.from(typeUnique).map((type) => type));
  };
  const handleTypeChange = (e) => {
    const typeSelected = e.target.innerText;

    setTypeSelected(typeSelected);
  };

  const { watch, register } = useForm();

  return (
    <>
      <div className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-gray-300/60 text-[#333333] ">
        {/* Modal card  */}
        <div className="relative flex rounded-md bg-[#F5F5F5] px-5 py-3 ring-2 ring-blue-500 dark:bg-[#F0F0F0] dark:ring-blue-700 md:px-6 md:py-6 lg:px-20 lg:py-20">
          <button
            onClick={() => {
              setRupiah("");
              setIsAddOpen(false);
            }}
            className="absolute right-0 top-0"
          >
            <CloseIcon
              fontSize={isLarge ? "large" : isMedium ? "medium" : "small"}
            />
          </button>

          <form
            onSubmit={handleAddSubmit}
            className="flex flex-col items-center justify-center gap-2 self-stretch px-3"
          >
            <label className=" mb-2 text-xs font-semibold sm:text-sm md:text-base lg:text-lg xl:text-xl">
              Add Product to Invoice
            </label>

            <Autocomplete
              className="border-gray-400 text-xs dark:border-gray-600  sm:text-sm md:text-base lg:text-lg xl:text-xl"
              disablePortal
              clearIcon={null}
              onChange={handleNameChange}
              autoSelect={true}
              options={name}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  size={isMobile ? "small" : "medium"}
                  className="text-xs capitalize  sm:text-sm md:text-base lg:text-lg xl:text-xl"
                  label="name"
                />
              )}
            />

            <Autocomplete
              className="border-gray-400 text-xs dark:border-gray-600 sm:text-sm md:text-base lg:text-lg xl:text-xl"
              disablePortal
              onChange={handleTypeChange}
              options={type}
              clearIcon={null}
              autoSelect={true}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  size={isMobile ? "small" : "medium"}
                  className="text-xs capitalize  sm:text-sm md:text-base lg:text-lg xl:text-xl"
                  label="type"
                />
              )}
            />

            <TextField
              type="number"
              label="Length(m)"
              step={0.5}
              fullWidth
              autoComplete="off"
              size={isMobile ? "small" : "medium"}
              required
              className="border-gray-400 text-xs capitalize dark:border-gray-600  sm:text-sm md:text-base lg:text-lg xl:text-xl"
              {...register("length", { required: true })}
            />
            <TextField
              fullWidth
              required
              size={isMobile ? "small" : "medium"}
              onChange={handleCostChange}
              autoComplete="off"
              name="cost"
              type="text"
              value={"Rp " + toRupiahFormat(rupiah)}
              className="border-gray-400 bg-transparent text-xs dark:border-gray-600 sm:text-sm md:text-base lg:text-lg xl:text-xl"
            />
            <TextField
              fullWidth
              required
              type="number"
              autoComplete="off"
              size={isMobile ? "small" : "medium"}
              step={1}
              className="border-gray-400  text-xs capitalize dark:border-gray-600  sm:text-sm md:text-base lg:text-lg xl:text-xl"
              label=" quantity"
              {...register("quantity", { required: true })}
            />
            <Button
              type="submit"
              variant="outline"
              size={isLarge ? "lg" : isMedium ? "default" : "sm"}
              className="mt-2 border-black bg-slate-100 px-6 text-xs dark:bg-black dark:text-white sm:text-sm md:text-base lg:text-lg xl:text-xl"
            >
              ADD
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InvoiceAddProductForm;
