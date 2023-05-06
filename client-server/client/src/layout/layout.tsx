import { ChildProcess } from "child_process";
import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Layout = ({ children }: any) => {
  return (
    <div>
      <Navbar />
      <div className="font mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
