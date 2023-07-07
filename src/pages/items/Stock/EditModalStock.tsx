import { Input } from "@/components/ui/input";
import CloseIcon from "@mui/icons-material/Close";
import useIsEditModalStockOpenStore from "../../../store/useIsEditModalStockOpenStore";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@mui/material";
import { largeQuery, mediumQuery } from "@/utils/mediaQuery";
const EditModalStock = () => {
  const { isEditModalStockOpenStore, setIsEditModalStockOpenStore } =
    useIsEditModalStockOpenStore();
  const isMedium = useMediaQuery(mediumQuery);
  const isLarge = useMediaQuery(largeQuery);

  const handleCloseEditClick = () => {
    setIsEditModalStockOpenStore(false);
  };
  return (
    <>
      {isEditModalStockOpenStore && (
        <div className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-gray-300/60 text-[#333333] dark:text-white">
          {/* Modal card  */}
          <div className="relative flex rounded-md bg-[#F5F5F5] px-3 py-3 dark:bg-black md:px-6 md:py-6 lg:px-9 lg:py-9">
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
                <strong>Name:</strong> Steel
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                <strong>Type:</strong> White
              </div>
              <div className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                <strong>Length:</strong> 8m
              </div>
            </div>
            {/* right side  */}
            <form className="flex flex-col items-center justify-center self-stretch px-3">
              <div className="mb-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
                <strong className="font-semibold">Current stock: </strong>3pcs
              </div>
              <Input
                placeholder="Edit your stock here"
                type="number"
                className="border-gray-400 pl-2 pr-0 text-xs dark:border-gray-600 sm:text-sm md:text-base lg:text-lg xl:text-xl"
              />
              <Button
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
