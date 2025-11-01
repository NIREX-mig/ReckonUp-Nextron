import Link from "next/link";
import React from "react";
import { MdPendingActions } from "react-icons/md";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <h1 className="text-[23px] tracking-wider font-bold text-primary-800 my-3">
      {title}
    </h1>
  );
};

export default Header;
