import { DataGrid } from "@mui/x-data-grid";
import { useLoaderData, useNavigation } from "react-router";

const StockDataGrid = (data) => {
  const nav = useNavigation();

  const columns = [
    { field: "color", headerName: "Color", width: 120 },
    { field: "length", headerName: "Length", width: 120 },
    { field: "quantity", headerName: "Stock", width: 120 },
  ];
  let id = 0;
  const rows = [];

  data.forEach((clor) => {
    clor.detail.forEach((steel) => {
      id++;
      rows.push({
        id: id,
        color: clor.color,
        length: steel.length,
        quantity: steel.quantity,
      });
    });
  });
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        loading={nav.state === "loading" ? true : false}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default StockDataGrid;
