import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { CoinContext } from "../../context/CoinContext";
import { WalletContext } from "../../context/WalletContext";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

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
  useEffect(() => {
    if (walletAddress) {
      fetchNewBalances();
    }
  }, [watchList]);
  const fetchNewBalances = async () => {
    if (!walletAddress) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const erc20ABI = [
      "function balanceOf(address owner) view returns (uint256)",
    ];

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
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex items-center justify-between p-4 bg-blue-800 text-white shadow-md">
        <h2 className="text-lg font-semibold">Crypto Watchlist</h2>
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
            className="p-2 rounded-md bg-gray-200 text-black hover:bg-gray-300"
          >
            <GiHamburgerMenu size={20} />
          </button>
        </div>
      </nav>
      <div className="flex">
        <div>{/* <h3>Wallet Balance (ETH): {walletBalance}</h3> */}</div>

        <div className="container mx-auto flex flex-col">
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
              <button onClick={() => setExpanded((curr) => !curr)} className="">
                Click to add tokens to your Watch List
              </button>
            </div>
          ) : (
            <div className="max-w-[800px] m-auto bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 rounded-md">
              <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] py-1 px-4 items-center border-b-1">
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
                  className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] py-1 px-4 items-center border-b-1"
                >
                  <p>{item.market_cap_rank}</p>
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt={item.id} className="w-[35px]" />
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
                  <p className="flex justify-center">
                    {currency.symbol} {item.market_cap.toLocaleString()}
                  </p>
                  <p className="flex justify-center">
                    {item.balance || "Loading..."}
                  </p>
                  <button
                    className="flex justify-center ml-2"
                    onClick={() => removeTokenFromWatchList(item)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {expanded && (
          <aside
            className={`z-10 fixed top-0 right-0 h-screen bg-gradient-to-r from-cyan-950 to-blue-950 transition-transform duration-300 ease-in-out ${
              expanded
                ? "transform translate-x-0"
                : "transform translate-x-full"
            } ${expanded ? "border-l-2 rounded-md" : ""}`}
          >
            <div className="flex justify-center">
              <button
                onClick={() => setExpanded((curr) => !curr)}
                className="px-2 h-8 mx-2 my-9 rounded-md bg-gray-200 text-black hover:bg-gray-300"
              >
                <GiHamburgerMenu size={20} />
              </button>
              <div className="flex flex-col items-center py-6">
                <form
                  onSubmit={searchHandlerDisplayCoins}
                  className="flex items-center w-full max-w-lg p-2 bg-white rounded-md shadow-md"
                >
                  <input
                    onChange={inputHandlerDisplayCoins}
                    value={inputDisplay}
                    type="text"
                    placeholder="Search Crypto"
                    className="flex-grow p-2 text-gray-700 rounded-l-md outline-none"
                    list="coinList"
                    required
                  />
                  <datalist id="coinList">
                    {displayCoin.map((item, index) => (
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
            </div>

            <div className="max-w-4xl mx-auto bg-gradient-to-b from-blue-900 via-purple-800 to-blue-900 rounded-md p-4 shadow-md">
              <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] gap-4 py-2 border-b-2 border-white">
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p>24H Change</p>
                <p className="text-center">Market Cap</p>
                <p className="text-right">Add Token</p>
              </div>
              {displayCoin.slice(0, 10).map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] gap-4 py-2 items-center border-b-2 border-white"
                >
                  <p>{item.market_cap_rank}</p>
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt={item.id} className="w-8 h-8" />
                    <p
                      onClick={() => {
                        navigate(`/coins/${item.id}`);
                      }}
                      className="cursor-pointer text-white hover:underline"
                    >
                      {item.name} - {item.symbol}
                    </p>
                  </div>
                  <p>
                    {currency.symbol} {item.current_price.toLocaleString()}
                  </p>
                  <p
                    className={`text-center ${
                      item.price_change_percentage_24h > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item.price_change_percentage_24h.toFixed(2)}%
                  </p>
                  <p className="text-center">
                    {currency.symbol} {item.market_cap.toLocaleString()}
                  </p>
                  <button
                    className="px-2 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600"
                    onClick={() => addToWatchList(item)}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default List;
