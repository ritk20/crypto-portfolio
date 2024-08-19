import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { WalletContext } from "../../context/WalletContext";
import Cards from "../../components/Wallets/Cards";
import metamask_logo from "../../assets/metamask_fox.png";
import coinbase_logo from "../../assets/coinbase_logo.png";
import electrum_logo from "../../assets/electrum_logo.png";
import Wallets from "../../components/Wallets/Wallets";

const Allowance = () => {
  const [tokenAddress, setTokenAddress] = useState("");
  const [spenderAddress, setSpenderAddress] = useState("");
  const [allowance, setAllowance] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const [approveTokenAddress, setApproveTokenAddress] = useState("");
  const [approveSpenderAddress, setApproveSpenderAddress] = useState("");
  const { walletAddress, provider, connectWallet, disconnectWallet } =
    useContext(WalletContext);

  const erc20ABI = [
    "function allowance(address owner, address spender) view returns (uint256)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
  ];
  const approveSpender = async () => {
    const contract = new ethers.Contract(
      approveTokenAddress,
      erc20ABI,
      provider.getSigner()
    );
    const tx = await contract.approve(
      approveSpenderAddress,
      ethers.utils.parseUnits("1000", 18)
    );
    await tx.wait();
    console.log("Allowance set successfully");
  };
  const getTokenAllowance = async () => {
    setIsFetching(true);
    try {
      if (!ethers.utils.isAddress(tokenAddress)) {
        alert("Invalid token address");
        setIsFetching(false);
        return;
      }
      if (!ethers.utils.isAddress(spenderAddress)) {
        alert("Invalid spender address");
        setIsFetching(false);
        return;
      }

      const contract = new ethers.Contract(tokenAddress, erc20ABI, provider);
      const result = await contract.allowance(walletAddress, spenderAddress);
      const decimals = await contract.decimals();
      const symbol = await contract.symbol();
      setAllowance({
        amount: ethers.utils.formatUnits(result, decimals),
        symbol,
      });
      setIsFetching(false);
    } catch (error) {
      console.error("Failed to fetch allowance:", error);
      alert("Failed to fetch allowance. Please check the console for details.");
      setAllowance(null);
      setIsFetching(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-center font-bold text-3xl mb-4">
        Token Allowance Checker
      </h1>

      {/* <form onSubmit={approveSpender}>
        <label className="mb-2 text-gray-700">Token Address</label>
        <input
          type="text"
          placeholder="Enter token contract address"
          value={approveTokenAddress}
          onChange={(e) => setApproveTokenAddress(e.target.value)}
          className="mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          required
        />

        <label className="mb-2 text-gray-700">Spender Address</label>
        <input
          type="text"
          placeholder="Enter spender address"
          value={approveSpenderAddress}
          onChange={(e) => setApproveSpenderAddress(e.target.value)}
          className="mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          required
        />

        <button type="submit">Submit</button>
      </form> */}

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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getTokenAllowance();
            }}
            className="flex flex-col"
          >
            <label className="mb-2 text-gray-700">Token Address</label>
            <input
              type="text"
              placeholder="Enter token contract address"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              className="mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />

            <label className="mb-2 text-gray-700">Spender Address</label>
            <input
              type="text"
              placeholder="Enter spender address"
              value={spenderAddress}
              onChange={(e) => setSpenderAddress(e.target.value)}
              className="mb-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              disabled={isFetching}
            >
              {isFetching ? "Fetching..." : "Check Allowance"}
            </button>
          </form>

          {allowance && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="text-lg font-semibold">Allowance Details</h3>
              <p>
                You have allowed <strong>{allowance.amount || "0"}</strong>{" "}
                <strong>{allowance.symbol || "tokens"}</strong>.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Allowance;
