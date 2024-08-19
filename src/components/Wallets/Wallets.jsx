import React, { useContext, useState } from "react";
import Cards from "./Cards";
import metamask_logo from "../../assets/metamask_fox.png";
import coinbase_logo from "../../assets/coinbase_logo.png";
import electrum_logo from "../../assets/electrum_logo.png";
import { ethers } from "ethers";
import { WalletContext } from "../../context/WalletContext";

const Wallets = () => {
  const { walletAddress, setWalletAddress, connectWallet, disconnectWallet } =
    useContext(WalletContext);
  const [input, setInput] = useState("");
  const handleInputChange = (event) => {
    setInput(event.target.value); // Only update the address state
  };

  const connectWithAddress = async () => {
    try {
      const provider = new ethers.providers.InfuraProvider("mainnet", {
        projectId: process.env.REACT_APP_INFURA_PROJECT_ID,
        projectSecret: process.env.REACT_APP_INFURA_PROJECT_SECRET,
      });

      let resolvedAddress = input;

      // Resolve ENS to address if necessary
      if (input.endsWith(".eth")) {
        resolvedAddress = await provider.resolveName(input);
        if (!resolvedAddress) {
          alert("Failed to resolve ENS name.");
          return;
        }
      }

      // Validate address
      if (!ethers.utils.isAddress(resolvedAddress)) {
        alert("Please enter a valid Ethereum address or ENS name.");
        return;
      }

      // Fetch and log balance
      const balance = await provider.getBalance(resolvedAddress);
      console.log(
        `Balance of ${resolvedAddress}:`,
        ethers.utils.formatEther(balance)
      );

      // Simulate connection by saving the address and provider
      connectWallet(resolvedAddress, provider);
      setInput(""); // Clear input field after successful connection
      alert("Connected successfully with the provided address!");
    } catch (error) {
      console.error("Failed to connect with the provided address:", error);
      alert("Failed to connect with the provided address. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      {walletAddress ? (
        <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md mx-28">
          <div className="mb-4">
            <p className="text-gray-700">
              <strong>Connected Wallet:</strong> {walletAddress}
            </p>
            <button
              onClick={disconnectWallet}
              className="mt-2 text-sm text-red-500 hover:underline"
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="m-3 mx-0 flex flex-col sm:flex-row justify-center">
            <Cards logo={metamask_logo} title="Metamask" />
            <Cards logo={coinbase_logo} title="Coinbase" />
            <Cards logo={electrum_logo} title="Binance" />
          </div>

          <h2 className="text-xl font-semibold text-gray-100 text-center pb-2">
            Can't find your wallet?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center">
            <input
              type="text"
              placeholder="Search for wallets..."
              className="text-black border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 sm:mb-0 sm:mr-2"
              value={input}
              onChange={handleInputChange} // Only update the input value
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={connectWithAddress} // Connect only when the button is clicked
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallets;
