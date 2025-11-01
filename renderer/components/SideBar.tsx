import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiFileText, FiLogOut, FiSettings } from "react-icons/fi";
import { ImStatsBars } from "react-icons/im";
import { MdOutlinePostAdd, MdPayment } from "react-icons/md";
import { useRouter } from "next/router";
import { APiRes } from "../types";
import Button from "./ui/Button";

const SideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  // Define the menu items with their respective paths and icons

  const menuItems = [
    { name: "Dashboard", path: "/dashboard/", icon: LuLayoutDashboard },
    {
      name: "New Invoice",
      path: "/dashboard/invoice/",
      icon: MdOutlinePostAdd,
    },
    { name: "View Invoices", path: "/dashboard/search/", icon: FiFileText },
    { name: "Due Payments", path: "/dashboard/duehistory/", icon: MdPayment },
    { name: "Reports", path: "/dashboard/reports/", icon: ImStatsBars },
    { name: "Settings", path: "/dashboard/settings/", icon: FiSettings },
  ];

  const handleLogOut = () => {
    // Perform logout logic here
    window.ipc.send("logout", {});
    window.ipc.on("logout", (res: APiRes) => {
      // Handle successful logout
      if (res.success) {
        window.localStorage.removeItem("logedinUser");
        router.push("/home");
      }
    });
  };

  return (
    <aside className="w-[220px] h-screen bg-primary-50 border-r border-primary-800">
      <div className={`flex items-center p-2`}>
        <img
          src="/app_logo.png"
          alt="logo"
          className="w-[40px]"
          draggable="false"
        />
        <p className="font-bold text-2xl">
          <span className="text-primary-900">Reckon</span>
          <span className="text-primary-700">Up</span>
        </p>
      </div>

      <div className="flex flex-col justify-between h-[calc(100vh-64px)]">
        <nav
          className={`flex items-center flex-1 flex-col gap-y-1 p-2 text-gray-600`}
        >
          {menuItems.map((menu, index) => {
            return (
              <Link
                key={index}
                href={menu.path}
                draggable="false"
                className={`w-full flex items-center py-2 px-3 hover:bg-primary-200 hover:rounded-lg group
                ${
                  pathname === menu.path &&
                  "rounded-lg bg-primary-200  before:absolute before:content-[''] before:w-[3px] before:h-5 before:bg-primary-700"
                }
                `}
              >
                <menu.icon
                  size={26}
                  className={`rounded-lg p-1 group-hover:text-primary-700  ${
                    pathname === menu.path && "text-primary-700"
                  }`}
                />
                <span
                  className={`ml-1 font-medium group-hover:text-primary-700 ${
                    pathname === menu.path && "text-primary-700"
                  }`}
                >
                  {menu.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <Button
          title="Logout"
          buttonType="button"
          handleClick={handleLogOut}
          icon={
            <FiLogOut size={26} className="rounded-lg p-1" />
          }
          extraClass=" w-[155px] border border-primary-600 hover:border-btnSecondary py-2 hover:bg-btnSecondary text-gray-600 hover:text-white text-primary-600"
        />
      </div>
    </aside>
  );
};

export default SideBar;
