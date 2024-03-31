import React from "react";
import Navbar from "./Navbar";


export const AppLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      
    </div>
  );
};
