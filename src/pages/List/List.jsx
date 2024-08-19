import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { CoinContext } from "../../context/CoinContext";
import { useNavigate } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { WalletContext } from "../../context/WalletContext";

const List = () => {
  // const ProjectId = process.env.REACT_APP_INFURA_PROJECT_ID;
  // const [walletBalance, setWalletBalance] = useState("0");
  const [watchList, setWatchList] = useState([]);
  // const [tokenName, setTokenName] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { allCoin, currency, changeCurrency } = useContext(CoinContext);
  const { walletAddress } = useContext(WalletContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // Assuming you have a provider (e.g., MetaMask)
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // The address of the token contract (e.g., USDT)
  const tokenAddress = "0xd38E5c25935291fFD51C9d66C3B7384494bb099A";

  // The ERC-20 token ABI, which defines the functions we can call on the contract
  const abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
  ];

  // The wallet address of the user
  const userWalletAddress = { walletAddress };

  // Creating a contract instance
  const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
  console.log(walletAddress);
  async function fetchTokenBalance() {
    try {
      // Fetch the number of decimals the token uses (e.g., USDT uses 6 decimals)
      const decimals = await tokenContract.decimals();

      // Fetch the balance of the user
      const rawBalance = await tokenContract.balanceOf(userWalletAddress);

      // Format the balance according to the decimals
      const formattedBalance = ethers.utils.formatUnits(rawBalance, decimals);

      console.log(`Balance: ${formattedBalance} USDT`);
    } catch (error) {
      console.error("Failed to fetch token balance:", error);
    }
  }

  fetchTokenBalance();

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
    setLoading(true);
    changeCurrency(e.target.value).finally(() => setLoading(false)); // Stop loading once the currency is changed
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
    <div className="flex">
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
      {/* <nav className="flex">
        <h2>Add Tokens</h2>
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr"></option>
        </select>
      </nav> */}
      <div className="flex flex-col">
        <div className="flex justify-center">
          <form
            onSubmit={searchHandler}
            disabled={loading}
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
              {watchList.map((item, index) => (
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
          <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] py-1 px-4 items-center border-b-1">
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p>24H Change</p>
            <p className="flex justify-center">Market Cap</p>
            <p className="flex justify-end mr-2">Add Token</p>
          </div>
          {watchList.slice(0, 10).map((item, index) => (
            <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] py-1 px-4 items-center border-b-1">
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
              <button
                className="flex justify-center ml-2"
                onClick={() => removeTokenFromWatchList(item)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <aside
        className={`z-10 fixed h-screen bg-gradient-to-r from-cyan-950 to-blue-950 ${
          expanded ? "border-r-2 rounded-md" : ""
        }`}
      >
        <div className="flex justify-center p-2 m-2">
          <h2 className="px-2 mx-2 font-medium">Add Tokens</h2>
          <select
            onChange={currencyHandler}
            className="border-none bg-white text-black text-base py-0.5 px-2 rounded-md cursor-pointer"
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr">INR</option>
          </select>
        </div>
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
            <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] py-1 px-4 items-center border-b-1">
              <p>#</p>
              <p>Coins</p>
              <p>Price</p>
              <p>24H Change</p>
              <p className="flex justify-center">Market Cap</p>
              <p className="flex justify-end mr-2">Add Token</p>
            </div>
            {displayCoin.slice(0, 10).map((item, index) => (
              <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] py-1 px-4 items-center border-b-1">
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
                <button
                  className="flex justify-center ml-2"
                  onClick={() => addToWatchList(item)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default List;
