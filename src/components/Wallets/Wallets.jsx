import React, { useState } from "react";
import Cards from "./Cards";
import metamask_logo from "../../assets/metamask_fox.png";
import coinbase_logo from "../../assets/coinbase_logo.png";
import electrum_logo from "../../assets/electrum_logo.png";
import { ethers } from "ethers";

const Wallets = () => {
  const ProjectId = process.env.REACT_APP_INFURA_PROJECT_ID;
  const ProjectSecret = process.env.REACT_APP_INFURA_PROJECT_SECRET;

  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const handleInputChange = (event) => {
    setWalletAddress(event.target.value);
  };

  const connectWithAddress = async () => {
    try {
      const provider = new ethers.providers.InfuraProvider("mainnet", {
        projectId: ProjectId,
        projectSecret: ProjectSecret,
      });
      // Validate the input address or ENS name
      if (
        !ethers.utils.isAddress(walletAddress) &&
        !walletAddress.endsWith(".eth")
      ) {
        alert("Please enter a valid Ethereum address or ENS name.");
        return;
      }

      const balance = await provider.getBalance(walletAddress);
      console.log(
        `Balance of ${walletAddress}:`,
        ethers.utils.formatEther(balance)
      );

      setIsConnected(true);
    } catch (error) {
      console.error("Failed to connect with the provided address:", error);
    }
  };
  return (
    <>
      <div className="m-3 mx-0 flex justify-center">
        <Cards logo={metamask_logo} title="Metamask" />
        <Cards logo={coinbase_logo} title="Coinbase" />
        <Cards logo={electrum_logo} title="Binance" />
      </div>
      <h2 className="text1xl font-semibold text-gray-100 text-center pb-2">
        Can't find your wallet?
      </h2>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search for wallets..."
          className="text-black border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={walletAddress}
          onChange={handleInputChange}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={connectWithAddress}
        >
          Search
        </button>
      </div>
    </>
  );
};

export default Wallets;
