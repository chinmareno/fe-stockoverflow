import StockDataGrid from "./StockDataGrid";
import mockData from "@/../db/alderon.json";

const AlderonStock = () => {
  const { alderon } = mockData;
  return (
    <div>
      <StockDataGrid data={alderon} />
    </div>
  );
};

export default AlderonStock;
