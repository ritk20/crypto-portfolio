import React, { useState } from "react";
import { ethers } from "ethers";
import { WalletContext } from "../../context/WalletContext";
import Wallets from "../../components/Wallets/Wallets";

const TokenTransfer = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  // ABI for ERC-20's transfer function
  const erc20ABI = [
    "function transfer(address to, uint256 value) public returns (bool)",
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

      // Parse the amount to the correct number of decimals (assuming 18 decimals)
      const decimals = 18;
      const parsedAmount = ethers.utils.parseUnits(amount, decimals);

      // Send the transfer transaction
      const tx = await contract.transfer(recipient, parsedAmount);
      console.log("Transaction sent:", tx);

      // Wait for the transaction to be confirmed
      await tx.wait();
      alert("Transfer successful!");
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed. Please check the console for details.");
    }
  };

  return (
    <div className="h-screen m-0">
      <h1>Transfer Tokens With Just A Few Clicks</h1>
      <Wallets />
      <h2>Transfer Tokens</h2>
      <form onSubmit={handleTransfer}>
        <div>
          <label>Token Address:</label>
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Recipient Address:</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
};

export default TokenTransfer;
