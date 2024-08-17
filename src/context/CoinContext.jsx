import React, { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [allCoin, setAllCoin] = useState([]); // allCoin is the state variable holding the api  and setAllCoin is the function that updates the state variable
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });
  useEffect(() => {
    const fetchAllCoin = async () => {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&x_cg_demo_api_key=${api_key}`,
        options
      )
        .then((response) => response.json())
        .then((response) => setAllCoin(response))
        .catch((err) => console.error(err));
    };
  }, [currency]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
