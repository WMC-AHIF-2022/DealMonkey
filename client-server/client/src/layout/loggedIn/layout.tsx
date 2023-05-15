import { ChildProcess } from "child_process";
import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

const LoggedInLayout = ({ children }: any) => {
  return (
    <div className="wrapper">
      <Navbar />
      <div className="font mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 lg:mt-8">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default LoggedInLayout;
