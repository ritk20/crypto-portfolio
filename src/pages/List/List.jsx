import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { CoinContext } from "../../context/CoinContext";
import { WalletContext } from "../../context/WalletContext";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const List = () => {
  const [watchList, setWatchList] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { allCoin, currency, changeCurrency } = useContext(CoinContext);
  const { walletAddress } = useContext(WalletContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [inputDisplay, setInputDisplay] = useState("");
  const [inputList, setInputList] = useState("");
  const navigate = useNavigate();
  const [tokenBalances, setTokenBalances] = useState({}); // Caching balances
  const [nativeBalance, setNativeBalance] = useState(null);

  const currencyHandler = (e) => {
    setLoading(true);
    changeCurrency(e.target.value).finally(() => setLoading(false));
  };

  const inputHandlerDisplayCoins = (e) => {
    setInputDisplay(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandlerDisplayCoins = async (e) => {
    e.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(inputDisplay.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  const inputHandlerWatchList = (e) => {
    setInputList(e.target.value);
    if (e.target.value === "") {
      setWatchList(watchList);
    }
  };

  const searchHandlerWatchList = (e) => {
    e.preventDefault();
    const coins = watchList.filter((item) => {
      return item.name.toLowerCase().includes(inputList.toLowerCase());
    });
    setWatchList(coins);
  };

  const addToWatchList = (coin) => {
    if (!watchList.some((item) => item.id === coin.id)) {
      setWatchList([...watchList, coin]);
    } else {
      console.log("Coin already in watchlist");
    }
  };

  const removeTokenFromWatchList = (item) => {
    setWatchList((prevList) =>
      prevList.filter((token) => token.id !== item.id)
    );
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  const fetchNewBalances = async () => {
    if (!walletAddress) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const erc20ABI = [
      "function balanceOf(address owner) view returns (uint256)",
    ];

    try {
      // Fetch native token balance
      const balance = await provider.getBalance(walletAddress);
      setNativeBalance(ethers.utils.formatEther(balance));

      const newBalances = {};

      // Filter out tokens that do not have a contractAddress
      const newTokens = watchList.filter(
        (item) => item.contractAddress && !(item.id in tokenBalances)
      );

      await Promise.all(
        newTokens.map(async (item) => {
          try {
            const contract = new ethers.Contract(
              item.contractAddress,
              erc20ABI,
              provider
            );
            const balance = await contract.balanceOf(walletAddress);
            const formattedBalance = ethers.utils.formatUnits(
              balance,
              item.decimals
            );
            newBalances[item.id] = formattedBalance;
          } catch (error) {
            console.error(`Failed to fetch balance for ${item.name}:`, error);
            newBalances[item.id] = "Error";
          }
        })
      );

      setTokenBalances((prevBalances) => ({ ...prevBalances, ...newBalances }));
    } catch (error) {
      console.error("Failed to fetch native balance:", error);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchNewBalances();
    }
  }, [watchList, walletAddress]);
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex items-center justify-between p-4 bg-blue-800 text-white shadow-md">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="w-10 px-2" />
          <h1 className="text-white text-lg font-medium">
            Cryp<span className="text-teal-300 ">Ax</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <select
            onChange={currencyHandler}
            className="px-2 py-1 bg-white text-black rounded-md"
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr">INR</option>
          </select>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="py-1 px-2 rounded-md bg-white text-black hover:bg-gray-200 font-semibold "
          >
            Add
          </button>
        </div>
      </nav>
      <div className="flex">
        <div className="container mx-auto flex flex-col">
          {walletAddress ? (
            <>
              <div className="p-4 flex flex-col items-center">
                <h3>
                  Wallet Address: <span>{walletAddress}</span>
                </h3>
                <h3>
                  Native Token Balance:{" "}
                  <span>
                    {nativeBalance ? nativeBalance : "Loading..."} ETH
                  </span>
                </h3>
              </div>

              <div className="flex justify-center p-2 m-2">
                <form
                  onSubmit={searchHandlerWatchList}
                  className="flex items-center max-w-lg p-2 bg-white rounded-md shadow-md"
                >
                  <input
                    onChange={inputHandlerWatchList}
                    value={inputList}
                    type="text"
                    placeholder="Search Your Tokens"
                    className="text-black flex-grow text-base outline-none border-none pl-2"
                    list="coinList"
                    required
                  />
                  <datalist id="coinList">
                    {watchList.map((item, index) => (
                      <option key={index} value={item.name} />
                    ))}
                  </datalist>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-purple-600 rounded-r-md hover:bg-purple-700"
                  >
                    Search
                  </button>
                </form>
              </div>
              {!watchList.length ? (
                <div className="flex flex-col justify-center">
                  <h1 className="flex justify-center">No Token Added</h1>
                  <button
                    onClick={() => setExpanded((curr) => !curr)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[20%] flex justify-center mx-auto mt-2"
                  >
                    Add Tokens
                  </button>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="max-w-[800px] bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 rounded-md items-center">
                    <div className="grid md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] grid-cols-[0.5fr_2fr_1fr_1fr_1fr] py-3 px-4 items-center border-white border-b-2 rounded-sm">
                      <p>#</p>
                      <p>Coins</p>
                      <p>Price</p>
                      <p>24H Change</p>
                      <p className="flex justify-center">Market Cap</p>
                      <p className="flex justify-center">Balance</p>
                      <p className="flex justify-end mr-2">Remove</p>
                    </div>
                    {watchList.slice(0, 10).map((item, index) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] py-2 px-4 items-center border-b-2 rounded-sm"
                      >
                        <p>{item.market_cap_rank}</p>
                        <div className="flex items-center gap-2">
                          <img
                            src={item.image}
                            alt={item.id}
                            className="w-[35px]"
                          />
                          <p
                            onClick={() => {
                              navigate(`/coins/${item.id}`);
                            }}
                            className="cursor-pointer"
                          >
                            {item.name + " - " + item.symbol}
                          </p>
                        </div>
                        <p>
                          {currency.symbol}{" "}
                          {item.current_price.toLocaleString()}
                        </p>
                        <p
                          className={`flex justify-center ${
                            item.price_change_percentage_24h > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {Math.floor(item.price_change_percentage_24h * 100) /
                            100}
                        </p>
                        <p className="flex justify-center">
                          {currency.symbol} {item.market_cap.toLocaleString()}
                        </p>
                        <p className="flex justify-center">
                          {tokenBalances[item.id] !== undefined
                            ? tokenBalances[item.id]
                            : "Loading..."}
                        </p>
                        <div className="flex justify-end mr-2">
                          <button
                            onClick={() => removeTokenFromWatchList(item)}
                            className="bg-red-600 text-white font-bold py-0.5 rounded-md flex justify-center hover:bg-red-700 w-12"
                          >
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-center p-4">
              <h2>
                Wallet is not connected. Please connect your wallet to proceed.
              </h2>
            </div>
          )}
        </div>
        {expanded && (
          <div className="min-w-[250px] bg-gray-800 text-white p-4 shadow-lg h-full">
            <form onSubmit={searchHandlerDisplayCoins}>
              <input
                onChange={inputHandlerDisplayCoins}
                value={inputDisplay}
                type="text"
                placeholder="Search Tokens"
                className="w-full text-black rounded-md p-2 mb-4 outline-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 p-2 rounded-md text-white hover:bg-blue-700"
              >
                Search
              </button>
            </form>
            <ul className="mt-4">
              {displayCoin.slice(0, 10).map((coin) => (
                <li
                  key={coin.id}
                  className="flex justify-between items-center py-2 border-b border-gray-600"
                >
                  <span>{coin.name}</span>
                  <button
                    onClick={() => addToWatchList(coin)}
                    className="bg-green-600 px-2 py-1 rounded-md text-white hover:bg-green-700"
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
