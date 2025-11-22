import moment from "moment";
import Image from "next/image";
import React from "react";

const Field = ({ label, value, className = "" }) => (
  <div className={`flex items-center border border-black h-8 ${className}`}>
    <span className="text-[12px]  bg-gray-100 px-2 h-full flex items-center border-r border-black">
      {label}
    </span>
    <input
      type="text"
      value={value}
      readOnly
      className="flex-grow p-1 text-xs focus:outline-none bg-white"
      placeholder="N/A or fillable field"
    />
  </div>
);

const Invoice3 = ({ data, qr, logo, setting }) => {
  const finalAmt = data?.totalAmount - data?.discount;
  const totalPaidAmt = data?.payments?.reduce(
    (sum, history) => sum + history.paidAmount,
    0
  );

  return (
    <div className="bg-white p-1 flex justify-center">
      {/* Main Invoice Container (Print Layout) */}
      <div className="w-full max-w-5xl bg-white border-2 border-black text-black">
        {/* --- Header Section --- */}
        <div className="border-b border-black">
          <p className="text-xs text-start p-1">
            GSTIN#: <span className="font-semibold">{setting?.gstNo}</span>
          </p>

          {/* Company Name & Logos */}
          <div className="text-center px-4 pt-1 pb-2 border-t border-black relative">
            <div className="flex justify-center items-center">
              <Image
                src={logo}
                alt="Logo"
                width={100}
                height={100}
                className="absolute left-14 top-2 h-[100px] w-[100px]"
              />
              <div>
                <span className="text-xs font-bold border border-black px-2 tracking-widest">
                  INVOICE
                </span>
                <h1 className="text-2xl font-extrabold tracking-widest mt-1 uppercase text-gray-800">
                  {setting?.shopName}
                </h1>
                <p className="text-xs font-semibold mt-[-2px] capitalize">{`Prop: ${setting?.ownerName}`}</p>
                <p className="text-[10px] font-medium">{setting?.address}</p>
                <p className="text-xs">
                  Mobile No: {setting?.mobileNo} , {setting?.whatsappNo}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Key Detail Fields (Row 1) --- */}
        <div className="grid grid-cols-2 text-xs px-1">
          <Field
            label="Invoice No. :"
            value={data?.invoiceNo}
            className="border-t-0"
          />
          <Field
            label="Date"
            value={moment(data?.createdAt).format("DD/MMM/YYYY")}
            className="border-t-0 border-l-0"
          />
        </div>

        {/* --- Customer and Address Fields --- */}
        <div className="p-1 border-b border-black space-y-1">
          <Field
            label="Name:"
            value={data?.name}
            className="h-6 border-black"
          />
          <div className="flex ">
            <Field
              label="Address:"
              value={data?.address}
              className="h-6 w-[50%] border-black"
            />
            <Field
              label="Address:"
              value={data?.phone}
              className="h-6 w-[50%] border-black"
            />
          </div>
        </div>

        {/* --- Itemized Table Header --- */}
        <div className="font-bold border-b border-black">
          <table className="w-full table-fixed text-black border-collapse h-8">
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
                  <tr key={index} className="">
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
                    <tr key={`pad-${i}`} className="h-6">
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

        {/* --- Totals and Footer Section --- */}
        <div className="grid grid-cols-5 text-xs border-b border-black">
          {/* Left Column (Rupees, Bank Details) */}
          <div className="col-span-3 grid grid-cols-2 border-r border-black">
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
              <div className="flex justify-between">
                <span className="font-semibold">Category:</span>
                <span className="font-semibold">
                  {data?.exchangeCategory === "select"
                    ? "N/A"
                    : data?.exchangeCategory}
                </span>
              </div>
              <div className="flex justify-between mt-3">
                <span className="font-semibold">Weight:</span>
                <span className="font-semibold">
                  {data?.exchangePercentage === null
                    ? "N/A"
                    : data?.exchangePercentage}
                </span>
              </div>
              <div className="flex justify-between mt-3">
                <span className="font-semibold">Amount:</span>
                <span className="font-semibold">
                  {data?.exchangeAmount === null ? 0 : data?.exchangeAmount}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (Summary Totals) */}
          <div className="col-span-2">
            <div className="p-1 space-y-0.5">
              <div className="flex justify-between border-b border-black">
                <span className="text-[12px] font-semibold">Sub. Total</span>
                <span className="font-semibold">{data?.grossAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[12px] font-semibold">{`Gst Amt. (${data?.gstPercentage}%)`}</span>
                <span className="font-semibold">{data?.gstAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[12px] font-semibold">
                  Additional Discount:
                </span>
                <span className="font-semibold">{data?.discount}</span>
              </div>
              <div className="flex justify-between font-bold border-t-2 border-black pt-1">
                <span className="text-xs">Grand Total</span>
                <span className="text-xs">{finalAmt}</span>
              </div>
              <div className="flex justify-between border-t border-black pt-0.5">
                <span className="text-[12px] font-bold">Payment Received</span>
                <span className="font-semibold">{totalPaidAmt}</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Signatures --- */}
        <div className="grid grid-cols-2 text-xs">
          <div className="p-2 border-r border-black h-16 relative">
            <div className="absolute bottom-2 left-2 right-2 text-center border-t border-black pt-1">
              Customer's Signature
            </div>
          </div>
          <div className="p-2 h-16 relative">
            <div className="absolute bottom-2 left-2 right-2 text-center opacity-50">
              <div className="border-t border-black pt-1 text-[10px]">
                Authorized Signature
              </div>
              <div className="text-[10px] font-bold mt-1">For Shop Only</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice3;
