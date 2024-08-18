import React from "react";
import Wallets from "../../components/Wallets/Wallets";
import Search from "../../components/Search/Search";
import Transfer from "../../components/Transfer/Transfer";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Charts from "../../components/Charts/Charts";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full ml-5 px-2 md:px-6 lg:px-10">
      <Navbar />
      <div className="text-white mx-5">
        <h1 className="text-center font-bold text-2xl md:text-4xl lg:text-5xl mb-4">
          The Best{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            Crypto
          </span>{" "}
          Portfolio App
        </h1>
        <h2 className="mt-16 text-left font-bold text-xl md:text-3xl lg:text-4xl mb-4">
          Track your portfolio's performance with real-time data
        </h2>
        <Charts />

        <div className="features">
          <div className="text-center mb-8">
            <h2 className="font-bold text-xl md:text-3xl lg:text-4xl mb-4">
              Connect With The Most Popular Wallets With A Single Click
            </h2>
            <Wallets />
            <Search />
          </div>

          <div className="flex flex-col lg:flex-row container mx-auto px-4 py-8">
            <div className="lg:w-3/5 m-5 p-2">
              <h2 className="font-bold text-xl md:text-3xl lg:text-4xl mb-4 text-center">
                Track Your Crypto With Our Token Tracker
              </h2>
              <p className="text-justify text-base md:text-lg lg:text-xl">
                Effortlessly include your preferred tokens in your watchlist and
                monitor their real-time performance seamlessly
              </p>
            </div>
            <div className="lg:w-2/5 flex justify-center items-center">
              <button
                onClick={() => {
                  navigate("/list");
                }}
                className="w-full lg:w-3/4 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                My List
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row container mx-auto px-4 py-8">
            <div className="lg:w-3/5 m-5 p-2">
              <h2 className="font-bold text-xl md:text-3xl lg:text-4xl mb-4 text-center">
                Seamlessly Transfer Tokens Across Addresses
              </h2>
              <p className="text-justify text-base md:text-lg lg:text-xl">
                Easily facilitate transactions and transfer tokens across
                various wallets with minimal effort. Our transactions are
                guaranteed to be 100% secure and executed at lightning speed.
              </p>
            </div>
            <div className="lg:w-2/5 flex justify-center items-center">
              <button
                onClick={() => {
                  navigate("/transfer");
                }}
                className="w-full lg:w-3/4 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Transfer Tokens
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row container mx-auto px-4 py-8">
            <div className="lg:w-3/5 m-5 p-2">
              <h2 className="font-bold text-xl md:text-3xl lg:text-4xl mb-4 text-center">
                Check Allowance Across Various Smart Contracts
              </h2>
              <p className="text-justify text-base md:text-lg lg:text-xl">
                Quickly and easily review your various smart contracts for
                spending tokens and NFTs. Conveniently revoke approvals you no
                longer require.
              </p>
            </div>
            <div className="lg:w-2/5 flex justify-center items-center">
              <button
                onClick={() => {
                  navigate("/allowance");
                }}
                className="w-full lg:w-3/4 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Check Allowances
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
