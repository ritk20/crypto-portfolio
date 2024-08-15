import React from "react";
import logo from "../../assets/sperax_logo.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="sticky top-0 mx-auto flex w-full items-center justify-between bg-gradient-to-r from-blue-950 to-purple-800 py-5 px-2">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-10  px-2" />
          <h1 className="text-white text-lg font-medium">
            Cryp<span className="text-teal-300 ">Ax</span>
          </h1>
        </div>
        <button className="text-white font-medium ml-4 mr-0">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
