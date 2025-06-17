import React from "react";
import numberToWords from "../../../constents/numbertoword";

const TexAndAmounts = ({
  gst,
  gstAmount,
  gstPercentage,
  subtotal,
  discount,
  totalAmount,
  paidAmount,
  exchange,
  exchangeAmount,
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 mb-2">
      <div className="col-span-1 border border-black">
        {gst === "true" && (
          <div>
            <div className="font-bold text-center px-2 border-b border-black">
              Tax Calculations
            </div>
            <div className="px-2 py-1 flex justify-between">
              {/* <div>CGST @ Rate : (1.5%)</div> */}
              <div>GST @ Rate : ({gstPercentage})</div>
              <div>{gstAmount}</div>
            </div>
            {/* <div className="px-2 flex justify-between">
          <div>SGST @ Rate : (1.5%)</div>
          <div>1681.305</div>
        </div> */}
            <div className="px-2 flex justify-between font-semibold mt-1">
              <div>Total GST (Tax Amount):</div>
              <div>{gstAmount}</div>
            </div>
          </div>
        )}
      </div>

      <div className="border border-black">
        <div className="font-bold text-center px-2 border-b border-black">
          Amount in Words:
        </div>
        <div className="italic mb-2 px-2">
          {numberToWords(totalAmount - discount)}
        </div>
      </div>

      <div className="border border-black p-2">
        <div className="flex justify-between">
          <div>Sub Total Amount:</div>
          <div>{subtotal}</div>
        </div>
        {exchange === "true" && (
          <div className="flex justify-between">
            <div>Exchange Amount:</div>
            <div>{`₹ ${exchangeAmount}`}</div>
          </div>
        )}
        {gst === "true" && (
          <div className="flex justify-between">
            <div>GST Amount:</div>
            <div>{`₹ ${gstAmount}`}</div>
          </div>
        )}
        <div className="flex justify-between">
          <div>Additional Discount:</div>
          <div>{`₹ ${discount}`}</div>
        </div>
        <div className="flex justify-between font-semibold">
          <div>Total Amount:</div>
          <div>{` ₹ ${totalAmount - discount}`}</div>
        </div>
        <div className="flex justify-between font-semibold">
          <div>PaidAmount:</div>
          <div>{`₹ ${paidAmount?.reduce(
            (sum, history) => sum + history.paidAmount,
            0
          )}`}</div>
        </div>
      </div>
    </div>
  );
};

export default TexAndAmounts;
