import React from "react";

const Header = ({ gstNo }) => {
  return (
    <div className="flex justify-between border-b border-black pb-1">
      <div>GSTIN No. : {gstNo}</div>
    </div>
  );
};

export default Header;
