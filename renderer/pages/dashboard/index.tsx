import React, { ReactElement, useEffect, useState } from "react";
import RootLayout from "../../components/rootLayout";
import type { NextPageWithLayout } from "../_app";
import Head from "next/head";
import { FaDollarSign } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { MdPaid } from "react-icons/md";
import { IoMdWarning } from "react-icons/io";
import useModal from "../../hooks/useModal";
import Modal from "../../components/ui/Modal";
import { APiRes } from "../../types";
import Header from "../../components/ui/Header";
import toast from "react-hot-toast";
import DataTable from "../../components/ui/DataTable";
import { appTitle } from "../../constents";

const iconMap: { [key: string]: JSX.Element } = {
  FaDollarSign: <FaDollarSign size={15} className="text-gray-800" />,
  MdPaid: <MdPaid size={15} className="text-gray-800" />,
  IoMdWarning: <IoMdWarning size={15} className="text-gray-800" />,
  FiFileText: <FiFileText size={15} className="text-gray-800" />,
};

const ServerIconRenderer: React.FC<{ iconName: string }> = ({ iconName }) => {
  const Icon = iconMap[iconName];
  return Icon;
};

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

const DashboardPage: NextPageWithLayout = () => {
  const { modal, openModal, closeModal } = useModal();

  const [search, setSearch] = useState("");

  const [invoices, setInvoices] = useState([]);
  const [filteredData, setFilterdData] = useState([]);
  const [currentPage, setCurrentPage] = useState(undefined);
  const [totalPages, setTotalPages] = useState(undefined);

  const [selectedOption, setSelectedOption] = useState("invoiceNo");

  const [stats, setStats] = useState([
    {
      title: "Outstanding",
      value: "₹0",
      icon: "FaDollarSign",
    },
    {
      title: "Total Invoices",
      value: "0",
      icon: "FiFileText",
    },
    {
      title: "Paid Inovices",
      value: "0",
      icon: "MdPaid",
    },
    {
      title: "Due Invoices",
      value: "0",
      icon: "IoMdWarning",
    },
  ]);

  const columns = [
    { key: "invoiceNo", label: "Invoice No" },
    { key: "name", label: "Name" },
    { key: "address", label: "Address" },
    { key: "phone", label: "Phone" },
    { key: "createdAt", label: "Date" },
    { key: "totalAmount", label: "Total" },
    { key: "totalPaid", label: "Total Paid" },
    { key: "status", label: "Status" },
    { key: "dueAmount", label: "Dues" },
  ];

  const handleSearchInvoice = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue); // Assuming 'setSearch' updates the search input state

    let searchedData = [];

    // Search functionality using switch statement
    switch (selectedOption) {
      case "invoiceNo":
        searchedData =
          searchValue.length === 0
            ? invoices
            : invoices.filter((item) =>
                item.invoiceNo.toLowerCase().includes(searchValue)
              );
        break;

      case "customerName":
        // Assuming the customer's name property in 'invoices' is 'name'
        searchedData =
          searchValue.length === 0
            ? invoices
            : invoices.filter((item) =>
                item.name.toLowerCase().includes(searchValue)
              );
        break;

      // Optional: Default case to handle no selection or unknown option
      default:
        searchedData = invoices; // Show all invoices if no valid option is selected
        break;
    }

    // 3. Update the filtered data state
    setFilterdData(searchedData); // Assuming 'setFilterdData' updates the displayed list
  };

  // This function open model and add invoice data in local storage
  const handleShowDetails = (invoice: InvoicePrameter): void => {
    const jsonInvoice = JSON.stringify(invoice);
    localStorage.setItem("finalInvoice", jsonInvoice);
    openModal("Invoice-Details");
  };

  // This function payment model and add invoice data in local storage
  const handlePay = (invoice: InvoicePrameter): void => {
    const jsonInvoice = JSON.stringify(invoice);
    localStorage.setItem("finalInvoice", jsonInvoice);
    openModal("Payment");
  };

  useEffect(() => {
    const getStats = () => {
      window.ipc.send("tracks", {});

      window.ipc.on("tracks", (res: APiRes) => {
        if (res.success) {
          setStats(res.data);
        } else {
          toast.error(res.message);
        }
      });
    };

    const getMonthlyInvoice = () => {
      window.ipc.send("fetchmonthlyinvoice", { pageNo: currentPage });

      window.ipc.on("fetchmonthlyinvoice", (res: APiRes) => {
        if (res?.success) {
          setInvoices(res?.data?.invoices);
          setFilterdData(res?.data?.invoices);
          setCurrentPage(res?.data?.currentPage);
          setTotalPages(res?.data?.totalPages);
        } else {
          toast.error(res.message);
        }
      });
    };

    getMonthlyInvoice();
    getStats();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{appTitle}</title>
      </Head>
      <div className=" bg-primary-50 h-auto overflow-auto">
        <Modal
          type={modal.type}
          isOpen={modal.isOpen}
          onClose={closeModal}
          modalData={filteredData}
        />
        <Header title="Dashboard" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-2">
          {stats.map((stat) => (
            <div key={stat.title} className="rounded-lg ">
              <div className="rounded-lg border border-primary-800">
                <div className="flex flex-col px-4 py-2">
                  <div className="flex items-center justify-center gap-1">
                    <ServerIconRenderer iconName={stat.icon} />
                    <h3 className="text-gray-800 text-medium font-semibold">
                      {stat.title}
                    </h3>
                  </div>
                  <p className="text-2xl font-semibold text-center text-primary-800">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-primary-50 mb-1 border border-primary-800">
          <div className="flex justify-between items-center p-1">
            <h2 className="text-xl font-bold ml-2 text-primary-950">
              Monthly Invoices
            </h2>
            <form className=" p-1 flex gap-2">
              <select
                id="search"
                className="bg-primary-50 border border-primary-800 text-primary-800 text-sm rounded-md focus:outline-primary-800 block w-30 p-1.5"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option defaultValue="invoiceNo">invoiceNo</option>
                <option value="customerName">Customer Name</option>
              </select>
              <div>
                <input
                  type="text"
                  className="bg-primary-50 border border-primary-800 text-primary-800 text-sm font-semibold rounded-md focus:outline-primary-800 block w-52 p-1.5 px-2 placeholder:px-1"
                  placeholder="Search"
                  value={search}
                  onChange={handleSearchInvoice}
                  required
                />
              </div>
            </form>
          </div>
          <hr />
          <DataTable
            columns={columns}
            data={filteredData}
            onShowDetails={handleShowDetails}
            onPay={handlePay}
            defaultPageSize={20}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            height="240px"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

DashboardPage.getLayout = (page: ReactElement) => {
  return <RootLayout>{page}</RootLayout>;
};

export default DashboardPage;
