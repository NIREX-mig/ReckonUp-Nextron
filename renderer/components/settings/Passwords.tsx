import React from "react";
import Profile from "./Profile";
import SettingPassword from "./SettingPassword";
import ManualBackup from "../Backup";

const Passwords = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-5">
        <Profile />
        <hr />
        <SettingPassword />
      </div>
      <div className="px-2">
        <h2 className="font-semibold text-xl mb-2">Backup System</h2>
        <ManualBackup/>
        <div>
        <h2 className="font-semibold text-xl my-2">Import Backup From Cloud</h2>
        <ManualBackup/>
        </div>
      </div>
    </div>
  );
};

export default Passwords;
