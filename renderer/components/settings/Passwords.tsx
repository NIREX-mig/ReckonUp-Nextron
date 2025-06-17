import React from "react";
import Profile from "./Profile";
import SettingPassword from "./SettingPassword";

const Passwords = () => {
  return (
    <div className="flex flex-col gap-5">
      <Profile />
      <hr />
      <SettingPassword />
    </div>
  );
};

export default Passwords;
