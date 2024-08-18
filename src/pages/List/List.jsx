import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { CoinContext } from "../../context/CoinContext";
import { useNavigate } from "react-router-dom";

const List = () => {
  // const ProjectId = process.env.REACT_APP_INFURA_PROJECT_ID;
  // const [walletBalance, setWalletBalance] = useState("0");
  // const [watchList, setWatchList] = useState([]);
  // const [tokenName, setTokenName] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  const { allCoin, currency, setCurrency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // const INFURA_URL = `https://mainnet.infura.io/v3/${ProjectId}`;
  // const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
  // const userAddress = "0x83669E5A9a58638E72f7Fd9d864ce2F6AA9E8Bdf"; // Replace with the connected wallet address

  // useEffect(() => {
  //   getWalletBalance();
  // }, []);

  // const getWalletBalance = async () => {
  //   try {
  //     const balance = await provider.getBalance(userAddress);
  //     setWalletBalance(ethers.utils.formatEther(balance)); // Convert balance from Wei to Ether
  //   } catch (error) {
  //     console.error("Failed to fetch wallet balance:", error);
  //   }
  // };

  const currencyHandler = (e) => {
    switch (e.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      case "eur": {
        setCurrency({ name: "usd", symbol: "€" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
    console.log(displayCoin);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
    console.log("Display Coin:", allCoin); // Debugging line
  }, [allCoin]);

  // const getTokenDetailsByName = async (name) => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.coingecko.com/api/v3/coins/ethereum/contract/${name}`
  //     );
  //     if (response.data) {
  //       return {
  //         address: response.data.contract_address,
  //         symbol: response.data.symbol,
  //         price: response.data.market_data.current_price.usd,
  //       };
  //     }
  //   } catch (error) {
  //     console.error(`Failed to fetch details for ${name}:`, error);
  //     return null;
  //   }
  // };

  // const getTokenBalance = async (tokenAddress) => {
  //   try {
  //     const erc20ABI = [
  //       "function balanceOf(address owner) view returns (uint256)",
  //     ];
  //     const contract = new ethers.Contract(tokenAddress, erc20ABI, provider);
  //     const balance = await contract.balanceOf(userAddress);
  //     return ethers.utils.formatUnits(balance, 18); // Adjust for token decimals if needed
  //   } catch (error) {
  //     console.error(`Failed to fetch balance for ${tokenAddress}:`, error);
  //     return null;
  //   }
  // };

  // const addTokenToWatchList = async (e) => {
  //   e.preventDefault();
  //   setErrorMessage("");

  //   const tokenDetails = await getTokenDetailsByName(tokenName.toLowerCase());
  //   if (!tokenDetails) {
  //     setErrorMessage("Token not found. Please enter a valid token name.");
  //     return;
  //   }

  //   const tokenBalance = await getTokenBalance(tokenDetails.address);
  //   const balanceInUSD = (tokenBalance * tokenDetails.price).toFixed(2);

  //   setWatchList((prevWatchList) => [
  //     ...prevWatchList,
  //     {
  //       name: tokenName,
  //       address: tokenDetails.address,
  //       symbol: tokenDetails.symbol,
  //       balance: tokenBalance,
  //       balanceInUSD,
  //     },
  //   ]);
  //   setTokenName("");
  // };

  // const removeTokenFromWatchList = (tokenAddress) => {
  //   setWatchList((prevWatchList) =>
  //     prevWatchList.filter((token) => token.address !== tokenAddress)
  //   );
  // };

  return (
    <div className="">
      <div>{/* <h3>Wallet Balance (ETH): {walletBalance}</h3> */}</div>
      {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {watchList.map((token) => (
        <div key={token.address}>
          <p>Token Name: {token.name}</p>
          <p>Token Address: {token.address}</p>
          <p>Token Symbol: {token.symbol}</p>
          <p>Token Balance: {token.balance}</p>
          <p>Token Balance (USD): ${token.balanceInUSD}</p>
          <button onClick={() => removeTokenFromWatchList(token.address)}>
            Remove
          </button>
        </div>
      ))}
      <form onSubmit={addTokenToWatchList}>
        <input
          type="text"
          placeholder="Token Name"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
        />
        <button type="submit">Add Token</button>
      </form> */}
      <aside className="flex items-right">
        <nav className="flex">
          <h2>Add Tokens</h2>
          <select onChange={currencyHandler}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr"></option>
          </select>
        </nav>
        <div className="flex flex-col">
          <div className="flex justify-center">
            <form
              onSubmit={searchHandler}
              className="flex justify-center items-center p-0.5 w-[70%] bg-white rounded-md text-xl gap-2 m-2"
            >
              <input
                onChange={inputHandler}
                value={input}
                type="text"
                placeholder="Search Crypto"
                className="text-black flex-1 text-bas outline-none border-none pl-2"
                list="coinList"
                required
              />

              <datalist id="coinList">
                {allCoin.map((item, index) => (
                  <option key={index} value={item.name} />
                ))}
              </datalist>

              <button
                type="submit"
                className="border-none bg-purple-600 text-white text-base py-1.5 px-6 rounded-md cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
          <div className="max-w-[800px] m-auto bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 rounded-md">
            <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] py-1 px-4 items-center border-b-1">
              <p>#</p>
              <p>Coins</p>
              <p>Price</p>
              <p className="flex justify-center">24H Change</p>
              <p className="flex justify-end">Market Cap</p>
            </div>
            {displayCoin.slice(0, 10).map((item, index) => (
              <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] py-1 px-4 items-center border-b-1">
                <p>{item.market_cap_rank}</p>
                <div className="flex items-center gap-2">
                  <img src={item.image} alt={item.id} className="w-[35px]" />
                  <p
                    onClick={() => {
                      navigate(`/coins/${item.id}`);
                    }}
                  >
                    {item.name + " - " + item.symbol}
                  </p>
                </div>
                <p>
                  {currency.symbol} {item.current_price.toLocaleString()}
                </p>
                <p
                  className={`flex justify-center ${
                    item.price_change_percentage_24h > 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {Math.floor(item.price_change_percentage_24h * 100) / 100}
                </p>
                <p className="flex justify-end">
                  {currency.symbol} {item.market_cap.toLocaleString()}
                </p>
                <button></button>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default List;
