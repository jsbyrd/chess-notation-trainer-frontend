import Navbar from "@/components/Navbar/Navbar";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const Template = () => {
  return (
    <div className="flex flex-col h-screen bg-neutral-100">
      <Header />
      <div className="flex overflow-y-auto h-full">
        <Navbar />
        <div className="flex-grow overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Template;
