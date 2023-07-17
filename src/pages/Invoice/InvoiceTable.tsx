import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceProps } from "./Invoice";
import { Button } from "@/components/ui/button";

const InvoiceTable = ({
  data,
  selectedId,
  setSelectedId,
}: {
  data: InvoiceProps[];
  selectedId: string;
  setSelectedId: (selectedId: string) => void;
}) => {
  // const invoicePng = await toPng(invoiceRef.current);
  //   const img = new Image();
  //   img.src = invoicePng;
  //   document.body.appendChild(img);

  const { date, buyer, seller, invoiceItem, totalPrice } = data.find(
    ({ id }) => selectedId === id
  ) as InvoiceProps;
  return (
    <div className="mt-3 text-xs">
      <header className="capitalize">
        <b>Date :</b> {date}
      </header>
      <header className="capitalize">
        <b>Seller :</b> {seller}
      </header>
      <header className="capitalize">
        <b>Buyer :</b> {buyer}
      </header>
      <Table className="mb-4">
        <TableHeader className="text-xs">
          <TableRow>
            <TableHead className="w-[20%]">Name</TableHead>
            <TableHead className="w-[20%]">Type</TableHead>
            <TableHead className="w-[15%]">Length</TableHead>
            <TableHead className="w-[15%]">Price/m</TableHead>
            <TableHead className="w-[15%]">Quantity</TableHead>
            <TableHead className="w-[15%]">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs">
          {invoiceItem.map(({ length, name, price, quantity, type }) => {
            return (
              <TableRow>
                <TableCell className="w-[20%]">{name}</TableCell>
                <TableCell className="w-[20%]">{type}</TableCell>
                <TableCell className="w-[15%]">{length}</TableCell>
                <TableCell className="w-[15%]">{price}</TableCell>
                <TableCell className="w-[15%]">{quantity}</TableCell>
                <TableCell className="w-[15%]">
                  {Number(price) * Number(quantity)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableCaption>Total Price: {totalPrice}</TableCaption>
      </Table>
      <Button
        variant="outline"
        className="ml-1 px-5"
        onClick={() => setSelectedId("")}
      >
        Back
      </Button>
      <Button variant="destructive" className="ml-4">
        Delete
      </Button>
    </div>
  );
};

export default InvoiceTable;
