import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import CoinInfo from "./CoinInfo";
import axios from "axios";
import Charts from "../../components/Charts/Charts";

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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row items-center mt-5">
      <aside className="flex flex-col justify-center m-3 p-2 w-[30%]">
        <img src={coin.image.large} alt={coin.name} />
        <h1 className="flex justify-center text-3xl shadow-sm font-semibold">
          {coin.name}
        </h1>
        <h2 className="">Rank - {coin.market_cap_rank}</h2>
        <h2>Current Price - </h2>
        <h2>Market Cap - </h2>
      </aside>
      <Charts coin={coin} />
    </div>
  );
};

export default Coins;
