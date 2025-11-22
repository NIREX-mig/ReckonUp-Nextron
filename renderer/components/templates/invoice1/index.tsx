import moment from "moment";
import React from "react";
import numberToWords from "../../../constents/numbertoword";
import Image from "next/image";

const Invoice1 = ({ data, qr, logo, setting }) => {
  const finalAmt = data?.totalAmount - data?.discount;
  const totalPaidAmt = data?.payments?.reduce(
    (sum, history) => sum + history.paidAmount,
    0
  );

  const TaxSummaryItem = ({ label, value, isBold = false }) => (
    <div
      className={`flex justify-between items-center ${
        isBold ? "font-bold pt-1 border-t border-black" : ""
      }`}
    >
      <span className="">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );

  return (
    <div className="bg-white p-1 font-semibold flex justify-center">
      <div className="w-full max-w-5xl bg-white border border-black p-4">
        <div className=" flex justify-between  text-center border-b border-black mb-2">
          <p className="text-xs text-start">
            GSTIN#: <span className="font-semibold">{setting?.gstNo}</span>
          </p>
          <p className="text-end text-xs mb-1">Original/Recepient</p>
        </div>

        {/* --- Company Info and ST Code --- */}
        <div className="flex items-start mb-4">
          <div className="w-24 h-24 overflow-hidden">
            {/* Logo area */}
            <img
              src={logo}
              alt="Company Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-[#964B00] capitalize">
                {setting?.shopName}
              </h2>
              <p className="text-xs mt-1">{setting?.address}</p>
              <p className="text-xs">
                Mobile No: {setting?.mobileNo} , {setting?.whatsappNo}
              </p>
              <p className="text-xs capitalize">Prop: {setting?.ownerName}</p>
            </div>
          </div>
        </div>

        {/* --- Customer and Invoice Details Block --- */}
        <div className="grid grid-cols-3  text-xs border border-black mb-2">
          <div className="p-2 col-span-2 border-r border-black capitalize">
            <p className="font-bold">
              <span className="">Customer Name:</span> {data?.name}
            </p>
            <p className="mt-1">
              <span className="font-semibold">Address: {data?.address}</span>
            </p>
            <p className="mt-1">
              <span className="font-semibold">Mobile#:</span> {data?.phone}
            </p>
          </div>
          <div className="p-2">
            <div className="flex justify-between">
              <p className="flex-1">Date:</p>
              <p className="font-bold">
                {moment(data?.createdAt).format("DD/MMM/YYYY")}
              </p>
            </div>
            <div className="flex justify-between mt-1">
              <p className="flex-1">Invoice No:</p>
              <p className="font-bold">{data?.invoiceNo}</p>
            </div>
          </div>
        </div>

        {/* --- Itemized Table --- */}
        <div className="border border-black min-h-60">
          {/* Table Header */}
          <table className="w-full table-fixed text-black border-collapse">
            <thead>
              <tr className="bg-gray-100 font-semibold text-xs border-b border-black">
                <th
                  rowSpan={2}
                  className="w-10 p-1 border-r border-black text-left"
                >
                  Sr. No.
                </th>

                <th
                  rowSpan={2}
                  className="w-48 p-1 border-r border-black text-left"
                >
                  {" "}
                  Item Name & Description
                </th>

                <th rowSpan={2} className="p-1 border-r border-black">
                  Category
                </th>
                <th rowSpan={2} className="w-16 p-1 border-r border-black">
                  Purity.
                </th>
                <th rowSpan={2} className="p-1 border-r border-black">
                  Rate/Gm
                </th>
                <th rowSpan={2} className="p-1 border-r border-black">
                  Wt.(gms)
                </th>
                <th rowSpan={2} className="p-1 border-r border-black">
                  Quantity
                </th>
                <th rowSpan={2} className="w-20 p-1 border-r border-black">
                  Making(%)
                </th>

                <th rowSpan={2} className="w-20 p-1">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((product, index) => {
                return (
                  <tr key={index} className="border-b border-black">
                    <td className="w-10 text-center text-xs p-1 border-r border-black align-top">
                      {index + 1}
                    </td>
                    <td className="w-48 capitalize text-left text-xs p-1 border-r border-black">
                      {product?.name}
                    </td>
                    <td className="text-right text-xs p-1 border-r border-black capitalize">
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
                    <td className=" w-16 text-center text-xs p-1 border-r border-black">
                      {product.weight}
                    </td>
                    <td className=" text-center text-xs p-1 border-r border-black">
                      {product.quantity}
                    </td>
                    <td className=" text-center text-xs p-1 border-r border-black">
                      {product.makingCost}
                    </td>
                    <td className=" text-center text-xs p-1">
                      {product.amount}
                    </td>
                  </tr>
                );
              })}
              {/* Dummy padding rows to fill space, if needed for printing format */}
              {data?.products?.length < 6 &&
                Array.from({ length: 6 - data?.products?.length }).map(
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

          {/* --- Exchange and Tax Totals Block --- */}
          <div className="grid grid-cols-3  text-xs">
            {/* Column 1: Empty or for Tax Details (already rendered inline) */}
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
              />
            </div>

            {/* Column 2: Total Tax Amounts */}
            <div className="border-r border-black p-2 text-right space-y-1">
              <p>CGST %: 1.5%</p>
              <p>SGST %: 1.5%</p>
              <p className="font-bold">
                Total GST Tax: <span className="ml-2">{data?.gstAmount}</span>
              </p>
            </div>

            {/* Column 3: Total Amounts */}
            <div className="p-2 text-right space-y-1">
              <p className="flex justify-between">
                Total Amt. Before Tax:{" "}
                <span className="font-semibold ml-2">{data?.grossAmount}</span>
              </p>
              <p className="flex justify-between">
                Additional Discount:{" "}
                <span className="font-semibold ml-2">{data?.discount}</span>
              </p>
              <p className="font-bold border-t flex justify-between border-black mt-1 pt-1">
                Total Amt. After Tax: <span className="ml-2">{finalAmt}</span>
              </p>
              <p className="flex justify-between">
                Paid Amount:{" "}
                <span className="font-semibold ml-2">{totalPaidAmt}</span>
              </p>
            </div>
          </div>
        </div>

        {/* --- Footer Section --- */}
        <div className="border border-black mt-4">
          {/* Amount in Word */}
          <div className="p-2 text-sm font-semibold border-b border-black">
            Amount In Word : {`${numberToWords(finalAmt)} Rupees Only`}
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 text-xs">
            <div className="p-2 border-r border-black text-center">
              <div className="flex justify-center items-center">
                <Image
                  src={qr}
                  alt="QR"
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px]"
                />
              </div>
            </div>
            <div className="p-2 text-center">
              <p className="mt-8 pt-2 font-bold opacity-50">For Shop Only</p>
            </div>
          </div>
        </div>

        {/* Thank You Note */}
        <div className="text-center text-xs mt-4">Thank You ! Visit Again.</div>
      </div>
    </div>
  );
};

export default Invoice1;
