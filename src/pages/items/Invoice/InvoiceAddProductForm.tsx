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
import useStockHistoryStore from "@/store/useStockHistoryStore";

const InvoiceAddProductForm = () => {
  const { toast } = useToast();
  const { isAddModalStockOpenStore, setIsAddModalStockOpenStore } =
    useIsModalStockOpenStore();

  const handleCloseAddClick = () => {
    setIsAddModalStockOpenStore(false);
  };

  //Add stock quantity
  const { setAction } = useStockHistoryStore();

  const cache = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      name,
      type,
      length,
      quantity,
      cost,
    }: {
      name: string;
      type: string;
      length: number;
      quantity: number;
      cost: number;
    }) => {
      try {
        const currentDate = new Date();
        const utcOffsetMinutes = 7 * 60;
        currentDate.setMinutes(currentDate.getMinutes() + utcOffsetMinutes);

        await axiosInstance.post("/items/", {
          name,
          type,
          length,
          quantity,
          cost,
          date: currentDate.toISOString(),
        });
        toast({
          description: "New product added",
          duration: 3000,
        });

        cache.invalidateQueries(["stock"]);
      } catch (error) {
        toast({
          variant: "destructive",
          duration: 5000,
          description: "Failed add new product",
        });
      }
    },
  });

  const handleAddSubmit = (e: any) => {
    e.preventDefault();
    if (!rupiah) {
      toast({
        duration: 5000,
        description: "Don't forget to enter the price :)",
      });
      return;
    }
    setIsAddModalStockOpenStore(false);
    const name = e.target.elements.name.value;
    const type = e.target.elements.type.value;
    const length = e.target.elements.lengths.value;
    const quantity = e.target.elements.quantity.value;
    mutation.mutate({
      name,
      type,
      length: parseInt(length),
      quantity: parseInt(quantity),
      cost: parseInt(rupiah),
    });

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
  const [data, setData] = useState<ProductData[] | undefined>();
  const [name, setName] = useState<Set<string> | unknown>([]);
  const [nameSelected, setNameSelected] = useState("");
  const [type, setType] = useState<Set<string> | unknown>([]);
  const [typeSelected, setTypeSelected] = useState("");
  const [length, setLength] = useState<string[]>([]);
  const [quantity, setQuantity] = useState([]);
  useEffect(() => {
    setData(productData);
    const nameUnique = new Set();
    productData?.map(({ name }) => {
      if (!nameUnique.has(name)) {
        nameUnique.add(name);
      }
    });
    setName(Array.from(nameUnique).map((name) => name));
  }, [productData]);

  const handleNameChange = (e) => {
    console.log("object");
    const nameSelected = e.target.innerText;
    const typeUnique = new Set();
    data?.map(({ name, type }) => {
      if (name == nameSelected && !typeUnique.has(type)) {
        typeUnique.add(type);
      }
    });
    setNameSelected(nameSelected);
    setType(Array.from(typeUnique).map((type) => type));
  };
  const handleTypeChange = (e) => {
    const typeSelected = e.target.innerText;
    const lengthUnique = new Set();
    data?.map(({ name, type, length }) => {
      if (
        name == nameSelected &&
        type == typeSelected &&
        !lengthUnique.has(length)
      ) {
        lengthUnique.add(length);
      }
    });
    setTypeSelected(typeSelected);
    setLength(Array.from(lengthUnique).map((length) => String(length)));
  };
  const handleLengthChange = (e) => {
    const lengthSelected = e.target.innerText;
    const { quantity: quantityRemain } = data?.find(
      ({ name, type, length, quantity }) => {
        if (
          name == nameSelected &&
          type == typeSelected &&
          length == lengthSelected
        ) {
          return true;
        }
      }
    );
    console.log(data);
    console.log(nameSelected + typeSelected + lengthSelected);
    const quantityCanBeSelect = [];
    for (let i = 0; i < quantityRemain; i++) {
      quantityCanBeSelect.push(String(i + 1));
    }
    setQuantity(quantityCanBeSelect);
  };
  return (
    <>
      (
      <div className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-gray-300/60 text-[#333333] dark:text-white">
        {/* Modal card  */}
        <div className="relative flex rounded-md bg-[#F5F5F5] px-5 py-3 ring-2 ring-blue-500 dark:bg-black dark:ring-blue-700 md:px-6 md:py-6 lg:px-20 lg:py-20">
          <button
            onClick={() => {
              handleCloseAddClick();
              setRupiah("");
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
              className="border-gray-400 text-xs dark:border-gray-600 sm:text-sm md:text-base lg:text-lg xl:text-xl"
              disablePortal
              clearIcon={null}
              onChange={handleNameChange}
              autoSelect={true}
              options={name}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
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
                  size={isMobile ? "small" : "medium"}
                  className="text-xs capitalize  sm:text-sm md:text-base lg:text-lg xl:text-xl"
                  label="type"
                />
              )}
            />

            <Autocomplete
              className="border-gray-400  text-xs dark:border-gray-600 sm:text-sm md:text-base lg:text-lg xl:text-xl"
              disablePortal
              onChange={handleLengthChange}
              autoSelect={true}
              options={length}
              fullWidth
              clearIcon={null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="text-xs capitalize  sm:text-sm md:text-base lg:text-lg xl:text-xl"
                  size={isMobile ? "small" : "medium"}
                  label=" length(m)"
                />
              )}
            />
            <Input
              required
              size={20}
              onChange={handleCostChange}
              autoComplete="off"
              name="cost"
              type="text"
              value={"Rp " + toRupiahFormat(rupiah)}
              className="border-gray-400 pl-2 pr-0 text-xs dark:border-gray-600 sm:text-sm md:text-base lg:text-lg xl:text-xl"
            />
            <Autocomplete
              autoSelect={true}
              className="border-gray-400 text-xs dark:border-gray-600 sm:text-sm md:text-base lg:text-lg xl:text-xl"
              disablePortal
              clearIcon={null}
              options={quantity}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="text-xs capitalize  sm:text-sm md:text-base lg:text-lg xl:text-xl"
                  size={isMobile ? "small" : "medium"}
                  label=" quantity(pcs)"
                />
              )}
            />
            <Button
              type="submit"
              variant="outline"
              size={isLarge ? "lg" : isMedium ? "default" : "sm"}
              className="mt-2 px-6 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
            >
              Add
            </Button>
          </form>
        </div>
      </div>
      )
    </>
  );
};

export default InvoiceAddProductForm;
