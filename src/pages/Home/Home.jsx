import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Wallets from "../../components/Wallets/Wallets";
import Search from "../../components/Search/Search";
import Tokens from "../../components/Tokens/Tokens";
import Transfer from "../../components/Transfer/Transfer";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <h1>The Best Crypto Portfolio App</h1>
      <p>Track your portfolio's performance with real-time data</p>

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

      <Sidebar />
      <Footer />
    </div>
  );
};

export default Home;
