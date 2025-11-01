import React from "react";
import { FaUnlockAlt } from "react-icons/fa";
import Button from "../ui/Button";
import { AiOutlineLoading } from "react-icons/ai";
import Input from "../ui/Input";

const NewPasswordContainer = ({
  formData,
  setFormData,
  handleNewPasswordSubmit,
  loading,
}) => {
  const handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="w-[30rem] bg-primary-50">
      <h3 className="text-center font-bold text-4xl mb-4  text-primary-900">
        New Credentials
      </h3>
      <p className="text-center text-lg font-bold mb-1 text-primary-800">
        Your identity has been verified!
      </p>
      <p className="text-center text-lg mb-1 text-primary-800 font-semibold">
        Set your new password.
      </p>

      <form
        onSubmit={handleNewPasswordSubmit}
        className="p-4 w-[27rem] mx-auto flex flex-col space-y-5"
      >
        <Input
          lable="New Password"
          lableStyle="text-black font-semibold"
          className="w-full bg-primary-50 border border-primary-900 text-primary-900 text-md font-semibold rounded-md focus:outline-primary-900 block p-2 placeholder:px-1 indent-8"
          type="password"
          name="newpassword"
          autoComplete="off"
          value={formData.newpassword}
          onChange={handleOnChange}
          icon={<FaUnlockAlt className="text-primary-900" />}
          placeholder="New Password"
          col
          required
        />

        <Input
          lable="Confirm Password"
          lableStyle="text-black font-semibold"
          className="w-full bg-primary-50 border border-primary-900 text-primary-900 text-md font-semibold rounded-md focus:outline-primary-900 block p-2 placeholder:px-1 indent-8"
          type="password"
          name="comfirmpassword"
          autoComplete="off"
          value={formData.comfirmpassword}
          onChange={handleOnChange}
          icon={<FaUnlockAlt className="text-primary-900" />}
          placeholder="Confirm Password"
          col
          required
        />

        <Button
          buttonType="submit"
          title={"Submit"}
          extraClass="font-semibold py-2 bg-primary-800 text-white w-full mt-5"
          loading={loading}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default NewPasswordContainer;
