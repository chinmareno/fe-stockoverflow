import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { useQuery } from "@tanstack/react-query";
import axiosDummy from "@/utils/axiosDummy";
import dataJson from "../../../db/alderon.json";
import flatData from "./flatData";
import useThemeStoreItems from "@/store/useThemeStoreitems";
import { useMediaQuery } from "@mui/material";
import { Button } from "../ui/button";
const DataGridCustom = () => {
  const { theme } = useThemeStoreItems();

  const isMobile = useMediaQuery("(max-width:767px)");

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  const [isCellSelected, setIsCellSelected] = useState();

  // Each Column Definition results in one Column.
  const cellClass = () => {
    if (isMobile) return "text-xs capitalize";
  };
  const [columnDefs, setColumnDefs] = useState([
    { field: "name", filter: true, width: "85vw", cellClass: cellClass() },
    { field: "color", width: "80vw", cellClass: cellClass() },
    {
      field: "length",
      width: "85vw",
      cellClass: cellClass() + " after:content-['m'] ",
    },
    {
      field: "quantity",
      cellClass: cellClass() + " after:content-['pcs'] ",
      cellClassRules: {
        "bg-red-500": "x<3",
        "bg-yellow-500": "x<5",
        "bg-green-500": "x>=5",
      },
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClicked", event);
    setIsCellSelected(true);
  }, []);

  // Example load data from server
  const { data, isSuccess } = useQuery({
    queryKey: ["stock"],
    queryFn: () => axiosDummy.get("/comments"),
    keepPreviousData: true,
  });
  useEffect(() => {
    const y = flatData(dataJson);
    setRowData(y);
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    const selectedRow = gridRef.current.api.getSelectedNodes();
    console.log(selectedRow);
  }, []);
  return (
    <div className=" flex flex-col items-center">
      {/* Example using Grid's API */}
      {isCellSelected && (
        <Button
          className="ml-auto mr-2 rounded-md bg-blue-500/60 text-green-800"
          onClick={buttonListener}
          variant="outline"
        >
          Edit
        </Button>
      )}

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div
        className={
          theme == "light" ? "ag-theme-alpine" : "ag-theme-alpine-dark"
        }
        style={
          isMobile
            ? { width: "100vw", height: "89vh" }
            : { width: 100, height: 700 }
        }
      >
        <AgGridReact
          className="font-body text-[11px]"
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          rowSelection="multiple" // Options - allows click selection of rows
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </div>
  );
};

export default DataGridCustom;
