import React from "react";

const ProductDetails = ({ productList }) => {
  return (
    <table className="w-full border border-black mb-2">
      <thead className="bg-gray-200">
        <tr>
          <th className="border border-black">SL. No.</th>
          <th className="border border-black">Item Name & Description</th>
          <th className="border border-black">Category</th>
          <th className="border border-black">Purity</th>
          <th className="border border-black">Rate/Gm</th>
          <th className="border border-black">Weight (gm)</th>
          <th className="border border-black">Quantity</th>
          <th className="border border-black">Making (%)</th>
          <th className="border border-black">Total Value</th>
        </tr>
      </thead>
      <tbody>
        {productList?.map((product, index) => {
          return (
            <tr key={index} className="text-center">
              <td className="border border-black">{index + 1}</td>
              <td className="border border-black">{product.name}</td>
              <td className="border border-black">{product.category}</td>
              <td className="border border-black">
                {product?.purity === "" || product?.purity === null
                  ? " - "
                  : product.purity}
              </td>
              <td className="border border-black">{product.rate}</td>
              <td className="border border-black">{product.weight}</td>
              <td className="border border-black">{product.quantity}</td>
              <td className="border border-black">{product.makingCost}</td>
              <td className="border border-black">{`₹ ${product.amount}`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductDetails;
