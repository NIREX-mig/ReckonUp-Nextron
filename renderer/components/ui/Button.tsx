import React from "react";
import { ImSpinner } from "react-icons/im";

interface CustomButtonProps {
  title: string;
  icon?: React.ReactNode;
  extraClass?: string;
  buttonType?: "submit" | "reset" | "button";
  disabled?: boolean;
  loading?: boolean;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  title,
  extraClass = "",
  icon,
  handleClick,
  disabled,
  buttonType = "button",
  loading = false,
}: CustomButtonProps) => {
  return (
    <button
      type={buttonType}
      className={`relative inline-flex items-center justify-center disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed rounded-md px-4 py-1 font-semibold ease-in-out mx-auto active:scale-95 transition-all duration-300  ${extraClass}`}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center text-primary-900">
          <ImSpinner className="animate-spin h-5 w-5" />
        </span>
      )}

      <div className={`flex items-center gap-2 transition-opacity duration-150 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {icon && icon} 
        <span className="truncate">{title}</span>
      </div>
    </button>
  );
};

export default Button;
