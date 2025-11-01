import React, { ReactElement, useEffect, useRef, useState } from "react";
import RootLayout from "../../components/rootLayout";
import { NextPageWithLayout } from "../_app";
import Head from "next/head";
import { FaArrowLeft, FaCloudDownloadAlt } from "react-icons/fa";
import { FiPrinter } from "react-icons/fi";
import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";
import { APiRes } from "../../types";
import toast from "react-hot-toast";
import Invoice1 from "../../components/templates/invoice1";
import Invoice2 from "../../components/templates/invoice2";
import Invoice3 from "../../components/templates/invoice3";
import Button from "../../components/ui/Button";
import { appTitle } from "../../constents";

const ViewInvoicePage: NextPageWithLayout = () => {
  const [finalInvoiceData, setFinalInvoiceData] = useState(undefined);
  const [setting, setSetting] = useState(undefined);
  const contentRef = useRef();
  const [qr, setQr] = useState(undefined);
  const [logo, setLogo] = useState(undefined);

  const router = useRouter();

  const reactToPrintFn = useReactToPrint({
    contentRef,
  });

  const handlePrintInvoice = () => {
    reactToPrintFn();
    localStorage.removeItem("finalInvoice");
  };

  const handleSaveInvoice = () => {
    toast.error("this feature is not available yet!");
    // // const element = document.getElementById("invoice");
    // const opt = {
    //   margin: 0.5,
    //   filename: `${finalInvoiceData?.invoiceNo}_${finalInvoiceData?.name}.pdf`,
    //   image: { type: "jpeg", quality: 0.98 },
    //   html2canvas: { scale: 2 },
    //   jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    // };
    // html2pdf().set(opt).from(contentRef).save();

    // generatePDF(contentRef, {
    //   filename: `${finalInvoiceData?.invoiceNo}_${finalInvoiceData?.name}.pdf`,
    // });
    // generatePDF(contentRef, options);
  };

  useEffect(() => {
    const getsettingData = () => {
      window.ipc.send("fetchsetting", { finalInvoiceData });
      window.ipc.on("fetchsetting", (res: APiRes) => {
        console.log(res);
        if (res.success) {
          setSetting(res.data);
        } else {
          toast.error("Something Went Wrong!");
          router.back();
        }
      });
    };

    const getPaymentQrImage = () => {
      window.ipc.send("getqr", {});
      window.ipc.on("getqr", (res: APiRes) => {
        if (res.success) {
          setQr(res?.data);
        }
      });
    };

    const getInvoiceLog = () => {
      window.ipc.send("get-logo", {});
      window.ipc.on("get-logo", (res: APiRes) => {
        if (res.success) {
          setLogo(res?.data);
        }
      });
    };

    const setinvoice = async () => {
      const jsonInvoice = localStorage.getItem("finalInvoice");
      const ObjInvoice = await JSON.parse(jsonInvoice);
      setFinalInvoiceData(ObjInvoice);
    };
    getPaymentQrImage();
    getInvoiceLog();
    setinvoice();
    getsettingData();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{appTitle}</title>
      </Head>
      <div className="h-full">
        <div className="w-full flex justify-between mb-6 sticky top-6">
          <div>
            <Button
              buttonType="button"
              title="Go Back"
              icon={<FaArrowLeft size={15} />}
              handleClick={() => {
                localStorage.removeItem("finalInvoice");
                router.back();
              }}
              extraClass="bg-primary-800 text-white py-2"
            />
          </div>
          <div className="flex gap-4">
            <Button
              buttonType="button"
              title="Print"
              icon={<FiPrinter className="h-5 w-5" />}
              handleClick={handlePrintInvoice}
              extraClass="bg-primary-800 py-2 text-white "
            />

            <Button
              buttonType="button"
              title="Download"
              icon={<FaCloudDownloadAlt className="h-5 w-5" />}
              handleClick={handleSaveInvoice}
              extraClass="bg-primary-800 py-2 text-white "
            />
          </div>
        </div>

        <div
          ref={contentRef}
          className="max-w-4xl mx-auto overflow-scroll bg-[#ffffff] p-5"
        >
          {setting?.invoicetype === "invoice1" && (
            <Invoice1
              data={finalInvoiceData}
              logo={logo}
              qr={qr}
              setting={setting}
            />
          )}

          {setting?.invoicetype === "invoice2" && (
            <Invoice2
              data={finalInvoiceData}
              logo={logo}
              qr={qr}
              setting={setting}
            />
          )}
          {setting?.invoicetype === "invoice3" && (
            <Invoice3
              data={finalInvoiceData}
              logo={logo}
              qr={qr}
              setting={setting}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

ViewInvoicePage.getLayout = (page: ReactElement) => {
  return <RootLayout>{page}</RootLayout>;
};

export default ViewInvoicePage;
