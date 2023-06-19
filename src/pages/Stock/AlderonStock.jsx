import loader from "../../utils/loader";
import StockDataGrid from "../../components/StockDataGrid";

export const alderonLoader = async () => loader({ port: 2000, slug: "items" });

const AlderonStock = () => {
  return (
    <div>
      <StockDataGrid />
    </div>
  );
};

export default AlderonStock;
