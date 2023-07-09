import { Input } from "@/components/ui/input";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@mui/material";
import { largeQuery, mediumQuery } from "@/utils/mediaQuery";
import { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { ICellSelected } from "./DataGridStock";
import useIsModalStockOpenStore from "@/store/useIsModalStockOpenStore";
import { useToast } from "@/components/ui/use-toast";

const AddModalStock = ({
  isCellSelected,
  setIsCellSelected,
}: ICellSelected) => {
  const { toast } = useToast();
  const { isAddModalStockOpenStore, setIsAddModalStockOpenStore } =
    useIsModalStockOpenStore();
  const isMedium = useMediaQuery(mediumQuery);
  const isLarge = useMediaQuery(largeQuery);

  const handleCloseAddClick = () => {
    setIsAddModalStockOpenStore(false);
  };

  //Add stock quantity
  const cache = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      name,
      type,
      length,
      quantity,
    }: {
      name: string;
      type: string;
      length: number;
      quantity: number;
    }) => {
      try {
        await axiosInstance.post("/items/", {
          name,
          type,
          length,
          quantity,
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
    setIsCellSelected(false);
    setIsAddModalStockOpenStore(false);
    const name = e.target.elements.name.value;
    const type = e.target.elements.type.value;
    const length = e.target.elements.lengths.value;
    const quantity = e.target.elements.quantity.value;
    console.log(quantity + length);
    mutation.mutate({
      name,
      type,
      length: parseInt(length),
      quantity: parseInt(quantity),
    });
  };

  return (
    <>
      {isAddModalStockOpenStore && (
        <div className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-gray-300/60 text-[#333333] dark:text-white">
          {/* Modal card  */}
          <div className="relative flex rounded-md bg-[#F5F5F5] px-5 py-3 ring-2 ring-blue-500 dark:bg-black dark:ring-blue-700 md:px-6 md:py-6 lg:px-20 lg:py-20">
            <button
              onClick={handleCloseAddClick}
              className="absolute right-0 top-0"
            >
              <CloseIcon
                fontSize={isLarge ? "large" : isMedium ? "medium" : "small"}
              />
            </button>

            <form
              onSubmit={handleAddSubmit}
              className="flex flex-col items-center justify-center self-stretch px-3"
            >
              <label className=" mb-2 text-xs font-semibold sm:text-sm md:text-base lg:text-lg xl:text-xl">
                New Product
              </label>
              <label className="text-xs capitalize  sm:text-sm md:text-base lg:text-lg xl:text-xl">
                name:
              </label>
              <Input
                autoFocus
                required
                autoComplete="off"
                name="name"
                placeholder="Type here"
                type="text"
                className="border-gray-400 pl-2 pr-0 text-xs dark:border-gray-600 sm:text-sm md:text-base lg:text-lg xl:text-xl"
              />
              <label className="text-xs capitalize  sm:text-sm md:text-base lg:text-lg xl:text-xl">
                type:
              </label>
              <Input
                required
                autoComplete="off"
                name="type"
                placeholder="Type here"
                type="text"
                className="border-gray-400 pl-2 pr-0 text-xs dark:border-gray-600 sm:text-sm md:text-base lg:text-lg xl:text-xl"
              />
              <label className="text-xs capitalize  sm:text-sm md:text-base lg:text-lg xl:text-xl">
                length (m):
              </label>
              <Input
                required
                autoComplete="off"
                name="lengths"
                placeholder="Type here"
                type="number"
                className="border-gray-400 pl-2 pr-0 text-xs dark:border-gray-600 sm:text-sm md:text-base lg:text-lg xl:text-xl"
              />
              <label className="text-xs capitalize sm:text-sm md:text-base lg:text-lg xl:text-xl">
                quantity:
              </label>
              <Input
                required
                autoComplete="off"
                name="quantity"
                placeholder="Type here"
                type="number"
                className="border-gray-400 pl-2 pr-0 text-xs dark:border-gray-600 sm:text-sm md:text-base lg:text-lg xl:text-xl"
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
      )}
    </>
  );
};

export default AddModalStock;
