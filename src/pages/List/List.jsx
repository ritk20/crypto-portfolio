import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const Tokens = () => {
  const ProjectId = process.env.REACT_APP_INFURA_PROJECT_ID;
  const ProjectSecret = process.env.REACT_APP_INFURA_PROJECT_SECRET;
  const [watchList, setWatchList] = useState([]);
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");

  const INFURA_URL = `https://mainnet.infura.io/v3/${ProjectId}`;

  const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);

  const erc20ABI = ["function balanceOf(address owner) view returns (uint256)"];
  const userAddress = "0x83669E5A9a58638E72f7Fd9d864ce2F6AA9E8Bdf"; // Replace with the connected wallet address

  const getTokenBalance = async (tokenAddress) => {
    try {
      const contract = new ethers.Contract(tokenAddress, erc20ABI, provider);
      const balance = await contract.balanceOf(userAddress);
      return ethers.utils.formatUnits(balance, 18); // Adjust for token decimals if needed
    } catch (error) {
      console.error(`Failed to fetch balance for ${tokenAddress}:`, error);
      return "0";
    }
  };

  useEffect(() => {
    const fetchBalances = async () => {
      const updatedList = await Promise.all(
        watchList.map(async (token) => {
          const balance = await getTokenBalance(token.address);
          return { ...token, balance };
        })
      );
      setWatchList(updatedList);
    };
    fetchBalances();
  }, [watchList]);

  const addTokenToWatchList = (e) => {
    e.preventDefault();
    setWatchList([
      ...watchList,
      { address: tokenAddress, symbol: tokenSymbol },
    ]);
    setTokenAddress("");
    setTokenSymbol("");
  };

  const removeTokenFromWatchList = (tokenAddress) => {
    setWatchList(watchList.filter((token) => token.address !== tokenAddress));
  };

  return (
    <div className="w-full h-full">
      {watchList.map((token) => (
        <div key={token.address}>
          <p>Token Address: {token.address}</p>
          <p>Token Symbol: {token.symbol}</p>
          <p>Token Balance: {token.balance}</p>
          <button onClick={() => removeTokenFromWatchList(token.address)}>
            Remove
          </button>
        </div>
      ))}
      <form onSubmit={addTokenToWatchList}>
        <input
          type="text"
          placeholder="Token Address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Token Symbol"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
        />
        <button type="submit">Add Token</button>
      </form>
    </div>
  );
};

export default Tokens;
