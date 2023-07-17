import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const InvoiceCard = () => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const handle = async () => {
    if (invoiceRef.current === null) {
      return;
    }
    const invoicePng = await toPng(invoiceRef.current);
    const img = new Image();
    img.src = invoicePng;
    document.body.appendChild(img);

    console.log(typeof invoicePng);
    console.log(invoicePng);
  };
  const current = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = current.toLocaleDateString("id-ID", options);

  return (
    <>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default InvoiceCard;
