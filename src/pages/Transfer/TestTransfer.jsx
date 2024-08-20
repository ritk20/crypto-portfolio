import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { WalletContext } from "../../context/WalletContext";
import Wallets from "../../components/Wallets/Wallets";
import Loader from "../../components/Loader/Loader";

const TestTransfer = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { walletAddress, disconnectWallet } = useContext(WalletContext);

  const handleTransfer = async (e) => {
    e.preventDefault();

    if (!window.ethereum) {
      alert("Please connect to a wallet.");
      return;
    }

    try {
      setIsLoading(true); // Start loader
      // Request wallet connection
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create a provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Parse the amount to be sent as SepoliaETH
      const parsedAmount = ethers.utils.parseEther(amount);

      // Send the SepoliaETH transfer transaction
      const tx = await signer.sendTransaction({
        to: recipient,
        value: parsedAmount,
      });

      console.log("Transaction sent:", tx);

      // Wait for the transaction to be confirmed
      await tx.wait();
      alert("Transfer successful!");
      setRecipient("");
      setAmount("");
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed. Please check the console for details.");
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  if (isLoading)
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-center font-bold text-3xl mb-4">
        Transfer SepoliaETH With Just A Few Clicks
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
              Transfer SepoliaETH
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TestTransfer;
