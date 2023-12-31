import { Input } from "@/components/ui/input";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@mui/material";
import { largeQuery, mediumQuery } from "@/utils/mediaQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { ICellSelected } from "./DataGridStock";
import useIsModalStockOpenStore from "@/store/useIsModalStockOpenStore";
import { useToast } from "@/components/ui/use-toast";
import useDataStockForm from "@/store/useDataStockForm";
import toRupiahFormat from "@/utils/toRupiahFormat";
import useStockHistoryStore from "@/store/useStockHistoryStore";

const DeleteModalStock = ({
  isCellSelected,
  setIsCellSelected,
}: ICellSelected) => {
  const { toast } = useToast();
  const { isDeleteModalStockOpenStore, setIsDeleteModalStockOpenStore } =
    useIsModalStockOpenStore();
  const isMedium = useMediaQuery(mediumQuery);
  const isLarge = useMediaQuery(largeQuery);

  const handleCloseClick = () => {
    setIsDeleteModalStockOpenStore(false);
  };

  const { name, type, length, quantity, cost } = useDataStockForm();
  const cache = useQueryClient();
  const { setAction } = useStockHistoryStore();

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        await axiosInstance.delete("/items/", {
          params: { name, type, length, cost },
        });
        toast({
          description: "Product deleted",
          duration: 3000,
          title: "Success",
          className: "border-green-500 dark:border-green-700 border-l-8",
        });
        cache.invalidateQueries(["stock"]);
        setAction({
          name,
          cost,
          length,
          quantity,
          type,
          actionName: "delete",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          duration: 5000,
          description: "Failed deleting product",
          className: "border-0",
        });
      }
    },
  });
  const handleDeleteClick = (e: any) => {
    setIsCellSelected(false);
    setIsDeleteModalStockOpenStore(false);
    mutation.mutate();
  };

  return (
    <>
      {isDeleteModalStockOpenStore && (
        <div className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-gray-300/60 text-[#333333] dark:text-white">
          {/* Modal card  */}
          <div className="relative flex flex-col rounded-md bg-[#F5F5F5] px-5 py-3 ring-2 ring-blue-500 dark:bg-black dark:ring-blue-700 md:px-6 md:py-6 lg:px-20 lg:py-20">
            <button
              onClick={handleCloseClick}
              className="absolute right-0 top-0"
            >
              <CloseIcon
                fontSize={isLarge ? "large" : isMedium ? "medium" : "small"}
              />
            </button>
            <label className=" mb-2 text-xs font-semibold sm:text-sm md:text-base lg:text-lg xl:text-xl">
              Are you sure want to delete this product?
            </label>
            <label className="text-xs capitalize  sm:text-sm md:text-base lg:text-lg xl:text-xl">
              name: {name}
            </label>
            <label className="text-xs capitalize  sm:text-sm md:text-base lg:text-lg xl:text-xl">
              type: {type}
            </label>
            <label className="text-xs capitalize  sm:text-sm md:text-base lg:text-lg xl:text-xl">
              length: {length}m
            </label>
            <label className="text-xs capitalize sm:text-sm md:text-base lg:text-lg xl:text-xl">
              quantity: {quantity}pcs
            </label>
            <label className="text-xs capitalize sm:text-sm md:text-base lg:text-lg xl:text-xl">
              purchase price/m: Rp{toRupiahFormat(Number(cost))}
            </label>

            <Button
              onClick={handleDeleteClick}
              variant="outline"
              size={isLarge ? "lg" : isMedium ? "default" : "sm"}
              className="mt-2 px-6 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModalStock;
