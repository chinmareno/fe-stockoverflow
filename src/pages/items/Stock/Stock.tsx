import { useState } from "react";
import DataGridStock from "./DataGridStock";
import EditModalStock from "./EditModalStock";
import AddModalStock from "./AddModalStock";
import Loading from "@/components/Loading";
import useLoadingStore from "@/store/useLoadingStore";
import DeleteModalStock from "./DeleteModalStock";

const Stock = () => {
  const [isCellSelected, setIsCellSelected] = useState<boolean>(false);
  return (
    <>
      <AddModalStock
        isCellSelected={isCellSelected}
        setIsCellSelected={setIsCellSelected}
      />
      <EditModalStock
        isCellSelected={isCellSelected}
        setIsCellSelected={setIsCellSelected}
      />
      <DeleteModalStock
        isCellSelected={isCellSelected}
        setIsCellSelected={setIsCellSelected}
      />
      <DataGridStock
        isCellSelected={isCellSelected}
        setIsCellSelected={setIsCellSelected}
      />
    </>
  );
};

export default Stock;
