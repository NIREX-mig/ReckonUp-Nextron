import React from "react";

const BillingSection = ({
  subtotal,
  gst,
  GstPercentage,
  GSTAmount,
  exchange,
  exchangeAmount,
  totalAmount,
  paidAmount,
  discount,
  qrSrc,
}) => {
  return (
    <div className="flex justify-between">
      <div className="h-[75px] rounded-xl border-[1px] border-[#f0f0f0] bg-white p-1">
        <img
          src={qrSrc}
          alt="QR-code"
          className="w-[73px] h-[73px] object-contain"
        />
      </div>
      <div className="w-[200px]">
        <div className="">
          <div className="mb-1 flex justify-between">
            <span className="text-[12px]]">Subtotal:</span>
            <span className="text-[12px]">{`₹ ${subtotal}`}</span>
          </div>
          {gst === "true" && (
            <div className=" mb-1 flex justify-between">
              <span className="text-[12px]">{`GST(${GstPercentage}%) :`}</span>
              <span className="text-[12px]">{`₹ ${GSTAmount}`}</span>
            </div>
          )}
          {exchange === "true" && (
            <div className="mb-1 flex justify-between">
              <span className="text-[12px]">{`Exchange Amt :`}</span>
              <span className="text-[12px]">{`₹ ${exchangeAmount}`}</span>
            </div>
          )}
          <div className="mb-1 flex justify-between border-t border-gray-500 ">
            <span className="text-[12px]">Total:</span>
            <span className="text-[12px]">{` ₹ ${totalAmount}`}</span>
          </div>

          <div className=" mb-1 flex justify-between">
            <span className="text-[12px]">Paid Amount :</span>
            <span className="text-[12px]">{`₹ ${paidAmount?.reduce(
              (sum, history) => sum + history.paidAmount,
              0
            )}`}</span>
          </div>
          <div className="md-1 flex justify-between">
            <span className="text-[12px]">Discount :</span>
            <span className="text-[12px]">{`₹ ${discount}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSection;
