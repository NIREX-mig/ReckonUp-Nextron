import React from "react";

const ShopDetail = ({
  logoSrc,
  shopName,
  shopAddress,
  phoneNo,
  whatsappNo,
}) => {
  return (
    <div className="flex justify-between py-[2px]">
      <div className="flex">
        <div className="h-[60px] w-[60px] mx-4">
          <img src={logoSrc} alt="Logo" className="h-[60px] w-[60px]" />
        </div>
        <div className="font-[Raleway]">
          <h1 className="bg-gradient-to-r from-green-600 via-green-500 to-green-300 bg-[200%_auto] bg-clip-text text-[22px] p-1 font-semibold  text-transparent">
            {shopName}
          </h1>
          <p className="text-[13px] mt-[2px] text-[#333]">{shopAddress}</p>
          <p className="text-[13px] text-[#333]">
            {phoneNo} {whatsappNo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
