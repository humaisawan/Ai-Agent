import React from "react";
import logo from "../assets/images/logo.png";

const Header = () => {
  return (
    <div className="flex justify-center items-center bg-stone-900 text-zinc-100 h-28 text-3xl font-urbanist font-extrabold">
      <div className="w-72">
        <img src={logo} className="h-full w-full" />
      </div>
    </div>
  );
};

export default Header;
