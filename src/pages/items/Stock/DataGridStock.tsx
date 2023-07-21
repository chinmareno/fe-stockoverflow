import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import useThemeStoreItems from "@/store/useThemeStoreitems";
import { useMediaQuery } from "@mui/material";
import { Button } from "../../../components/ui/button";
import axiosInstance from "@/utils/axiosInstance";
import { largeQuery, mediumQuery, mobileQuery } from "@/utils/mediaQuery";
import { CellClickedEvent, GridOptions } from "ag-grid-community";
import useIsEditModalStockOpenStore from "@/store/useIsModalStockOpenStore";
import useDataStockForm from "@/store/useDataStockForm";
import useIsAccountOpenStore from "@/store/useIsAccountOpenStore";
import toRupiahFormat from "@/utils/toRupiahFormat";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { useToast } from "@/components/ui/use-toast";
import useStockHistoryStore, {
  useTemporalStockHistory,
} from "@/store/useStockHistoryStore";
import useLoadingStore from "@/store/useLoadingStore";

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
  const { data, isError } = useQuery({
    queryKey: ["stock"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/items/");
      return data;
    },
    keepPreviousData: true,
  });
  useEffect(() => {
    if (data) {
      setRowData(data);
    }
    if (isError) {
      return;
    }
  }, [data]);

  const gridRef = useRef();

  const headerClass = () => {
    let headerClass = "bg-gray-400 flex dark:bg-gray-600 p-0";
    if (isMobile) {
      headerClass + " mx-0";
    }
    if (isMedium) {
      headerClass + " mx-0";
    }
    if (isLarge) {
      headerClass + " mx-0";
    }
    return headerClass;
  };
  const cellClass = () => {
    let allMedia = " ";
    if (isMobile) {
      return allMedia + "text-xs capitalize px-0 text-center";
    }
    if (isMedium) {
      return allMedia + "text-lg capitalize px-0 text-center";
    }
    if (isLarge) {
      return allMedia + "text-xl capitalize px-0 text-center";
    }
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
      headerClass: headerClass(),
      cellClass: cellClass() + " pr-6",
    },
    { field: "type", cellClass: cellClass(), headerClass: headerClass() },
    {
      field: "length",
      headerClass: headerClass(),
      cellClass: cellClass() + " after:content-['m']",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerClass: headerClass(),
      cellClass: cellClass(),
    },
    {
      field: "cost",
      headerName: "Price/m",
      cellClass: cellClass() + appendRpIfNotSmall(),
      headerClass: headerClass(),
      valueFormatter: ({ value }: any) => toRupiahFormat(value),
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
  const { setName, setLength, setType, setQuantity, setCost } =
    useDataStockForm();
  const cellClickedListener = useCallback((e: CellClickedEvent) => {
    console.log("cellClicked", e);
    setIsProfileOpen(false);
    setIsCellSelected(true);
    setName(e.data.name);
    setType(e.data.type);
    setLength(e.data.length);
    setQuantity(e.data.quantity);
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

  const { setIsLoading, isLoading } = useLoadingStore();
  const { toast } = useToast();
  const { actionName, cost, length, name, quantity, type } =
    useStockHistoryStore();
  const cache = useQueryClient();
  const { undo, redo, futureStates, pastStates } = useTemporalStockHistory(
    (state) => state
  );
  const handleUndoStock = async () => {
    console.log(pastStates);
    if (!name) {
      console.log("no undo again");
      return;
    }
    setIsLoading(true);
    switch (actionName) {
      case "create":
        try {
          await axiosInstance.delete("/items/", {
            params: { name, type, length, cost, quantity },
          });
          cache.invalidateQueries(["stock"]);
          undo();
        } catch (error) {
          toast({
            variant: "destructive",
            duration: 5000,
            description: "Undo failed",
          });
        }
        break;
      case "edit":
        try {
          await axiosInstance.patch("/items/", {
            name,
            type,
            length,
            quantity,
            cost,
            editStock: true,
          });
          cache.invalidateQueries(["stock"]);

          undo();
        } catch (error) {
          toast({
            variant: "destructive",
            duration: 5000,
            description: "Undo failed",
          });
        }
        break;
      case "delete":
        try {
          await axiosInstance.post("/items/", {
            name,
            type,
            length,
            quantity,
            cost,
          });

          cache.invalidateQueries(["stock"]);
          undo();
        } catch (error) {
          toast({
            variant: "destructive",
            duration: 5000,
            description: "Undo failed",
          });
        }
        break;
    }
    setIsLoading(false);
  };

  const handleRedoStock = async () => {
    if (futureStates.length == 0) {
      console.log("redo ksoong");
      return;
    }
    console.log(futureStates);
    const { name, actionName, cost, length, quantity, newQuantity, type } =
      futureStates[futureStates.length - 1];
    {
      setIsLoading(true);
      switch (actionName) {
        case "create":
          try {
            await axiosInstance.post("/items/", {
              name,
              type,
              length,
              quantity,
              cost,
            });

            cache.invalidateQueries(["stock"]);
            redo();
          } catch (error) {
            toast({
              variant: "destructive",
              duration: 5000,
              description: "Redo failed",
            });
          }
          break;
        case "edit":
          try {
            await axiosInstance.patch("/items/", {
              name,
              type,
              length,
              quantity: newQuantity,
              cost,
              editStock: true,
            });
            cache.invalidateQueries(["stock"]);
            redo();
          } catch (error) {
            toast({
              variant: "destructive",
              duration: 5000,
              description: "Redo failed",
            });
          }
          break;
        case "delete":
          try {
            await axiosInstance.delete("/items/", {
              params: { name, type, length, cost, quantity },
            });
            cache.invalidateQueries(["stock"]);
            redo();
          } catch (error) {
            toast({
              variant: "destructive",
              duration: 5000,
              description: "Redo failed",
            });
          }

          break;
      }

      setIsLoading(false);
    }
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
            disabled={isLoading}
            onClick={handleUndoStock}
            className=" mr-4 select-none gap-1 rounded-md bg-white text-xs text-slate-800 shadow-md hover:bg-white disabled:opacity-40 dark:bg-sky-950 dark:text-white dark:hover:bg-sky-950 md:text-lg lg:text-xl lg:hover:bg-slate-200 lg:hover:dark:bg-sky-800"
          >
            <UndoIcon fontSize={"small"} />
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleRedoStock}
            className=" mr-auto select-none gap-1 rounded-md bg-white text-xs text-slate-800 shadow-md hover:bg-white disabled:opacity-40 dark:bg-sky-950 dark:text-white dark:hover:bg-sky-950 md:text-lg lg:text-xl lg:hover:bg-slate-200 lg:hover:dark:bg-sky-800"
          >
            {isMobile && <RedoIcon fontSize="small" />}
            {isMedium && <RedoIcon fontSize="medium" />}
            {isLarge && <RedoIcon fontSize="medium" />}
          </Button>

          <Button
            className=" mr-2 flex select-none justify-center gap-1 rounded-md bg-green-500 text-xs text-white hover:bg-green-600 disabled:opacity-40 dark:bg-green-700 hover:dark:bg-green-800 md:px-5 md:text-lg lg:text-xl"
            onClick={handleAddClick}
            size={buttonSize()}
          >
            {isMobile && <AddIcon fontSize="small" />}
            {isMedium && <AddIcon fontSize="medium" />}
            {isLarge && <AddIcon fontSize="medium" />}
            {isLarge && "Add Stock"}
          </Button>
          <Button
            disabled={!isCellSelected}
            className=" mr-2 flex select-none justify-center gap-1 rounded-md bg-blue-500 text-xs text-white hover:bg-blue-600 disabled:opacity-40 dark:bg-blue-700 hover:dark:bg-blue-800 md:px-4 md:text-lg lg:text-xl"
            onClick={handleEditClick}
            size={buttonSize()}
          >
            {isMobile && <ModeEditIcon fontSize="small" />}
            {isMedium && <ModeEditIcon fontSize="medium" />}
            {isLarge && <ModeEditIcon fontSize="medium" />}
            {isLarge && "Edit Stock"}
          </Button>
          <Button
            disabled={!isCellSelected}
            onClick={handleDeleteClick}
            className="flex select-none justify-center gap-1 rounded-md bg-red-500 text-xs text-white hover:bg-red-600 disabled:opacity-40 dark:bg-red-700 hover:dark:bg-red-800 md:px-5  md:text-lg  lg:text-xl"
            size={buttonSize()}
          >
            {isMobile && <DeleteIcon fontSize="small" />}
            {isMedium && <DeleteIcon fontSize="medium" />}
            {isLarge && <DeleteIcon fontSize="medium" />}
            {isLarge && "Delete "}
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
