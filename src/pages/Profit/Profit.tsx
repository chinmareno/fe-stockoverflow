import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import toRupiahFormat from "@/utils/toRupiahFormat";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import RupiahInput from "@/components/Input/RupiahInput";
import ProfitSkeleton from "./ProfitSkeleton";

type ProfitItem = {
  profitId: string;
  name: string;
  type: string;
  totalProfit: number;
  id: string;
};
export interface IProfit {
  profitItem: ProfitItem[];
}
const Profit = () => {
  const [date, setDate] = useState(new Date());
  const { data: profit, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get<Promise<IProfit>>(
        "/profit/" + format(date, "MMMM yyyy")
      );
      return data;
    },
    queryKey: ["profit", format(date, "MMMM yyyy")],
  });

  const handleDateChange = (e) => {
    const date = e.target.valueAsDate;
    setDate(date);
  };

  const [selectedName, setSelectedName] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedType, setSelectedType] = useState<string>();
  const [selectedTotalProfit, setSelectedTotalProfit] = useState<number>();

  const { toast } = useToast();

  const handleProfitClick = ({
    date,
    profitItem,
  }: {
    date: string;
    profitItem: ProfitItem;
  }) => {
    setIsEditOpen(true);
    setSelectedDate(date);
    setSelectedName(profitItem.name);
    setSelectedType(profitItem.type);
    setSelectedTotalProfit(profitItem.totalProfit);
  };

  const [isEditOpen, setIsEditOpen] = useState(false);
  const cache = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.patch("/profit/", {
        date: selectedDate,
        profitItem: {
          name: selectedName,
          type: selectedType,
          totalProfit: selectedTotalProfit,
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Total profit changed successfully",
        duration: 3000,
        className: "border-green-500 dark:border-green-700 border-l-8",
      });
      cache.invalidateQueries(["profit", format(date, "MMMM yyyy")]);
      setIsEditOpen(false);
    },
    onError: () =>
      toast({
        variant: "destructive",
        title: "Uh oh something wrong!",
        description: "Please try again",
      }),
  });

  const handleConfirmClick = () => {
    mutation.mutate();
  };

  const handleRupiahInput = (e: number) => {
    if (e > 0) {
      setSelectedTotalProfit(e);
    }
  };
  const [monthProfit, setMonthProfit] = useState(0);
  useEffect(() => {
    if (profit)
      setMonthProfit(
        profit?.profitItem.reduce((acc, curr) => acc + curr.totalProfit, 0)
      );
    else {
      setMonthProfit(0);
    }
  }, [profit]);

  console.log(profit?.profitItem);
  return (
    <>
      {isEditOpen && (
        <div className="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-gray-300/60 text-[#333333] dark:text-white">
          <div className="relative flex rounded-md bg-[#F5F5F5] px-5 py-3 ring-2 ring-blue-500 dark:bg-black dark:ring-blue-700 md:px-6 md:py-6 lg:px-20 lg:py-20">
            <button
              onClick={() => {
                setIsEditOpen(false);
              }}
              className="absolute right-1 top-1"
            >
              <CloseIcon />
            </button>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Product Name : {selectedName}</label>
              <label htmlFor="type">Product Type : {selectedType}</label>
              <div className="flex">
                <label htmlFor="totalProfit">Total Profit :</label>
                <RupiahInput
                  onChange={handleRupiahInput}
                  value={selectedTotalProfit}
                />
              </div>
              <Button className="mt-4" onClick={handleConfirmClick}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-3 flex w-full flex-col   items-center gap-2">
        <input
          type="month"
          className="rounded-md border  bg-transparent  p-2 md:text-lg lg:text-2xl"
          value={format(date, "yyyy-MM")}
          min="2023-07"
          onChange={handleDateChange}
        />
        <label className="font-semibold md:text-lg lg:text-2xl">
          Total Month Profit : Rp. {toRupiahFormat(monthProfit)}
        </label>
        {isLoading && <ProfitSkeleton />}

        {profit ? (
          <div className="mt-4 flex w-full flex-col divide-y-2 divide-gray-300 border-b-2 border-b-gray-300">
            <div className="mb-1 flex text-xs font-semibold uppercase md:text-base lg:text-xl">
              <div className="w-1/3">name</div>
              <div className="w-1/3">type</div>
              <div className="w-1/3">Total profit</div>
            </div>
            {isLoading && <ProfitSkeleton />}
            {profit?.profitItem.map(
              ({ name, type, totalProfit, id, profitId }) => {
                return (
                  <button
                    key={id}
                    className="flex pt-3 text-start text-xs  hover:bg-slate-200 dark:hover:bg-neutral-800 md:text-base lg:text-xl"
                    onClick={() =>
                      handleProfitClick({
                        date: format(date, "MMMM yyyy"),
                        profitItem: { name, type, totalProfit, id, profitId },
                      })
                    }
                  >
                    <div className="w-1/3">{name}</div>
                    <div className="w-1/3">{type}</div>
                    <div className="w-1/3">
                      Rp. {toRupiahFormat(totalProfit)}
                    </div>
                  </button>
                );
              }
            )}
          </div>
        ) : (
          !isLoading && (
            <div className="md:text-lg lg:text-2xl">
              No Profit At This Month
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Profit;
