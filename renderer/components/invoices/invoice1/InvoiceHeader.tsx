import moment from "moment";
import React from "react";

const InvoiceHeader = ({
  shopName,
  address,
  invoiceNo,
  date,
  logoSrc,
  mobileNo,
  whatsappNo,
  GSTNo,
}) => {
  return (
    <div className="relative mb-3 flex items-center justify-between font-[Raleway]">
      <div className="flex gap-3">
        <div className="h-[50px] w-[50px]">
          <img src={logoSrc} alt="Logo" className="h-[50px] w-[50px]" />
        </div>
        <div>
          <h1 className="bg-gradient-to-r from-green-600 via-green-500 to-green-300 bg-[200%_auto] bg-clip-text text-[17px] font-semibold  text-transparent">
            {shopName}
          </h1>
          <p className="text-[12px]  text-[#333]">{address}</p>
          <p className="text-[12px]  text-[#333]">GSTIN No : {GSTNo}</p>
          <p className="text-[12px] text-[#333]">
            {mobileNo} {whatsappNo}
          </p>
        </div>
      </div>
      <div className="text-right">
        <h2 className="bg-gradient-to-r from-green-600 via-green-500 to-green-300 bg-[200%_auto] bg-clip-text text-[30px] font-thin tracking-[5px] text-transparent">
          INVOICE
        </h2>
        <p className="text-[15px] font-bold">InvoiceNo# {invoiceNo}</p>
        <p className="text-[13px]">
          Date : {moment(date).format("DD/MMM/YYYY")}
        </p>
      </div>
    </div>
  );
};

export default InvoiceHeader;
