import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinContext } from "../../context/CoinContext";
import { Line } from "react-chartjs-2";
import { chartDays } from "../../functions/data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = useContext(CoinContext);
  const api_key = process.env.REACT_APP_API_KEY;

  const coinData = async () => {
    const options = {
      method: "GET",
      url: `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart`,
      params: { vs_currency: currency.name, days: days },
      headers: { accept: "application/json", "x-cg-demo-api-key": api_key },
    };

    try {
      const response = await axios.request(options);
      setHistoricalData(response.data.prices);
      console.log("coin", coin);
    } catch (error) {
      console.error("Failed to fetch historical data:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  useEffect(() => {
    coinData();
  }, [currency, days]);

  return (
    <div className="w-full md:w-[80%] lg:w-[70%] xl:w-[60%] h-[400px] mt-0 p-10 pt-0 md:mt-6 md:p-10 flex flex-col items-center justify-center">
      {!historicalData ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {" "}
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;

                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  label: `Price (Past ${days} Days) in ${currency.name}`,
                  data: historicalData.map((coin) => coin[1]),
                  borderColor: "#EEBC1D",
                  fill: false,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              elements: {
                point: {
                  radius: 1,
                },
              },
              scales: {
                x: {
                  ticks: {
                    font: {
                      size: 14, // Increase font size for labels
                    },
                  },
                },
                y: {
                  ticks: {
                    font: {
                      size: 14, // Increase font size for labels
                    },
                  },
                },
              },
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 16, // Increase font size for legend
                    },
                  },
                },
                title: {
                  display: true,
                  text: `Price of ${coin.name} in ${currency.name} over the past ${days} days`,
                  font: {
                    size: 18, // Increase font size for title
                  },
                },
              },
            }}
          />
          <div className="flex mt-5 justify-around w-full">
            {chartDays.map((day) => (
              <button
                onClick={() => {
                  setDays(day.value);
                }}
                className={`rounded-md p-2 px-5 cursor-pointer hover:bg-yellow-600 hover:text-black ${
                  day.value === days ? "bg-yellow-600" : ""
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Charts;
