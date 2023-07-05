type ColorDetail = {
  length: number;
  quantity: number;
};

type NameDetail = {
  color: string;
  colordetail: ColorDetail[];
};

interface IStockData {
  name: string;
  namedetail: NameDetail[];
}

interface IStockDataFlattened {
  name: string;
  color: string;
  length: number;
  quantity: number;
}
const flatData = (data: IStockData[]) => {
  const container: IStockDataFlattened[] = [];
  data.forEach(({ name, namedetail }) =>
    namedetail.forEach(({ color, colordetail }) =>
      colordetail.forEach(({ length, quantity }) => {
        const y = { name, color, length, quantity };
        container.push(y);
      })
    )
  );
  return container;
};

export default flatData;
