import { useRef, useState } from "react";
import { toPng } from "html-to-image";

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
    <div ref={invoiceRef} id="invoice" className="flex bg-black p-3">
      <div className="flex flex-col  bg-gray-200 px-3">
        <div>
          <b>Date:</b> {date}
        </div>
        <div>
          <b>Seller: </b>
          <input
            placeholder="Seller name"
            className="bg-gray-200"
            type="text"
          />
        </div>
        <div className="mb-6">
          <b>Buyer: </b>
          <input
            placeholder="Customer name"
            className="bg-gray-200"
            type="text"
          />
        </div>
        <button className="ml-auto text-2xl" onClick={handle}>
          +
        </button>

        <div className="flex divide-y divide-black">
          <div className="flex flex-col divide-y divide-black border-t border-black ">
            <header className="pr-7 font-semibold uppercase">name</header>
            <div>cth nama</div>
            <div>cth nama</div>
            <div>cth nama</div>
          </div>
          <div className="flex flex-col divide-y divide-black ">
            <header className="pr-7 font-semibold uppercase">type</header>
            <div>cth type</div>
            <div>cth type</div>
            <div>cth type</div>
          </div>
          <div className="flex flex-col divide-y divide-black ">
            <header className="pr-7 font-semibold uppercase">length</header>
            <div>cth length</div>
            <div>cth length</div>
            <div>cth length</div>
          </div>
          <div className="flex flex-col  divide-y divide-black">
            <header className="pr-7 font-semibold  uppercase">price</header>
            <div>cth price</div>
            <div>cth price</div>
            <div>cth price</div>
          </div>

          <div className="flex flex-col divide-y divide-black">
            <header className="font-semibold  uppercase">Quantity</header>
            <div>cth quantity</div>
            <div>cth quantity</div>
            <div>cth quantity</div>
          </div>
        </div>
        <div className="ml-auto mt-1 flex justify-between gap-10 border-t border-black uppercase">
          <div>Total</div>
          <div>rp 1200000</div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCard;
