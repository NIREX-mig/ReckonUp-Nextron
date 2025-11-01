import Link from "next/link";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import Button from "../ui/Button";
import Input from "../ui/Input";

const ForgotContainer = ({
  handleOnChange,
  username,
  handleUsernameSubmit,
  loading,
}) => {
  return (
    <div className="w-[30rem] bg-primary-50">
      <h3 className="text-center font-bold text-4xl mb-4 text-primary-900">
        Forgot Password
      </h3>
      <p className="text-center text-lg mb-5 text-primary-800">
        Provide Your Username To Reset Your Password!
      </p>

      <form onSubmit={handleUsernameSubmit} className="p-4 w-[27rem] mx-auto">
        <Input
          lable="Username"
          lableStyle="text-black font-semibold"
          className="w-full bg-primary-50 border border-primary-900 text-primary-900 text-md font-semibold rounded-md focus:outline-primary-900 block p-2 placeholder:px-1 indent-8 mb-5"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={handleOnChange}
          placeholder="Username"
          icon={<FaRegUser className="text-primary-900" />}
          col
          readOnly
          required
        />

        <Button
          buttonType="submit"
          title={"Next"}
          extraClass="font-semibold py-2 bg-primary-800 text-white w-full"
          loading={loading}
          disabled={loading}
        />
      </form>
      <p className=" px-8 flex text-base font-bold text-primary-800">
        Want Login in account{" "}
        <Link
          href="/home"
          draggable="false"
          className="font-medium text-base mx-1 text-secondry-600 hover:underline"
        >
          Login
        </Link>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mx-1 my-1 text-secondry-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </span>
      </p>
    </div>
  );
};

export default ForgotContainer;
