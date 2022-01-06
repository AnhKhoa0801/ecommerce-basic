import Header from "components/Header";
import Navbar from "components/Navbar";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
