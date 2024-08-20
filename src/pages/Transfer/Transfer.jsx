import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { WalletContext } from "../../context/WalletContext";
import Wallets from "../../components/Wallets/Wallets";
import Navbar from "../../components/Navbar/Navbar";

const TokenTransfer = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  const { walletAddress, disconnectWallet } = useContext(WalletContext);

  // ABI for ERC-20's transfer and balanceOf functions
  const erc20ABI = [
    "function transfer(address to, uint256 value) public returns (bool)",
    "function balanceOf(address account) external view returns (uint256)",
  ];

  const handleTransfer = async (e) => {
    e.preventDefault();

    if (!window.ethereum) {
      alert("Please connect to a wallet.");
      return;
    }

    try {
      // Request wallet connection
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create a provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create a contract instance
      const contract = new ethers.Contract(tokenAddress, erc20ABI, signer);

      // Assuming 18 decimals for ERC-20 tokens
      const decimals = 18;
      const parsedAmount = ethers.utils.parseUnits(amount, decimals);

      // Send the transfer transaction
      const tx = await contract.transfer(recipient, parsedAmount);
      console.log("Transaction sent:", tx);

      // Wait for the transaction to be confirmed
      await tx.wait();
      alert("Transfer successful!");

      // Optionally, check balances
      const senderBalance = await contract.balanceOf(walletAddress);
      const recipientBalance = await contract.balanceOf(recipient);

      console.log(
        "Sender Balance:",
        ethers.utils.formatUnits(senderBalance, decimals)
      );
      console.log(
        "Recipient Balance:",
        ethers.utils.formatUnits(recipientBalance, decimals)
      );
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed. Please check the console for details.");
    }
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-5">
        <h1 className="text-center font-bold text-3xl mb-4">
          Transfer Tokens With Just A Few Clicks
        </h1>
        {!walletAddress ? (
          <Wallets />
        ) : (
          <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
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
            <form onSubmit={handleTransfer} className="flex flex-col">
              <label className="mb-2 text-gray-700">Token Address:</label>
              <input
                type="text"
                value={tokenAddress}
                placeholder="Enter token contract address"
                onChange={(e) => setTokenAddress(e.target.value)}
                required
                className="mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <label className="mb-2 text-gray-700">Recipient Address:</label>
              <input
                type="text"
                placeholder="Enter Recipient Address"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
                className="mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <label className="mb-2 text-gray-700 font-normal">Amount:</label>
              <input
                type="text"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Transfer
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenTransfer;
