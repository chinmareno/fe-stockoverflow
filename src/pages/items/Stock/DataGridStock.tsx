import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { useQuery } from "@tanstack/react-query";
import useThemeStoreItems from "@/store/useThemeStoreitems";
import { useMediaQuery } from "@mui/material";
import { Button } from "../../../components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { largeQuery, mediumQuery, mobileQuery } from "@/utils/mediaQuery";
import { CellClickedEvent, GridOptions } from "ag-grid-community";
import useIsEditModalStockOpenStore from "@/store/useIsModalStockOpenStore";
import useDataStockForm from "@/store/useDataStockForm";
import useIsAccountOpenStore from "@/store/useIsAccountOpenStore";
import toLocaleDate from "@/utils/toLocaleDate";
import toRupiahFormat from "@/utils/toRupiahFormat";

export interface ICellSelected {
  isCellSelected: boolean;
  setIsCellSelected: (isCellSelected: boolean) => void;
}
const DataGridStock = ({
  isCellSelected,
  setIsCellSelected,
}: ICellSelected) => {
  //Theme state,first use server state,remain use client server(but still update to the server)
  const { data: theme } = useQuery({
    queryKey: ["theme"],
    queryFn: async () => {
      const { data }: any = await axiosInstance.get("/user/theme");
      return data.theme;
    },
    placeholderData: "light",
  });
  const { theme: themeStore } = useThemeStoreItems();

  //Media query utils
  const isTooSmall = useMediaQuery("(max-width:390px)");
  const isMobile = useMediaQuery(mobileQuery);
  const isMedium = useMediaQuery(mediumQuery);
  const isLarge = useMediaQuery(largeQuery);

  //Server state management
  const [rowData, setRowData] = useState();
  const { data, isSuccess } = useQuery({
    queryKey: ["stock"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/items/");
      return data;
    },
    keepPreviousData: true,
  });
  useEffect(() => {
    setRowData(data);
  }, [data]);

  const gridRef = useRef();

  //Column Data Cell Configuration (not the header)
  const headerClass = () => {
    if (isMobile) {
      return "px-0 mx-auto";
    }
    if (isMedium) {
      return "px-0 mx-auto";
    }
    if (isLarge) {
      return "px-0 mx-auto";
    }
  };
  const cellClass = () => {
    if (isMobile) {
      return "text-xs capitalize px-0 text-center";
    }
    if (isMedium) {
      return "text-lg capitalize px-0 text-center";
    }
    if (isLarge) {
      return "text-xl capitalize px-0 text-center";
    }
  };

  const toLocaleDate = (date: any) => {
    const det = new Date(date.value);
    const localDateString = det.toLocaleDateString();
    if (isTooSmall) {
      const dateParts = localDateString.split("/"); // Split the string into parts

      // Create a new Date object with the provided date parts
      const date = new Date(`${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`);

      // Get the year, month, and day from the date object
      const year = date.getFullYear().toString().slice(-2); // Extract the last two digits of the year
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero if necessary
      const day = date.getDate().toString().padStart(2, "0"); // Add leading zero if necessary

      // Create the updated date string with the desired format
      const updatedDateString = `${day}/${month}/${year}`;
      return updatedDateString;
    }
    return localDateString;
  };
  const appendRpIfNotSmall = () => {
    if (!isTooSmall) {
      return " before:content-['Rp.'] ";
    }
    return "";
  };
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "name",
      filter: true,
      headerClass: headerClass() + " ml-2",
      cellClass: cellClass(),
    },
    { field: "type", cellClass: cellClass(), headerClass: headerClass() },
    {
      field: "length",
      headerClass: headerClass(),
      cellClass: cellClass() + " after:content-['m']",
    },
    {
      field: "quantity",
      headerName: "Stock",
      headerClass: headerClass(),
      cellClass: cellClass(),
    },
    {
      field: "cost",
      headerName: "Cost/m",
      cellClass: cellClass() + appendRpIfNotSmall(),
      headerClass: headerClass(),
      valueFormatter: ({ value }: any) => toRupiahFormat(value),
    },
    {
      field: "date",
      cellClass: cellClass(),
      headerClass: headerClass(),
      valueFormatter: toLocaleDate,
    },
  ]);

  // Default config for all column

  const defaultColDef = useMemo(
    () => ({
      suppressMovable: true,
      sortable: true,
    }),
    []
  );

  //Global state for form
  const { setName, setLength, setType, setQuantity, setDate, setCost } =
    useDataStockForm();
  const cellClickedListener = useCallback((e: CellClickedEvent) => {
    console.log("cellClicked", e);
    setIsProfileOpen(false);
    setIsCellSelected(true);
    setName(e.data.name);
    setType(e.data.type);
    setLength(e.data.length);
    setQuantity(e.data.quantity);
    setDate(e.data.date);
    setCost(e.data.cost);
  }, []);

  const buttonSize = () => {
    if (isMobile) {
      return "sm";
    }
    if (isMedium) {
      return "default";
    }
    if (isLarge) {
      return "lg";
    }
  };

  const gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true, // Enable column resizing
    },
    onGridReady: (params) => {
      params.api?.sizeColumnsToFit();
    },
    suppressDragLeaveHidesColumns: true,
  };

  const {
    setIsEditModalStockOpenStore,
    setIsAddModalStockOpenStore,
    setIsDeleteModalStockOpenStore,
  } = useIsEditModalStockOpenStore();
  const { setIsProfileOpen } = useIsAccountOpenStore();
  const handleEditClick = () => {
    setIsEditModalStockOpenStore(true);
    setIsProfileOpen(false);
  };
  const handleAddClick = () => {
    setIsAddModalStockOpenStore(true);
    setIsProfileOpen(false);
  };
  const handleDeleteClick = () => {
    setIsDeleteModalStockOpenStore(true);
    setIsProfileOpen(false);
  };

  return (
    <div className="mt-1 flex justify-center">
      <div
        className={
          (themeStore || theme) == "light"
            ? "ag-theme-alpine"
            : "ag-theme-alpine-dark"
        }
        style={
          isMobile
            ? { width: "100vw", height: "89vh" }
            : isMedium
            ? { width: "85vw", height: "85vh" }
            : isLarge && { width: "70vw", height: "80vh" }
        }
      >
        <div className="flex justify-end">
          <Button
            className=" mr-2 select-none rounded-md bg-green-500 text-xs text-white hover:bg-green-600 disabled:opacity-40 dark:bg-green-700 hover:dark:bg-green-800 md:text-lg lg:text-xl"
            onClick={handleAddClick}
            size={buttonSize()}
          >
            Add
          </Button>
          <Button
            disabled={!isCellSelected}
            className=" mr-2 select-none rounded-md bg-blue-500 text-xs text-white hover:bg-blue-600 disabled:opacity-40 dark:bg-blue-700 hover:dark:bg-blue-800 md:text-lg lg:text-xl"
            onClick={handleEditClick}
            size={buttonSize()}
          >
            Edit
          </Button>
          <Button
            disabled={!isCellSelected}
            onClick={handleDeleteClick}
            className="select-none rounded-md bg-red-500 text-xs text-white hover:bg-red-600 disabled:opacity-40 dark:bg-red-700 hover:dark:bg-red-800  md:text-lg  lg:text-xl"
            size={buttonSize()}
          >
            Delete
          </Button>
        </div>
        <AgGridReact
          gridOptions={gridOptions}
          className={`font-body ${
            isMobile
              ? "text-[11px]"
              : isMedium
              ? "text-[20px]"
              : isLarge && "text-[22px]"
          } `}
          ref={gridRef} // Ref for accessing Grid's API
          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </div>
  );
};

export default DataGridStock;
