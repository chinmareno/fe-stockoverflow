import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  MouseEventHandler,
} from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { useQuery } from "@tanstack/react-query";
import axiosDummy from "@/utils/axiosDummy";
import dataJson from "../../../../db/alderon.json";
import { IFlatDataStock } from "../../../utils/flatData/flatDataStock";
import useThemeStoreItems from "@/store/useThemeStoreitems";
import { useMediaQuery } from "@mui/material";
import { Button } from "../../../components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { largeQuery, mediumQuery, mobileQuery } from "@/utils/mediaQuery";
import { CellClickedEvent, GridOptions } from "ag-grid-community";
import flatDataStock from "../../../utils/flatData/flatDataStock";
import useIsEditModalStockOpenStore from "@/store/useIsEditModalStockOpenStore";
const DataGridCustom = () => {
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
  const isMobile = useMediaQuery(mobileQuery);
  const isMedium = useMediaQuery(mediumQuery);
  const isLarge = useMediaQuery(largeQuery);

  //Server state management
  const [rowData, setRowData] = useState<IFlatDataStock[]>();
  const { data, isSuccess } = useQuery({
    queryKey: ["stock"],
    queryFn: () => axiosDummy.get("/comments"),
    keepPreviousData: true,
  });
  useEffect(() => {
    console.log(mobileQuery);
    const flatData = flatDataStock(dataJson);
    setRowData(flatData);
  }, []);

  const gridRef = useRef();

  //Just for close the hamburger/account menu when user selecting a cell
  const [isCellSelected, setIsCellSelected] = useState<boolean>();

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
  const width = () => {
    if (isMobile) {
      return 85;
    }
    if (isMedium) {
      return 160;
    }
    if (isLarge) {
      return 220;
    }
    return 200;
  };
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "name",
      filter: true,
      headerClass: headerClass() + " ml-2",
      cellClass: cellClass(),
    },
    { field: "color", cellClass: cellClass(), headerClass: headerClass() },
    {
      field: "length",
      headerClass: headerClass(),
      cellClass: cellClass() + " after:content-['m'] ",
    },
    {
      field: "quantity",
      headerClass: headerClass(),
      cellClass: cellClass() + " after:content-['pcs'] ",
      cellClassRules: {
        "bg-red-500": "x<3",
        "bg-yellow-500": "x<5",
        "bg-green-500": "x>=5",
      },
    },
  ]);

  // Default config for all column
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  const cellClickedListener = useCallback((event: CellClickedEvent) => {
    console.log("cellClicked", event);
    setIsCellSelected(true);
  }, []);

  const buttonListener = useCallback(() => {
    const selectedRow = gridRef.current.api.getSelectedNodes();
    console.log(selectedRow);
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
    onFirstDataRendered: (params) => {
      params.api?.sizeColumnsToFit(); // Automatically resize columns to fit the grid width
    },
  };

  const { setIsEditModalStockOpenStore } = useIsEditModalStockOpenStore();
  const handleEditClick = () => {
    setIsEditModalStockOpenStore(true);
  };

  return (
    <div className=" flex justify-center">
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
            disabled={!isCellSelected}
            className="mr-2 select-none rounded-md bg-blue-500 text-xs text-white disabled:opacity-40 dark:bg-blue-700 md:text-lg lg:text-xl"
            onClick={handleEditClick}
            variant="outline"
            size={buttonSize()}
          >
            Edit
          </Button>
          <Button
            disabled={!isCellSelected}
            className="select-none rounded-md bg-red-500 text-xs text-white disabled:opacity-40 dark:bg-red-700  md:text-lg  lg:text-xl"
            variant="outline"
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

export default DataGridCustom;
