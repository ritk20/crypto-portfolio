import React, { useState } from "react";
import { ethers } from "ethers";
import Navbar from "../../components/Navbar/Navbar";

const AllowanceChecker = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [tokenAllowances, setTokenAllowances] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const infuraProjectId = process.env.REACT_APP_INFURA_PROJECT_ID;
  const infuraProjectSecret = process.env.REACT_APP_INFURA_PROJECT_SECRET;

  if (!infuraProjectId || !infuraProjectSecret) {
    console.error(
      "Infura project ID and secret must be set in the environment variables."
    );
    return <div>Error: Infura project ID and secret are not set.</div>;
  }

  const provider = new ethers.providers.InfuraProvider("mainnet", {
    projectId: infuraProjectId,
    projectSecret: infuraProjectSecret,
  });

  const erc20ABI = [
    "function allowance(address owner, address spender) view returns (uint256)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
  ];

  const getAllowanceData = async () => {
    setIsFetching(true);
    try {
      // Fetch logs related to approvals from the specified wallet address
      const logs = await provider.getLogs({
        fromBlock: "0x0",
        toBlock: "latest",
        topics: [
          ethers.utils.id("Approval(address,address,uint256)"),
          ethers.utils.hexZeroPad(walletAddress, 32),
        ],
      });

      const allowances = {};

      // Loop through the logs and fetch allowances
      for (let log of logs) {
        const tokenAddress = log.address;
        const spenderAddress = ethers.utils.hexStripZeros(log.topics[2]);

        const contract = new ethers.Contract(tokenAddress, erc20ABI, provider);
        const allowance = await contract.allowance(
          walletAddress,
          spenderAddress
        );
        const symbol = await contract.symbol();
        const decimals = await contract.decimals();

        const formattedAllowance = allowance.eq(ethers.constants.MaxUint256)
          ? "Unlimited"
          : ethers.utils.formatUnits(allowance, decimals);

        if (!allowances[symbol]) {
          allowances[symbol] = [];
        }

        // Check if the spenderAddress is already in the list to avoid duplicates
        const existingEntry = allowances[symbol].find(
          (entry) => entry.spenderAddress === spenderAddress
        );

        if (!existingEntry) {
          allowances[symbol].push({
            tokenAddress,
            spenderAddress,
            allowance: formattedAllowance,
          });
        }
      }

      // Update state with allowance data grouped by token symbol
      setTokenAllowances(Object.entries(allowances));
      console.log("Allowances", tokenAllowances);
    } catch (error) {
      console.error("Failed to fetch allowances:", error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-40">
        <h1 className="text-center font-bold text-3xl mb-4">
          Wallet Allowance Checker
        </h1>
        <div className="w-full max-w-3xl p-6 bg-white rounded-md shadow-md ">
          <div className="mb-3 flex justify-center ">
            <input
              type="text"
              placeholder="Enter Wallet Address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mx-1"
              required
            />
            <button
              onClick={getAllowanceData}
              className="px-4  bg-green-600 text-white rounded-md hover:bg-green-700 mx-1"
              disabled={isFetching}
            >
              {isFetching ? "Fetching..." : "Check Allowances"}
            </button>
          </div>
          {tokenAllowances.length > 0 && (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 text-left text-gray-600">Asset</th>
                  <th className="py-2 text-left text-gray-600">Type</th>
                  <th className="py-2 text-left text-gray-600">
                    Approved Amount
                  </th>
                  <th className="py-2 text-left text-gray-600">
                    Approved Spender
                  </th>
                </tr>
              </thead>
              <tbody>
                {tokenAllowances.map(([symbol, spenderList]) =>
                  spenderList.map(
                    ({ spenderAddress, allowance, tokenAddress }, index) => (
                      <tr
                        key={`${tokenAddress}-${spenderAddress}-${allowance}-${index}`}
                      >
                        <td className="py-2 text-black">{symbol}</td>
                        <td className="py-2 text-black">Token</td>
                        <td className="py-2 text-black">{allowance}</td>

                        <td className="py-2 text-black">
                          {spenderAddress === "None" ? "None" : spenderAddress}
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllowanceChecker;
