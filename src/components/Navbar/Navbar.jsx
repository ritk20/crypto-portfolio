import React from "react";
import logo from "../../assets/sperax_logo.png";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-[20] mx-auto flex w-full items-center justify-between bg-gray-900">
      <NavbarIcons icon={<GiHamburgerMenu />} />
      <img src={logo} alt="website logo" className="w-12 h-12" />
      <ul className="flex justify-between w-1/5">
        <li className="mx-2 text-white">Cryptos</li>
        <li className="mx-2 text-white">My List</li>
        <li className="mx-2 text-white">Transfer</li>
        <li className="mx-2 text-white">Login</li>
      </ul>
    </div>
  );
};

const NavbarIcons = ({ icon }) => (
  <div className="text-white mx-1 h-5">{icon}</div>
);

export default Navbar;
