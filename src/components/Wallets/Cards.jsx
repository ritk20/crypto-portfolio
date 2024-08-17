import React, { useState } from "react";
import { ethers } from "ethers"; // Add this line to import ethers

const Cards = ({ logo, title }) => {
  const [walletAddress, setWalletAddress] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async (walletType) => {
    let provider;

    try {
      if (walletType === "binance") {
        if (window.BinanceChain) {
          await window.BinanceChain.request({ method: "eth_requestAccounts" });
          provider = new ethers.providers.Web3Provider(window.BinanceChain);
          console.log("Binance Wallet Connected");
        } else {
          alert("Please install Binance Wallet!");
          return;
        }
      } else if (walletType === "metamask") {
        if (window.ethereum) {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          provider = new ethers.providers.Web3Provider(window.ethereum);
          console.log("Metamask Wallet Connected");
        } else {
          alert("Please install MetaMask!");
          return;
        }
      } else if (walletType === "coinbase") {
        if (window.ethereum && window.ethereum.isCoinbaseWallet) {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          provider = new ethers.providers.Web3Provider(window.ethereum);
          console.log("Coinbase Wallet Connected");
        } else {
          alert("Please install Coinbase Wallet!");
          return;
        }
      }
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setWalletAddress(...walletAddress, userAddress);
      setIsConnected(true);
      console.log(`Connected to ${walletType} Wallet:`, userAddress);
      const balance = await provider.getBalance("ethers.eth");
      console.log("Balance:", ethers.utils.formatEther(balance));
    } catch (error) {
      console.error(`Failed to connect with ${walletType} wallet:`, error);
    }
  };

  return (
    <div className="max-w-32 m-2 px-0 py-2 rounded-md overflow-hidden shadow-xl bg-gray-900">
      <div className="mx-auto mt-3 flex w-10 justify-center items-center">
        <img src={logo} alt="logo" className="h-10" />
      </div>
      <div className="py-1">
        <h2 className="text-gray-100 text-center text-base">{title}</h2>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2.5 rounded"
          onClick={() => connectWallet(title.toLowerCase())}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default Cards;
