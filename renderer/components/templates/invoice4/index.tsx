import moment from "moment";
import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import numberToWords from "../../../constents/numbertoword";
import Image from "next/image";

// Helper component for the complex item table
const ItemTable = ({ items }) => {
  const cellStyle = "p-1 text-xs border-r border-black h-6";
  const headerStyle = "p-1 text-[10px] font-bold border-r border-black";

  return (
    <div className="w-full border-t border-b border-black mt-2">
      {/* Table Header Row */}
      <div className="flex text-center border-b border-black">
        <div className={`${headerStyle} w-[3%]`}>Sr</div>
        <div className={`${headerStyle} w-[20%] text-left`}>Product Name</div>
        <div className={`${headerStyle} w-[8%]`}>Purity</div>
        <div className={`${headerStyle} w-[8%]`}>Category</div>
        <div className={`${headerStyle} w-[10%]`}>Rate/Gm</div>
        <div className={`${headerStyle} w-[10%]`}>Wt. (grm)</div>
        <div className={`${headerStyle} w-[10%]`}>Quantity</div>
        <div className={`${headerStyle} w-[10%]`}>Making(%)</div>
        <div className={`${headerStyle} w-[18%] border-r-0`}>Total Amount</div>
      </div>

      {/* Data Rows */}
      {items?.map((item, index) => (
        <div key={index} className="flex text-center">
          <div className={`${cellStyle} w-[3%] font-semibold`}>{index + 1}</div>
          <div className={`${cellStyle} w-[20%] text-left capitalize`}>
            {item?.name}
          </div>
          <div className={`${cellStyle} w-[8%] text-right`}>
            {item?.purity === "" || item?.purity === null
              ? " - "
              : item?.purity}
          </div>
          <div className={`${cellStyle} w-[8%] text-right`}>
            {item?.category}
          </div>
          <div className={`${cellStyle} w-[10%] text-right`}>{item?.rate}</div>
          <div className={`${cellStyle} w-[10%] text-right`}>
            {item?.weight}
          </div>
          <div className={`${cellStyle} w-[10%] text-right`}>
            {item?.quantity}
          </div>
          <div className={`${cellStyle} w-[10%] text-right`}>
            {item?.makingCost}
          </div>
          <div className={`${cellStyle} w-[18%] text-right border-r-0`}>
            {item?.amount}
          </div>
        </div>
      ))}

      {/* Filler Space (to simulate blank lines) */}
      {items?.length < 6 &&
        Array.from({ length: 6 - items?.length }).map((_, i) => (
          <div key={`filler-${i}`} className="flex">
            <div className={`${cellStyle} w-[3%]`}></div>
            <div className={`${cellStyle} w-[20%]`}></div>
            <div className={`${cellStyle} w-[8%]`}></div>
            <div className={`${cellStyle} w-[8%]`}></div>
            <div className={`${cellStyle} w-[10%]`}></div>
            <div className={`${cellStyle} w-[10%]`}></div>
            <div className={`${cellStyle} w-[10%]`}></div>
            <div className={`${cellStyle} w-[10%]`}></div>
            <div className={`${cellStyle} w-[18%] border-r-0`}></div>
          </div>
        ))}
    </div>
  );
};

const Invoice4 = ({ data, qr, logo, setting }) => {
  const finalAmt = data?.totalAmount - data?.discount;
  const totalPaidAmt = data?.payments?.reduce(
    (sum, history) => sum + history.paidAmount,
    0
  );
  return (
    <div className=" bg-white">
      <div className="border border-black p-3">
        <h1 className="text-xs text-center font-semibold block pb-2 underline">
          GOLD TAX INVOICE
        </h1>
        {/* <div className="p-1 font-semibold border-r border-gray-700 w-1/4 text-center">
          GSTIN: {data.header.gstin}
        </div> */}

        <div className="border border-black p-2 rounded-lg">
          <div className="flex items-start justify-between relative">
              <Image src={logo} alt="Company Logo" width={100} height={100} className="absolute" />
              <div className="w-1/3"></div>

            <div className="text-4xl font-extrabold text-red-900 tracking-wider uppercase">
              {setting?.shopName}
            </div>

            {/* Right Side: Second Logo/Icon */}
            <div className="w-1/5 flex justify-end pt-1">
              {/* <BlueStarIcon className="h-6 w-6 text-blue-500 fill-current" /> */}
            </div>
          </div>

          {/* 3. Hallmark, Subtitle, Address, and Mobile */}
          <div className="flex justify-evenly mt-2">
            <div className="font-bold text-[12px] text-gray-700 p-0.5 px-10 border border-black">
              91.6 Hallmark Showroom
            </div>
            <div className="font-bold text-[12px] text-gray-700 p-0.5 px-10 border border-black">
              Gold & Silver Ornament Traders
            </div>
          </div>

          <div className="text-center text-xs font-bold mt-2 capitalize">
            <FaLocationDot size={15} className="inline-block mr-1" />
            <span>{setting?.address}</span>
          </div>
          <div className="text-center text-xs font-bold">
            <FaWhatsapp size={15} className="inline-block mr-2" />
            <span>
              {setting?.mobileNo} , {setting?.whatsappNo}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 text-xs mb-2 mt-2">
          <div className="col-span-1 border border-black p-2 rounded-lg bg-gray-50">
            <p className="font-bold mb-1">Details of Receiver (Billed To)</p>
            <p>
              <strong>{data?.name}</strong>
            </p>
            <p>
              <strong>Address:</strong>{" "}
              <span className="font-semibold">{data?.address}</span>
            </p>
            <p>
              <strong>Mobile:</strong>{" "}
              <span className="font-semibold">{data?.phone}</span>
            </p>
          </div>
          <div className="border flex flex-col gap-1 border-black p-2 rounded-lg">
            <p className="">
              <strong>Invoice No:</strong>{" "}
              <span className="font-semibold">{data?.invoiceNO}</span>
            </p>
            <p className="">
              <strong>Dated:</strong>{" "}
              <span className="font-semibold">
                {moment(data?.createdAt).format("DD/MMM/YYYY")}
              </span>
            </p>
          </div>
        </div>

        {/* 6. Item Table */}
        <ItemTable items={data?.products} />

        {/* 7. Totals Section */}
        <div className="flex text-xs">
          <div className="w-1/2 border-b border-r border-l border-black flex flex-col justify-between">
            <div className="grid grid-cols-2 h-full border-b border-black">
              <div className="border-r border-black p-2">
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
              <div className="p-2">
                <p>CGST @ {data?.totals?.cgstRate.toFixed(1)}%:</p>
                <p>SGST @ {data?.totals?.sgstRate.toFixed(1)}%:</p>
                <p className="font-bold">
                  Total GST Tax: <span className="ml-2">{data?.gstAmount}</span>
                </p>
              </div>
            </div>
            {/* Amount in Words */}
            <div className="p-1 font-semibold">
              In Words:{" "}
              <span className="italic">{`${numberToWords(finalAmt)} Rupees Only`}</span>
            </div>
          </div>

          {/* Right Block: Calculation Summary */}
          <div className="w-1/2 border-r border-b ml-[-1px] text-right">
            <div className="grid grid-cols-4 border-b border-black">
              <div className="col-span-2 p-1 font-semibold text-left">
                Total Amt. Before Tax:
              </div>
              <div className="col-span-2 p-1 font-semibold">
                {data?.grossAmount}
              </div>
            </div>
            <div className="grid grid-cols-4 border-b border-black">
              <div className="col-span-2 p-1 text-left">
                 Additional Discount:
              </div>
              <div className="col-span-2 p-1">
                {data?.discount}
              </div>
            </div>
            <div className="grid grid-cols-4 border-b border-black">
              <div className="col-span-2 p-1 text-left">
                 Total Amt. After Tax:
              </div>
              <div className="col-span-2 p-1">
                {finalAmt}
              </div>
            </div>
            <div className="grid grid-cols-4 bg-yellow-100 font-bold">
              <div className="col-span-2 p-1 text-left">
                 Paid Amount:
              </div>
              <div className="col-span-2 p-1">
               {totalPaidAmt}
              </div>
            </div>
          </div>
        </div>

        <div className="flex mt-2 text-xs">
          {/* Left Column: Terms and Bank Details */}
          <div className="w-1/2 pr-2"></div>

          {/* Right Column: Declaration and Signatures */}
          <div className="w-1/2 border border-black p-2 ml-2 flex flex-col justify-between text-gray-500">
            <div className="flex justify-between items-end mt-12 text-sm font-semibold">
              <div className="text-center">For,</div>
              <div className="text-center">Jewellers</div>
            </div>

            <div className="text-right text-[10px] text-gray-500 pt-4 border-t border-dotted border-black">
              (Authorised Signatory)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice4;
