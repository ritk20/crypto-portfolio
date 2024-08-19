import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async (currencyName) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets`,
        {
          params: {
            vs_currency: currencyName,
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
            price_change_percentage: "24h",
          },
          headers: {
            "X-CMC_PRO_API_KEY": api_key,
          },
        }
      );
      setAllCoin(response.data);
    } catch (error) {
      console.error("Failed to fetch coin data:", error);
    }
  };

  const changeCurrency = async (newCurrency) => {
    const currencyMap = {
      usd: { name: "usd", symbol: "$" },
      inr: { name: "inr", symbol: "₹" },
      eur: { name: "eur", symbol: "€" },
    };

    const selectedCurrency = currencyMap[newCurrency] || currencyMap["usd"];
    await fetchAllCoin(selectedCurrency.name); // Wait for the API call to finish
    setCurrency(selectedCurrency); // Only then update the currency state
  };

  useEffect(() => {
    fetchAllCoin(currency.name);
  }, [api_key]);

  return (
    <CoinContext.Provider value={{ allCoin, currency, changeCurrency }}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
