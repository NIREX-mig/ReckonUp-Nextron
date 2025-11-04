import moment from "moment";
import React, { useState, useMemo } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Button from "./Button";

interface Payment {
  paidAmount: number;
}

interface DataRow {
  invoiceNo?: string;
  name?: string;
  address?: string;
  createdAt?: string;
  totalAmount?: number;
  discount?: number;
  dueAmount?: number;
  status?: string;
  payments?: Payment[];
}

interface DataTableProps {
  columns: { key: string; label: string }[];
  data: DataRow[];
  onShowDetails: (row: DataRow) => void;
  onPay: (row: DataRow) => void;
  height: string;
  defaultPageSize?: number;
  currentPage?: number;
  setCurrentPage?: any;
  totalPages?: number;
  Discount?: boolean;
  details?: boolean;
}

const DataTable = ({
  columns,
  data,
  onShowDetails,
  onPay,
  defaultPageSize = 20,
  height,
  Discount,
  currentPage,
  setCurrentPage,
  totalPages,
  details = true,
}: DataTableProps) => {
  const [filter, setFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [pageSize, setPageSize] = useState(defaultPageSize);

  // ---- Filter Logic ----
  const filteredData = useMemo(() => {
    return data?.filter((row) =>
      Object.values(row)?.some((value) =>
        String(value).toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [data, filter]);

  // ---- Sorting Logic ----
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfig]);

  // ---- Pagination Logic ----
  // const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData?.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // ---- Sorting Handler ----
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <section className="w-full">
      <div className={`overflow-x-auto min-h-[calc(100vh-${height})]`}>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-primary-800 text-white">
              {columns?.map((col: any) => (
                <th
                  key={col?.key}
                  className="text-left px-4 py-2 font-semibold cursor-pointer select-none"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col?.label}
                    {sortConfig?.key === col?.key &&
                      (sortConfig?.direction === "asc" ? (
                        <FaArrowUp size={14} />
                      ) : (
                        <FaArrowDown size={14} />
                      ))}
                  </div>
                </th>
              ))}
              <th className="px-4 py-2 font-semibold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.length > 0 ? (
              paginatedData?.map((row, index) => {
                const totalPaid = row?.payments?.reduce(
                  (sum, p) => sum + p.paidAmount,
                  0
                );
                return (
                  <tr
                    key={index}
                    //   className={`cursor-pointer hover:bg-primary-200 ${
                    //       selectedRow === index ? "bg-primary-300" : ""
                    //     }`
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-2 py-[4px] font-medium whitespace-nowrap">
                      {row?.invoiceNo}
                    </td>
                    <td className="px-2 py-[4px] font-medium capitalize whitespace-nowrap">
                      {row?.name}
                    </td>
                    <td className="px-4 font-medium capitalize whitespace-nowrap">
                      {row?.address}
                    </td>
                    <td className="px-4 font-medium whitespace-nowrap">
                      {moment(row?.createdAt).format("MMM DD, YYYY")}
                    </td>
                    <td className="px-4 font-medium whitespace-nowrap">
                      ₹{row?.totalAmount}
                    </td>
                    <td className="px-4 font-medium whitespace-nowrap">
                      ₹{totalPaid}
                    </td>
                    {Discount && (
                      <td className="px-4 font-medium whitespace-nowrap">
                        ₹{row?.discount}
                      </td>
                    )}
                    <td className="px-4 font-medium whitespace-nowrap">
                      ₹{row?.dueAmount}
                    </td>
                    <td className="px-4 font-medium whitespace-nowrap">
                      {row?.dueAmount === 0 ? (
                        <span className="text-xs font-semibold px-3 rounded-full py-0.5 bg-green-500 text-white uppercase">
                          Paid
                        </span>
                      ) : (
                        <span className="text-xs font-semibold px-3 rounded-full py-0.5  bg-red-600 text-white uppercase">
                          due
                        </span>
                      )}
                    </td>

                    <td className="p-1 flex">
                      {details && (
                        <Button
                          buttonType="button"
                          handleClick={() => onShowDetails(row)}
                          extraClass="bg-primary-800 text-white"
                          title="Details"
                        />
                      )}
                      <Button
                        buttonType="button"
                        handleClick={() => onPay(row)}
                        extraClass="bg-primary-800 text-white"
                        title="pay"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns?.length + 1}
                  className="text-center text-primary-800 text-lg font-semibold py-6"
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination + Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3 font-medium mx-2 mb-2">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Rows per page: {defaultPageSize}</span>
          <span className="ml-2">
            ( {filteredData?.length === undefined ? 0 : filteredData.length}{" "}
            record{filteredData?.length !== 1 ? "s" : ""} )
          </span>
        </div>

        <div className="flex items-center space-x-3 text-sm">
          <span className="text-gray-600">
            Page {currentPage} of {totalPages || 1}
          </span>
          <div className="flex items-center space-x-1">
            <button
              className="p-2 border rounded-lg disabled:opacity-50 border-primary-800 hover:bg-primary-800 hover:text-white text-primary-800 "
              onClick={() => setCurrentPage((prev) => Math.max(prev + 1, 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft size={18} />
            </button>
            <button
              className="p-2 border rounded-lg disabled:opacity-50 border-primary-800 hover:bg-primary-800 hover:text-white text-primary-800 "
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev - 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <FaChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataTable;
