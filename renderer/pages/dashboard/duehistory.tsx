import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { NextPageWithLayout } from "../_app";
import RootLayout from "../../components/rootLayout";
import Head from "next/head";
import Header from "../../components/ui/Header";
import Modal from "../../components/ui/Modal";
import { APiRes } from "../../types";
import toast from "react-hot-toast";
import { IoSearchOutline } from "react-icons/io5";
import Select from "react-select";
import useModal from "../../hooks/useModal";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import DataTable from "../../components/ui/DataTable";
import { appTitle } from "../../constents";

interface InvoicePrameter {
  invoiceNo: string;
  name: string;
  address: string;
  phone: string;
  createdAt: string;
  totalAmount: number;
  totalPaid: number;
  status: string;
  dueAmount: number;
}

const DueHistoryPage: NextPageWithLayout = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2023;

  const { modal, openModal, closeModal } = useModal();

  const [year, setYear] = useState(currentYear);

  const [search, setSearch] = useState("");
  const [filterData, setFilterdData] = useState([]);
  const [currentPage, setCurrentPage] = useState(undefined);
  const [totalPage, setTotalPage] = useState(undefined);

  const columns = [
    { key: "invoiceNo", label: "Invoice No" },
    { key: "name", label: "Name" },
    { key: "address", label: "Address" },
    { key: "phone", label: "Phone" },
    { key: "createdAt", label: "Date" },
    { key: "totalAmount", label: "Total" },
    { key: "totalPaid", label: "Total Paid" },
    { key: "discount", label: "Discount" },
    { key: "status", label: "Status" },
    { key: "dueAmount", label: "Dues" },
  ];

  const yearOptions = useMemo(() => {
    return Array.from({ length: currentYear - startYear + 1 }, (_, index) => {
      const year = startYear + index;
      return { value: year, label: year.toString() };
    }).reverse();
  }, [currentYear]);

  const selected = yearOptions.find(
    (option) => option.value === (year || currentYear)
  );

  const getdueinvoices = () => {
    window.ipc.send("getdueinvoices", { pageNo: currentPage, year });

    window.ipc.on("getdueinvoices", async (res: APiRes) => {
      if (res.success) {
        setFilterdData(res.data.invoices);
        setTotalPage(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
      } else toast.error(res.message);
    });
  };

  const handleSearchInvoice = () => {
    window.ipc.send("dueInvoice-name", { pageNo: currentPage, name: search });

    window.ipc.on("dueInvoice-name", async (res: APiRes) => {
      if (res.success) {
        setFilterdData(res.data.invoices);
        setTotalPage(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
      } else toast.error(res.message);
    });
  };

  const handleShowDetails = (invoice: InvoicePrameter): void => {
    openModal("Invoice-Details");
    const jsonInvoice = JSON.stringify(invoice);
    localStorage.setItem("finalInvoice", jsonInvoice);
  };

  const handlePay = (invoice): void => {
    const jsonInvoice = JSON.stringify(invoice);
    localStorage.setItem("finalInvoice", jsonInvoice);
    openModal("Payment");
  };

  const handleReset = () => {
    setSearch("");
    getdueinvoices();
  };

  useEffect(() => {
    getdueinvoices();
  }, [year, currentPage]);

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
          modalData={filterData}
        />
        <Header title="Due Invoices History" />
        {/* <Modal closeModal={} type={} /> */}
        <div className="">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className=" flex gap-3 ">
              <div className="mx-auto flex items-center">
                <Input
                  type="text"
                  className="bg-primary-50 border border-primary-900 text-primary-900 text-sm font-semibold rounded-md focus:outline-primary-900 block w-[300px] p-1.5 px-2 placeholder:px-1 indent-6"
                  placeholder="Search By Customer Name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  icon={
                    <IoSearchOutline size={20} className="text-primary-700" />
                  }
                  required
                />
              </div>

              <Button
                title="Search"
                buttonType="button"
                handleClick={handleSearchInvoice}
                extraClass="py-1.5 text-white bg-primary-800"
              />

              <Button
                title="Reset"
                buttonType="button"
                handleClick={handleReset}
                extraClass="py-1.5 bg-btnSecondary text-white"
              />
            </div>

            <Select
              options={yearOptions}
              value={selected}
              onChange={(selectedOption) => setYear(selectedOption.value)}
              placeholder="Select Year"
              isClearable
              className="outline-none "
            />
          </div>
          <div className="w-full">
            <DataTable
              columns={columns}
              data={filterData}
              onShowDetails={handleShowDetails}
              onPay={handlePay}
              Discount
              height="180px"
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPage}
              details={false}
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

DueHistoryPage.getLayout = (page: ReactElement) => {
  return <RootLayout>{page}</RootLayout>;
};

export default DueHistoryPage;
