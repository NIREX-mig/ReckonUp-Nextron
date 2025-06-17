import React from "react";
import Header from "./Header";
import ShopDetail from "./ShopDetail";
import CustomerAndInvDetails from "./CustomerAndInvDetails";
import ProductDetails from "./ProductDetails";
import TexAndAmounts from "./TexAndAmounts";

const Invoice2 = ({ data, qr, logo, setting }) => {
  return (
    // <div className="max-w-[210mm] mx-auto text-xs">
    <div className="mx-auto text-xs">
      <div className="border border-black p-2 mb-4">
        {setting?.GSTNO && <Header gstNo={setting?.GSTNO} />}

        <div className="text-center font-bold text-lg border-b border-black py-1">
          Inovice
        </div>

        <ShopDetail
          logoSrc={logo}
          phoneNo={setting?.mobileNo}
          shopAddress={setting?.address}
          shopName={setting?.shopName}
          whatsappNo={setting?.whatsappNo}
        />

        <CustomerAndInvDetails
          customeraddress={data?.address}
          customername={data?.name}
          customerphone={data?.phone}
          date={data?.createdAt}
          invoiceNO={data?.invoiceNo}
          exCategory={data?.exchangeCategory}
          exPercentage={data?.exchangePercentage}
          exchange={data?.exchange}
        />

        <ProductDetails productList={data?.products} />

        <TexAndAmounts
          gst={data?.gst}
          gstAmount={data?.gstAmount}
          gstPercentage={data?.gstPercentage}
          discount={data?.discount}
          exchange={data?.exchange}
          exchangeAmount={data?.exchangeAmount}
          paidAmount={data?.payments}
          subtotal={data?.grossAmount}
          totalAmount={data?.totalAmount}
        />

        <div className="flex justify-between mt-2">
          {/* <div className="text-center">
            ___________________
            <br />
            Customer Signature
          </div> */}

          <div className=" absolute h-[65px] border-[1px] border-black">
            <img src={qr} alt="QR-code" className="w-[63px] h-[63px]" />
          </div>
          <div></div>
          <div className="text-center text-gray-400">
            ___________________
            <br />
            Company Seal & Signature
          </div>
        </div>

        <div className="text-center italic mt-2">
          Thanq for you Bussiness with us!
        </div>
      </div>
    </div>
  );
};

export default Invoice2;
