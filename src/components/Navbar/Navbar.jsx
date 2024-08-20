import React from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full mx-1">
      <div className="sticky top-0 mx-auto flex w-full items-center justify-between py-5 px-2">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="w-10 px-2" />
          <h1 className="text-white text-lg font-medium">
            Cryp<span className="text-teal-300 ">Ax</span>
          </h1>
        </div>
        <button className="text-white font-medium mx-4">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
