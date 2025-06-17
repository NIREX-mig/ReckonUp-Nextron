import React from "react";

const InvoiceDetailsCards = ({
  exchange,
  category,
  percentage,
  customeraddress,
  customername,
  customerphone,
}) => {
  return (
    <div className="flex justify-between">
      {exchange === "true" && (
        <div className=" text-left px-4">
          <p className=" text-[12px] font-semibold  text-black">
            EXCHANGE DETAILS
          </p>
          <p className="text-[12px] text-black">
            Category: {category === "select" ? "N/A" : category}
          </p>
          <p className="text-[12px] text-black">
            Percentage: {percentage === null ? "N/A" : percentage}
          </p>
        </div>
      )}
      <div className=" w-[200px] text-left px-4 font-bold border rounded-lg py-1">
        <p className="text-[12px] font-semibold text-black">BILLED TO</p>
        <p className="text-[12px] text-black capitalize">
          name: {customername}
        </p>
        <p className="text-[12px] text-black capitalize">
          Address: {customeraddress}
        </p>
        <p className="text-[12px] text-black capitalize">
          Phone: {customerphone}
        </p>
      </div>
    </div>
  );
};

export default InvoiceDetailsCards;
