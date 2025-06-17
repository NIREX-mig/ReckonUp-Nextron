import React, { useEffect, useState } from "react";
import { APiRes } from "../../types";
import toast from "react-hot-toast";

const InvoiceSetting = () => {
  const [invoiceType, setInvoiceType] = useState<string>("");

  useEffect(() => {
    window.ipc.send("getInvoiceType", {});

    const getListener = (res: APiRes) => {
      if (res.success) {
        setInvoiceType(res.data);
      }
    };

    window.ipc.on("getInvoiceType", getListener);
  }, []);

  useEffect(() => {
    if (!invoiceType) return;

    window.ipc.send("setInvoiceType", { invoiceType });

    const setListener = (res: APiRes) => {
      if (res.success) {
        toast.success("Invoice type set successfully");
      }
    };

    window.ipc.on("setInvoiceType", setListener);
  }, [invoiceType]);

  const handleInvoiceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    setInvoiceType(newType); // this will trigger useEffect
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 text-primary-900">
        Invoices Settings
      </h2>
      <div className="w-64">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Invoice Type
        </label>
        <select
          value={invoiceType}
          onChange={handleInvoiceTypeChange}
          className="bg-primary-100 border border-primary-800 disabled:border-gray-300 text-gray-900 text-sm rounded-md focus:outline-primary-900 block py-1.5 px-5"
        >
          <option value="invoice1">Invoice 1</option>
          <option value="invoice2">Invoice 2</option>
        </select>
      </div>
    </section>
  );
};

export default InvoiceSetting;
