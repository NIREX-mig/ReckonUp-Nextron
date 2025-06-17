import React from "react";
import InvoiceFooter from "./InvoiceFooter";
import BillingSection from "./BillingSection";
import InvoiceItemsList from "./InvoiceItemsList";
import InvoiceDetailsCards from "./InvoiceDetailsCards";
import InvoiceHeader from "./InvoiceHeader";

const Invoice1 = ({data, qr, setting, logo}) => {
  return (
    <div className="relative mx-auto max-w-[1200px]">
      <InvoiceHeader
        shopName={setting?.shopName}
        address={setting?.address}
        invoiceNo={data?.invoiceNo}
        date={data?.createdAt}
        logoSrc={logo}
        GSTNo={setting?.GSTNO}
        whatsappNo={setting?.mobileNo}
        mobileNo={setting?.whatsappNo}
      />

      <InvoiceDetailsCards
        category={data?.exchangeCategory}
        percentage={data?.exchangePercentage}
        customername={data?.name}
        customeraddress={data?.address}
        customerphone={data?.phone}
        exchange={Boolean(data?.exchange)}
      />

      <InvoiceItemsList productList={data?.products} />

      <BillingSection
        subtotal={data?.grossAmount}
        GSTAmount={data?.gstAmount}
        GstPercentage={data?.gstPercentage}
        discount={data?.discount}
        exchange={Boolean(data?.exchange)}
        exchangeAmount={data?.exchangeAmount}
        gst={Boolean(data?.gst)}
        paidAmount={data?.payments}
        qrSrc={qr}
        totalAmount={data?.totalAmount}
      />

      <InvoiceFooter />
    </div>
  );
};

export default Invoice1;
