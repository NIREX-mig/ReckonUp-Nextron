import { Toaster } from "react-hot-toast";
import SideBar from "./SideBar";

export default function RootLayout({ children }) {
  return (
    <section className="flex bg-primary-50 ">
      <SideBar />
      <main className="w-full mx-2 h-screen overflow-auto bg-primary-50">
        <Toaster />
        {children}
      </main>
    </section>
  );
}
