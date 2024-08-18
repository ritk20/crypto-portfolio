import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { CoinContext } from "../../context/CoinContext";

const Tokens = () => {
  const [watchList, setWatchList] = useState([]);
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [input, setInput] = useState("");
  const [displayCoin, setDisplayCoin] = useState([]);
  const { allCoin } = useContext(CoinContext);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const searchHandler = async (e) => {
    e.preventDefault(); //prevents reloading
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    displayCoin(coins);
  };

  const addTokenToWatchList = (e) => {
    e.preventDefault();
    setWatchList([
      ...watchList,
      { address: tokenAddress, symbol: tokenSymbol },
    ]);
    setTokenAddress("");
    setTokenSymbol("");
    setFetchTrigger(!fetchTrigger); // Trigger balance fetch
  };

  const erc20ABI = ["function balanceOf(address owner) view returns (uint256)"];
  const userAddress = "0x83669E5A9a58638E72f7Fd9d864ce2F6AA9E8Bdf"; // Replace with the connected wallet address

  const getTokenBalance = async (tokenAddress) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, erc20ABI, provider);
      const balance = await contract.balanceOf(userAddress); // userAddress is the connected wallet address
      return balance.toString(); // Assuming the token has 18 decimals
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
  }, [fetchTrigger]);

  const removeTokenFromWatchList = (tokenAddress) => {
    setWatchList(watchList.filter((token) => token.address !== tokenAddress));
  };

  return (
    <div className="items-right">
      <form onSubmit={searchHandler}>
        <input
          type="text"
          placeholder="Search for tokens"
          value={input}
          onChange={inputHandler}
          className="text-black"
          required
        />
        <button type="submit">Add Token</button>
      </form>
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
    </div>
  );
};

export default Tokens;
