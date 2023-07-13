import { Input } from "@/components/ui/input";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@mui/material";
import { largeQuery, mediumQuery } from "@/utils/mediaQuery";
import useDataStockForm from "@/store/useDataStockForm";
import { FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { ICellSelected } from "./DataGridStock";
import useIsModalStockOpenStore from "../../../store/useIsModalStockOpenStore";
import { useToast } from "@/components/ui/use-toast";
import toRupiahFormat from "@/utils/toRupiahFormat";
import useStockHistoryStore from "@/store/useStockHistoryStore";
const EditModalStock = ({
  isCellSelected,
  setIsCellSelected,
}: ICellSelected) => {
  const { isEditModalStockOpenStore, setIsEditModalStockOpenStore } =
    useIsModalStockOpenStore();
  const isMedium = useMediaQuery(mediumQuery);
  const isLarge = useMediaQuery(largeQuery);

  const handleCloseEditClick = () => {
    setIsEditModalStockOpenStore(false);
  };
  const { toast } = useToast();

  //Edit stock quantity
  const cache = useQueryClient();
  const { name, type, length, quantity, date, cost } = useDataStockForm();
  const { setAction } = useStockHistoryStore();

  const mutation = useMutation({
    mutationFn: async (newquantity: number) => {
      try {
        const dateFormatted = new Date(date);
        const isoDate = dateFormatted.toISOString();

        await axiosInstance.patch("/items/", {
          name,
          type,
          length,
          quantity: newquantity,
          date: isoDate,
          cost,
          editStock: true,
        });
        cache.invalidateQueries(["stock"]);
        toast({
          description: "Product quantity changed",
          duration: 3000,
        });
        setAction({
          name,
          cost,
          date: isoDate,
          length,
          quantity,
          type,
          actionName: "edit",
        });
      } catch (error) {
        toast({
          duration: 5000,
          variant: "destructive",
          description: "Failed to update product quantity",
        });
      }
    },
  });
  const handleEditSubmit = (e: any) => {
    setIsCellSelected(false);
    setIsEditModalStockOpenStore(false);
    const newQuantity = e.target.elements.quantity.value;
    mutation.mutate(Number(newQuantity));
  };
  const toLocaleDate = (date: any) => {
    const det = new Date(date);
    const localDateString = det.toLocaleDateString();
    return localDateString;
  };

  return (
    <>
      {isEditModalStockOpenStore && (
        <div className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-gray-300/60 text-[#333333] dark:text-white">
          {/* Modal card  */}
          <div className="relative flex rounded-md bg-[#F5F5F5] px-3 py-3 ring-2 ring-blue-500 dark:bg-black dark:ring-blue-700 md:px-6 md:py-6 lg:px-20 lg:py-20">
            <button
              onClick={handleCloseEditClick}
              className="absolute right-0 top-0"
            >
              <CloseIcon
                fontSize={isLarge ? "large" : isMedium ? "medium" : "small"}
              />
            </button>
            {/* left side  */}
            <div className="flex flex-col gap-1">
              <h3 className=" mb-1 text-sm font-semibold sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                Details
              </h3>
              <div className="text-xs  sm:text-sm md:text-base lg:text-lg xl:text-xl">
                <strong>Name:</strong> {name}
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                <strong>Type:</strong> {type}
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                <strong>Length:</strong> {length}m
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                <strong>Purchase price/m:</strong> Rp{" "}
                {toRupiahFormat(cost.toString())}
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                <strong>Purchase date:</strong> {toLocaleDate(date)}
              </div>
            </div>
            {/* right side  */}
            <form
              onSubmit={handleEditSubmit}
              className="flex flex-col items-center justify-center self-stretch px-3"
            >
              <div className="mb-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                <strong className="font-semibold">Current stock: </strong>
                {quantity}pcs
              </div>
              <Input
                autoFocus
                required
                autoComplete="off"
                name="quantity"
                placeholder="Edit your stock here"
                type="number"
                className="border-gray-400 pl-2 pr-0 text-xs dark:border-gray-600 sm:text-sm md:text-base lg:text-lg xl:text-xl"
              />
              <Button
                type="submit"
                variant="outline"
                size={isLarge ? "lg" : isMedium ? "default" : "sm"}
                className="mt-2 px-6 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
              >
                Save
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModalStock;
