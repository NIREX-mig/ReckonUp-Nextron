import moment from "moment";
import React from "react";

const CustomerAndInvDetails = ({
  customername,
  customeraddress,
  customerphone,
  invoiceNO,
  date,
  exchange,
  exCategory,
  exPercentage,
}) => {
  return (
    <div
      className={`grid ${
        exchange === "true" ? "grid-cols-3" : "grid-cols-2"
      } border border-black mb-2`}
    >
      <div className="border-r border-black">
        <div className="font-bold mb-1 px-2 py-[2px] border-b border-black">
          Customer Care Details:
        </div>
        <div className="px-2 pb-[2px]">
          <p className="font-semibold">Customer Name: {customername}</p>
          <p>Address: {customeraddress}</p>
          <p>Phone No.: {customerphone}</p>
        </div>
      </div>
      {exchange === "true" && (
        <div className="border-r border-black">
          <div className="font-bold mb-1 px-2 py-[2px] border-b border-black">
            Exchange Details:
          </div>
          <div className="px-2">
            <p className="font-semibold">
              Cagetory: {exCategory === "select" ? "N/A" : exCategory}
            </p>
            {/* <p>Weight: {exWeight}</p> */}
            <p>Percentage: {exPercentage === null ? "N/A" : exPercentage}</p>
          </div>
        </div>
      )}
      <div className="">
        <div className="font-bold mb-1 px-2 py-[2px] border-b border-black">
          Invoice Details:
        </div>
        <div className="px-2">
          <p className="font-semibold">Invoice No.: {invoiceNO}</p>
          <p>Invoice Date: {moment(date).format("DD/MMM/YYYY")}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerAndInvDetails;
