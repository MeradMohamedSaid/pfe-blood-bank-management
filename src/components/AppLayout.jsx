import React from "react";
import Navbar from "./Navbar";
import footerImg from "../assets/footer.png";

export const AppLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <footer className="absolute bottom-0 -z-10">
        <img src={footerImg} />
      </footer>
    </div>
  );
};
