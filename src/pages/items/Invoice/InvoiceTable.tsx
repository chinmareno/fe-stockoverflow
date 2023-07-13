import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const InvoiceTable = () => {
  const invoices = [
    {
      name: "steel",
      type: "red",
      length: "33m",
      stock: "30pcs",
    },
    {
      name: "INV002",
      type: "Pending",
      length: "$150.00",
      stock: "PayPal",
    },
    {
      name: "INV003",
      type: "Unpaid",
      length: "$350.00",
      stock: "Bank Transfer",
    },
    {
      name: "INV004",
      type: "Paid",
      length: "$450.00",
      stock: "Credit Card",
    },
    {
      name: "asdas",
      type: "Paid",
      length: "$550.00",
      stock: "PayPal",
    },
    {
      name: "INV006",
      type: "aasdasdas",
      length: "$200.00",
      stock: "Bank Transfer",
    },
    {
      name: "INV007",
      type: "Unpaid",
      length: "$300.00",
      stock: "Credit Card",
    },
  ];
  return (
    <div>
      <header>Invoice Id: 121jk1301j</header>
      <header>Date: 20/04/2015</header>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Length</TableHead>
            <TableHead className="text-right">Price/m</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.name}>
              <TableCell className="font-medium">{invoice.name}</TableCell>
              <TableCell>{invoice.type}</TableCell>
              <TableCell>{invoice.length}</TableCell>
              <TableCell className="text-right">{invoice.stock}</TableCell>
              <TableCell className="text-right">{invoice.stock}</TableCell>
              <TableCell className="text-right">{invoice.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>Total Price : Rp. 2.500.000.000</TableCaption>
      </Table>
    </div>
  );
};

export default InvoiceTable;
