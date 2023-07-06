type ColorDetail = {
  length: number;
  quantity: number;
};

type NameDetail = {
  color: string;
  colordetail: ColorDetail[];
};

export interface IDataStock {
  name: string;
  namedetail: NameDetail[];
}

export interface IFlatDataStock {
  name: string;
  color: string;
  length: number;
  quantity: number;
}
const flatDataStock = (data: IDataStock[]) => {
  const container: IFlatDataStock[] = [];
  data.forEach(({ name, namedetail }) =>
    namedetail.forEach(({ color, colordetail }) =>
      colordetail.forEach(({ length, quantity }) => {
        const eachArray = { name, color, length, quantity };
        container.push(eachArray);
      })
    )
  );
  return container;
};

export default flatDataStock;
