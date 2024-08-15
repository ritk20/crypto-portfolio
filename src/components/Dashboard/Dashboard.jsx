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
      <div className="bg-gradient-to-r from-blue-950 to-purple-800 p-4 h-screen text-white">
        <h1 className="text-center font-bold text-2xl md:text-4xl lg:text-5xl mb-4">
          The Best{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            Crypto
          </span>{" "}
          Portfolio App
        </h1>
        <p className="mt-16 text-left font-bold text-1xl md:text-3xl lg:text-4xl mb-4">
          Track your portfolio's performance with real-time data
        </p>
        <Charts />

        <div className="features">
          <div className="connect">
            <h2>Connect With The Most Popular Wallets With A Single Click</h2>
            <Wallets />
            <Search />
          </div>

          <div className="track">
            <h2>Track Your Tokens</h2>
            <Tokens token={"Bitcoin"} />
          </div>

          <div className="Transfer">
            <h2>Seamlessly Transfer Tokens Across Addresses</h2>
            <Transfer />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
