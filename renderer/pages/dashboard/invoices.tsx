import React, { ReactElement, useEffect, useState } from "react";
import RootLayout from "../../components/rootLayout";
import { NextPageWithLayout } from "../_app";
import Head from "next/head";
import Modal from "../../components/ui/Modal";
import useModal from "../../hooks/useModal";
import { APiRes } from "../../types";
import Header from "../../components/ui/Header";
import toast from "react-hot-toast";
import DateRange from "../../components/search/DateRange";
import SelectCategory from "../../components/search/SelectCategory";
import DataTable from "../../components/ui/DataTable";
import { appTitle } from "../../constents";

interface InvoicePrameter {
  invoiceNo: string;
  name: string;
  address: string;
  createdAt: string;
  totalAmount: number;
  totalPaid: number;
  discount: number;
  dueAmount: number;
  status: string;
}

const InvoicesPage: NextPageWithLayout = () => {
  const { modal, openModal, closeModal } = useModal();

  const [currentPage, setCurrentPage] = useState(undefined);
  const [totalPages, setTotalPages] = useState(undefined);

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const [filterCurrentPage, setFilterCurrentPage] = useState(undefined);
  const [filterTotalPage, setFilterTotalPage] = useState(undefined);

  const columns = [
    { key: "invoiceNo", label: "Invoice No" },
    { key: "name", label: "Name" },
    { key: "address", label: "Address" },
    { key: "createdAt", label: "Date" },
    { key: "totalAmount", label: "Total" },
    { key: "totalPaid", label: "Total Paid" },
    { key: "discount", label: "Discount" },
    { key: "dueAmount", label: "Dues" },
    { key: "status", label: "Status" },
  ];

  const handleShowDetails = (invoice: InvoicePrameter): void => {
    openModal("Invoice-Details");
    const jsonInvoice = JSON.stringify(invoice);
    localStorage.setItem("finalInvoice", jsonInvoice);
  };

  const handlePay = (invoice: InvoicePrameter): void => {
    const jsonInvoice = JSON.stringify(invoice);
    localStorage.setItem("finalInvoice", jsonInvoice);
    openModal("Payment");
  };

  const getInvoices = () => {
    setSearch("");

    window.ipc.send("getallinvoice", { pageNo: currentPage });

    window.ipc.on("getallinvoice", (res: APiRes) => {
      if (res.success) {
        setFilteredData(res.data.invoices);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
        setFilterCurrentPage(undefined);
        setFilterTotalPage(undefined);
      } else {
        toast.error(res.message);
      }
    });
  };

  useEffect(() => {
    getInvoices();
  }, [currentPage]);

  return (
    <React.Fragment>
      <Head>
        <title>{appTitle}</title>
      </Head>
      <section className="h-[calc(100%-10px)] overflow-auto">
        <Modal
          type={modal.type}
          isOpen={modal.isOpen}
          onClose={closeModal}
          modalData={filteredData}
        />
        <Header title="View Invoices" />
        <div className="">
          <div className="flex justify-between">
            <DateRange
              currentPage={filterCurrentPage}
              setCurrentPage={setFilterCurrentPage}
              setFilteredData={setFilteredData}
              setTotalPages={setFilterTotalPage}
              clear={getInvoices}
            />
            <SelectCategory
              currentPage={filterCurrentPage}
              setCurrentPage={setFilterCurrentPage}
              setFilteredData={setFilteredData}
              setTotalPages={setFilterTotalPage}
              search={search}
              setSearch={setSearch}
            />
          </div>
          <hr />
          <div className="mt-1">
            <DataTable
              columns={columns}
              data={filteredData}
              onShowDetails={handleShowDetails}
              onPay={handlePay}
              defaultPageSize={20}
              height="180px"
              currentPage={
                filterCurrentPage === undefined
                  ? currentPage
                  : filterCurrentPage
              }
              setCurrentPage={
                filterCurrentPage === undefined
                  ? setCurrentPage
                  : setFilterCurrentPage
              }
              totalPages={
                filterTotalPage === undefined ? totalPages : filterTotalPage
              }
              Discount
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

InvoicesPage.getLayout = (page: ReactElement) => {
  return <RootLayout>{page}</RootLayout>;
};

export default InvoicesPage;
