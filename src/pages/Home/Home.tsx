import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { IProfit } from "../Profit/Profit";
import { useEffect, useState } from "react";
import toRupiahFormat from "@/utils/toRupiahFormat";
import HomeSkeleton from "./HomeSkeleton";

const Home = () => {
  const date = new Date();
  const { data: profit, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axiosInstance.get<Promise<IProfit>>(
        "/profit/" + format(date, "MMMM yyyy")
      );
      return data;
    },
    queryKey: ["profit", format(date, "MMMM yyyy")],
  });
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

  return (
    <div className="mt-2 flex flex-col text-lg md:text-xl lg:text-2xl">
      <p>This month profit :Rp. {toRupiahFormat(monthProfit)}</p>
      {isLoading && <HomeSkeleton />}
    </div>
  );
};

export default Home;
