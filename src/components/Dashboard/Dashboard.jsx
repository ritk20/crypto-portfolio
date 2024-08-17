import React from "react";
import Wallets from "../../components/Wallets/Wallets";
import Search from "../../components/Search/Search";
import Tokens from "../../components/Tokens/Tokens";
import Transfer from "../../components/Transfer/Transfer";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Charts from "../../components/Charts/Charts";

const Dashboard = () => {
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="text-white mx-5">
        <h1 className="text-center font-bold text-2xl md:text-4xl lg:text-5xl mb-4">
          The Best{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            Crypto
          </span>{" "}
          Portfolio App
        </h1>
        <h2 className="mt-16 text-left font-bold text-1xl md:text-3xl lg:text-4xl mb-4">
          Track your portfolio's performance with real-time data
        </h2>
        <Charts />

        <div className="features">
          <div className="text-center">
            <h2 className="font-bold text-1xl md:text-3xl lg:text-4xl mb-4">
              Connect With The Most Popular Wallets With A Single Click
            </h2>
            <Wallets />
            <Search />
          </div>

          <div className="text-center">
            <h2 className="font-bold text-1xl md:text-3xl lg:text-4xl mb-4">
              Track Your Tokens
            </h2>
            <Tokens />
          </div>

          <div>
            <h2 className="font-bold text-1xl md:text-3xl lg:text-4xl mb-4">
              Seamlessly Transfer Tokens Across Addresses
            </h2>
            <Transfer />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
