import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Charts from "../../components/Charts/Charts";
import Loader from "../../components/Loader/Loader";

const Coins = () => {
  const api_key = process.env.REACT_APP_API_KEY;

  const { id } = useParams();
  const [coin, setCoin] = useState();

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`,
          {
            headers: {
              "X-CMC_PRO_API_KEY": api_key,
            },
          }
        );
        setCoin(response.data);
      } catch (error) {
        console.error("Failed to fetch coin data:", error);
      }
    };
    fetchCoin();
  }, [id, api_key]);

  if (!coin) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center w-full h-screen m-0 p-0 overflow-auto">
      <aside className="flex flex-col justify-center m-3 p-2 w-full md:w-[30%]">
        <div className="flex justify-center">
          <img
            src={coin.image.large}
            alt={coin.name}
            className="mb-3 w-60 h-60 object-contain"
          />
        </div>
        <h1 className="flex justify-center text-3xl shadow-sm font-semibold mb-2">
          {coin.name}
        </h1>
        <h2 className="mb-1 flex justify-center">
          Rank - {coin.market_cap_rank}
        </h2>
        <h2 className="mb-1 flex justify-center">
          Current Price - {coin.market_data.current_price.usd} USD
        </h2>
        <h2 className="mb-1 flex justify-center">
          Market Cap - {coin.market_data.market_cap.usd} USD
        </h2>
      </aside>
      <Charts coin={coin} />
    </div>
  );
};

export default Coins;
