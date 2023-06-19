import StockDataGrid from "../../components/StockDataGrid";
import loader from "../../utils/loader";
import { useLoaderData } from "react-router";

export const steelLoader = async () => loader({ port: 4000, slug: "steel" });

const SteelStock = () => {
  const data = useLoaderData();
  return (
    <div>
      <StockDataGrid data={data} />
      <div>{data.map((color) => color.color)}</div>
    </div>
  );
};

export default SteelStock;
