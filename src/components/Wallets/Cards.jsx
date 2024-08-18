import React, { useContext } from "react";
import { ethers } from "ethers";
import { WalletContext } from "../../context/WalletContext";

const Cards = ({ logo, title }) => {
  const { setWalletAddress, connectWallet } = useContext(WalletContext);

  const connectWithProvider = async (provider) => {
    try {
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      setWalletAddress(userAddress); // This should now correctly update the wallet address

      console.log(`Connected to ${title} Wallet:`, userAddress);
      connectWallet(userAddress, provider); // Save the connection details to the context

      const balance = await provider.getBalance(userAddress);
      console.log("Balance:", ethers.utils.formatEther(balance));
    } catch (error) {
      console.error(`Failed to connect with ${title} wallet:`, error);
    }
  };

  const connectWalletHandler = async () => {
    let provider;

    if (title === "Binance") {
      if (window.BinanceChain) {
        await window.BinanceChain.request({ method: "eth_requestAccounts" });
        provider = new ethers.providers.Web3Provider(window.BinanceChain);
      } else {
        alert("Please install Binance Wallet!");
        return;
      }
    } else if (title === "Metamask") {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.providers.Web3Provider(window.ethereum);
      } else {
        alert("Please install MetaMask!");
        return;
      }
    } else if (title === "Coinbase") {
      if (window.ethereum && window.ethereum.isCoinbaseWallet) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        provider = new ethers.providers.Web3Provider(window.ethereum);
      } else {
        alert("Please install Coinbase Wallet!");
        return;
      }
    }

    if (provider) {
      connectWithProvider(provider);
    }
  };

  return (
    <div className="max-w-xs m-2 px-4 py-6 rounded-md overflow-hidden shadow-xl bg-gray-900 sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <div className="mx-auto mt-3 flex w-16 justify-center items-center sm:w-20 md:w-24 lg:w-28 xl:w-32">
        <img
          src={logo}
          alt={`${title} logo`}
          className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20"
        />
      </div>
      <div className="py-2">
        <h2 className="text-gray-100 text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
          {title}
        </h2>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded sm:py-2.5 sm:px-5 md:py-3 md:px-6 lg:py-3.5 lg:px-7 xl:py-4 xl:px-8"
          onClick={connectWalletHandler}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default Cards;
