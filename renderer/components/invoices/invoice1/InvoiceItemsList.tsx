import React from "react";

const InvoiceItemsList = ({ productList }) => {
  return (
    <div className="py-2">
      <table className="w-full mb-3">
        <thead className="text-green-600 text-[12px] capitalize">
          <tr className="border-b">
            <th className="text-center">SNo</th>
            <th className="text-center w-[12rem]">Product Name</th>
            <th className="text-center">Category</th>
            <th className="text-center">Weight (g)</th>
            <th className="text-center">purity</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Rate</th>
            <th className="text-center">Making(%)</th>
            <th className="text-center w-[8rem]">Total</th>
          </tr>
        </thead>
        <tbody>
          {productList?.map((product, index) => {
            return (
              <tr key={index} className="border-b text-[12px]">
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{product.name}</td>
                <td className="text-center">{product.category}</td>
                <td className="text-center">{product.weight}</td>
                <td className="text-center">
                  {product.purity === "" || product.purity === null
                    ? "-"
                    : product.purity}
                </td>
                <td className="text-center">{product.quantity}</td>
                <td className="text-center">{product.rate}</td>
                <td className="text-center">{product.makingCost}</td>
                <td className="text-center">{`₹ ${product.amount}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceItemsList;
