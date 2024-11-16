import React, { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";

const WVTopNavigation: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-l from-yellow-500 to-yellow-800 shadow-md fixed w-full top-0 z-10">
      {/* <nav className="bg-gradient-to-l from-yellow-500 to-yellow-800 shadow-md  w-full  z-10"> */}{" "}
      {/* Fixed at the top */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          {/* <img src="/path-to-your-logo.png" alt="Logo" className="h-8 w-8" /> */}
          <Link to={"/"}>
            <span className="font-bold text-3xl text-white tracking-widest">
              LI<span className="text-yellow-500 tracking-wider">BREW</span>HAN
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 ">
          <Link
            to={"/products"}
            className="text-white hover:text-yellow-700 text-lg"
          >
            Products
          </Link>
          <Link
            to={"/stores"}
            className="text-white hover:text-yellow-700 text-lg"
          >
            Stores
          </Link>
          <Link
            to={"/faq"}
            className="text-white hover:text-yellow-700 text-lg"
          >
            FAQ
          </Link>
          <Link
            to={"/about"}
            className="text-white hover:text-yellow-700 text-lg"
          >
            About
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <Hamburger toggled={isOpen} toggle={setOpen} color={"white"} />
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link to={"/products"} className="block px-4 py-2 hover:bg-gray-100">
            Products
          </Link>
          <Link to={"/stores"} className="block px-4 py-2 hover:bg-gray-100">
            Stores
          </Link>
          <Link to={"/faq"} className="block px-4 py-2 hover:bg-gray-100">
            FAQ
          </Link>
          <Link to={"/about"} className="block px-4 py-2 hover:bg-gray-100">
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

export default WVTopNavigation;
