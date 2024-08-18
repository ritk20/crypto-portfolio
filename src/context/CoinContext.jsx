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

  useEffect(() => {
    const fetchAllCoin = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: currency.name,
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
    fetchAllCoin();
  }, [currency, api_key]);

  return (
    <CoinContext.Provider value={{ allCoin, currency, setCurrency }}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
