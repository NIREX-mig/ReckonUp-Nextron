import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFeild extends React.InputHTMLAttributes<HTMLInputElement> {
  lable?: string;
  lableStyle?: string;
  type: "text" | "number" | "date" | "password";
  placeholder?: string;
  value: string | number;
  otherStyle?: string;
  icon?: React.ReactElement;
  col?: boolean;
}

const Input = ({
  lable,
  lableStyle = "",
  type,
  placeholder,
  value,
  otherStyle = "",
  icon,
  col = false,
  ...rest
}: InputFeild) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;
  const iconOffset = icon
    ? "left-3 absolute top-2.5 h-5 w-5 text-primary-900"
    : "";

  return (
    <div className={`flex ${col && "flex-col"} items-center gap-2 justify-end`}>
      {lable && (
        <label htmlFor={lable} className={`text-sm w-full ${lableStyle}`}>
          {lable}
        </label>
      )}

      <div className="relative flex items-center justify-end w-full">
        {icon && (
          <div
            className={`absolute -translate-y-0.5 ${iconOffset} text-secondry pointer-events-none z-10`}
          >
            {React.cloneElement(icon, { size: 20 })}
          </div>
        )}

        <input
          type={inputType}
          autoComplete="off"
          onFocus={(e) => e.target.select()}
          value={value}
          className={`bg-primary-50 border border-primary-800 text-primary-900 text-sm font-semibold rounded-md focus:outline-primary-900 inline-block py-1.5 px-2 ${otherStyle}`}
          placeholder={placeholder}
          {...rest}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-secondry hover:text-accent transition-colors duration-200 p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FaEye size={20} className="text-gray-600" />
            ) : (
              <FaEyeSlash size={20} className="text-gray-600" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
