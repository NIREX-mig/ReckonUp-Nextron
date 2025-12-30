import moment from "moment";
import React from "react";
import numberToWords from "../../../constents/numbertoword";
import Image from "next/image";

const Invoice2 = ({ data, qr, logo, setting, showGst = false }) => {
  const finalAmt = data?.totalAmount - data?.discount;
  const totalPaidAmt = data?.payments?.reduce(
    (sum, history) => sum + history.paidAmount,
    0
  );

  const TaxSummaryItem = ({ label, value, isBold = false }) => (
    <div
      className={`flex justify-between items-center ${
        isBold ? "font-extrabold pt-1 border-t border-black" : "font-semibold"
      }`}
    >
      <span
        className={`text-xs font-semibold ${
          isBold ? "font-extrabold" : "font-semibold"
        }`}
      >
        {label}
      </span>
      <span className={`text-xs ${isBold && "font-semibold"}`}>
        {value}
      </span>
    </div>
  );

  return (
    <div className=" bg-white p-2 flex justify-center">
      {/* Main Invoice Container (A4-like constraint) */}
      <div className="w-full max-w-5xl bg-white border border-black shadow-xl">
        {/* --- Header Section --- */}
        <div className="border-b border-black">
          <div className="flex justify-between p-2">
            <p className="text-xs text-start font-medium">
              GSTIN#: <span className="font-semibold">{setting?.gstNo || "N/A"}</span>
            </p>
            <p className="text-xs font-semibold text-end">
              Original/Recipt
            </p>
          </div>

          {/* Company Banner */}
          <div className="px-2 pb-1 grid grid-cols-4 gap-2 text-center relative">
            <div className="col-span-1 h-[80px] -top-3 overflow-hidden">
              <Image
                src={logo}
                alt="Company Logo"
                className="object-contain h-full w-full"
                width={200}
                height={80}
                // onError={(e) => (e.target.style.display = "none")}
              />
            </div>
            <div className="col-span-2">
              <h1 className="text-xl font-extrabold text-[#B4001C] uppercase tracking-wider">
                {setting?.shopName}
              </h1>
              <p className="text-xs font-semibold mt-1 capitalize">
                {setting?.address}
              </p>
              <p className="text-xs font-semibold">
                Mobile No: {setting?.mobileNo} , {setting?.whatsappNo}
              </p>
            </div>
            <div className="">
              <p className="text-xs font-semibold mt-1 capitalize align-bottom">
                Prop: {setting?.ownerName}
              </p>
            </div>
          </div>
        </div>

        {/* --- Customer and Invoice Details Block --- */}
        <div className="grid grid-cols-3 text-xs border-b border-black">
          {/* Customer Details */}
          <div className="p-2 border-r col-span-2 border-black capitalize">
            <p className="font-semibold">
              <span className="font-semibold">Customer Name:</span> {data?.name}
            </p>
            <p className="mt-1 font-semibold">Address: {data?.address}</p>
            <p>
              <span className="font-semibold">Mobile#:</span> {data?.phone || "N/A"}
            </p>
          </div>

          {/* Invoice Details */}
          <div className="p-2 space-y-1">
            <div className="flex justify-between">
              <p className="flex-1 font-semibold">Date:</p>
              <p className="font-semibold">
                {moment(data?.createdAt).format("DD/MMM/YYYY")}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="flex-1 font-semibold">Invoice No:</p>
              <p className="font-semibold">{data?.invoiceNo}</p>
            </div>
          </div>
        </div>

        {/* --- Itemized Table --- */}
        <div className="w-full">
          <table className="w-full table-fixed text-black border-collapse">
            <thead>
              <tr className="bg-gray-50 font-semibold text-xs border-b border-black">
                <th
                  rowSpan={2}
                  className="w-10 p-1 border-r border-black align-bottom"
                >
                  Sr.No.
                </th>
                <th
                  rowSpan={2}
                  className="w-48 p-1 border-r border-black text-left align-bottom"
                >
                  Item Name & Description
                </th>
                <th rowSpan={2} className="p-1 border-r border-black">
                  Category
                </th>
                <th
                  rowSpan={2}
                  className="w-16 p-1 border-r border-black align-bottom"
                >
                  Purity
                </th>
                <th
                  rowSpan={2}
                  className="p-1 border-r border-black align-bottom"
                >
                  Rate/Gm
                </th>
                <th
                  rowSpan={2}
                  className="p-1 border-r border-black align-bottom"
                >
                  weight(g)
                </th>
                <th
                  rowSpan={2}
                  className="p-1 border-r border-black align-bottom"
                >
                  Quantity
                </th>
                <th
                  rowSpan={2}
                  className="p-1 border-r border-black align-bottom"
                >
                  Making(%)
                </th>
                <th rowSpan={2} className="w-20 p-1 align-bottom">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((product, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b font-semibold border-black"
                  >
                    <td className="w-10 text-center text-xs p-1 border-r border-black">
                      {index + 1}.
                    </td>
                    <td className="w-48 capitalize text-left text-xs p-1 border-r border-black font-medium">
                      {product?.name}
                    </td>
                    <td className="text-right text-xs p-1 border-r border-black">
                      {product?.category}
                    </td>
                    <td className="text-right text-xs p-1 border-r border-black">
                      {product?.purity === "" || product?.purity === null
                        ? " - "
                        : product.purity}
                    </td>
                    <td className="text-right text-xs p-1 border-r border-black">
                      {product.rate}
                    </td>
                    <td className="w-16 text-center text-xs p-1 border-r border-black">
                      {product.weight}
                    </td>
                    <td className="text-right text-xs p-1 border-r border-black">
                      {product.quantity}
                    </td>
                    <td className="text-right text-xs p-1 border-r border-black">
                      {product.makingCost}
                    </td>
                    <td className="text-right text-xs p-1">
                      {product.amount}
                    </td>
                  </tr>
                );
              })}
              {/* Dummy padding rows to fill space, if needed for printing format */}
              {data?.products?.length < 2 &&
                Array.from({ length: 2 - data?.products?.length }).map(
                  (_, i) => (
                    <tr
                      key={`pad-${i}`}
                      className="h-6 border-b border-black"
                    >
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td className="border-r border-black"></td>
                      <td></td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
        </div>

        {/* --- Exchange and Tax Totals Block --- */}
        <div className="grid grid-cols-3 text-xs">
          {/* Column 1: Tex Calculation and payment QR */}
          <div className="border-r border-black grid grid-cols-2">
            <div className="flex justify-center items-center">
              <Image
                src={qr}
                alt="QR"
                width={100}
                height={100}
                className="w-[100px] h-[100px]"
              />
            </div>

            <div className="border-l border-black p-2">
              <p className="text-xs font-semibold">CGST %: 1.5%</p>
              <p className="text-xs font-semibold">SGST %: 1.5%</p>
              <TaxSummaryItem
                label="Total GST Tax:"
                value={data?.gstAmount}
                isBold
              />
            </div>
          </div>
          {/* Column 2: Exchange Block */}
          <div className="border-r border-black p-2 text-right space-y-1">
            <TaxSummaryItem
              label="Category:"
              value={
                data?.exchangeCategory === "select"
                  ? "N/A"
                  : data?.exchangeCategory
              }
            />
            <TaxSummaryItem
              label="Weight:"
              value={
                data?.exchangePercentage === null
                  ? "N/A"
                  : data?.exchangePercentage
              }
            />
            <TaxSummaryItem
              label="Amount:"
              value={data?.exchangeAmount === null ? 0 : data?.exchangeAmount}
              isBold
            />
          </div>

          {/* Column 3: Grand Totals */}
          <div className="p-2 text-right space-y-1">
            <TaxSummaryItem
              label="Total Amt. Before Tax:"
              value={data?.grossAmount}
            />
            <TaxSummaryItem
              label="Additional Discount:"
              value={data?.discount}
            />
            <TaxSummaryItem
              label="Total Amt. After Tax:"
              value={finalAmt}
              isBold={true}
            />
            <TaxSummaryItem label="Paid Amt.:" value={totalPaidAmt} />
          </div>
        </div>

        {/* --- Footer Section --- */}
        <div className="border-t border-black">
          {/* Amount in Word */}
          <div className="p-2 text-xs font-semibold border-b border-black">
            Amount In Word : {`${numberToWords(finalAmt)} Rupees Only`}
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 text-xs">
            <div className="p-2 border-r border-black text-center">
              <div className="mt-8 pt-2 border-t border-black w-full">
                Customer Signature
              </div>
            </div>
            <div className="p-2 text-center">
              <div className="mt-8 pt-2 uppercase opacity-50 font-semibold">
                For Shop Only
              </div>
            </div>
          </div>
        </div>

        {/* Thank You Note */}
        <div className="text-center text-xs p-1 border-t border-black">
          Thank You ! Visit Again.
        </div>
      </div>
    </div>
  );
};

export default Invoice2;
