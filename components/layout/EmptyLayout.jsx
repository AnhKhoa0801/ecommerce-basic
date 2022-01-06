import Header from "components/Header";
import React from "react";

const EmptyLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
};

export default EmptyLayout;
