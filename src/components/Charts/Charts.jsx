import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CoinContext } from "../../context/CoinContext";
import { Line } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { chartDays } from "../../functions/data";
import Loader from "../../components/Loader/Loader";

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
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = useContext(CoinContext);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState(new Date());
  const [customDatePicker, setCustomDatePicker] = useState(false);
  const [chartTitle, setChartTitle] = useState(
    `Price of ${coin.name} in ${currency.name} over the past ${days} days`
  );
  const [chartLabel, setChartLabel] = useState(
    `Price (Past ${days} Days) in ${currency.name}`
  );

  const coinData = async () => {
    if (!startDate || !endDate) return;

    const startUnix = Math.floor(startDate.getTime() / 1000);
    const endUnix = Math.floor(endDate.getTime() / 1000);
    const api_key = process.env.REACT_APP_API_KEY;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": api_key,
      },
    };

    const url = `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart/range?vs_currency=${currency.name}&from=${startUnix}&to=${endUnix}`;

    try {
      const response = await axios.get(url, options);
      setHistoricalData(response.data.prices);
      console.log("Historical data fetched:", response.data.prices);
    } catch (error) {
      console.error("Failed to fetch historical data:", error);
    }
  };

  useEffect(() => {
    coinData();
  }, [currency, days, startDate, endDate]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleDaySelection = (value) => {
    setDays(value);
    setCustomDatePicker(false);
    setEndDate(new Date());
    setStartDate(new Date(new Date().setDate(new Date().getDate() - value)));
  };

  return (
    <div
      className={`w-full md:w-[80%] lg:w-[70%] xl:w-[60%] h-[400px] p-10 pt-0 mt-20 md:p-10 flex flex-col items-center justify-center ${
        customDatePicker ? "mt-60" : ""
      }`}
    >
      {!historicalData.length ? (
        <Loader />
      ) : (
        <>
          <Line
            data={{
              labels: historicalData.map((priceData) => {
                let date = new Date(priceData[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;

                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  label: `Price (Past ${days} Days) in ${currency.name}`,
                  data: historicalData.map((priceData) => priceData[1]),
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
                      size: 12,
                      color: "#ffffff",
                    },
                  },
                },
                y: {
                  ticks: {
                    font: {
                      size: 12,
                      color: "#ffffff",
                    },
                  },
                },
              },
              plugins: {
                legend: {
                  labels: {
                    font: {
                      size: 14,
                      color: "#ffffff",
                    },
                  },
                },
                title: {
                  display: true,
                  text: `Price of ${coin.name} in ${currency.name} over the past ${days} days`,
                  font: {
                    size: 16,
                    color: "#ffffff",
                  },
                },
              },
            }}
          />
          <div className="mt-12 flex flex-col items-center">
            <div className="flex mt-5 mx-2 justify-around w-full">
              {chartDays.map((day) => (
                <button
                  key={day.value}
                  onClick={() => handleDaySelection(day.value)}
                  className={`rounded-md p-2 px-5 cursor-pointer hover:bg-yellow-600 hover:text-black ${
                    day.value === days && !customDatePicker
                      ? "bg-yellow-600"
                      : ""
                  }`}
                >
                  {day.label}
                </button>
              ))}
              <button
                onClick={() => setCustomDatePicker(true)}
                className={`rounded-md p-2 px-5 mx-2 cursor-pointer hover:bg-yellow-600 hover:text-black ${
                  customDatePicker ? "bg-yellow-600" : ""
                }`}
              >
                Custom Date Picker
              </button>
            </div>

            {customDatePicker && (
              <div className="mt-12 flex flex-col items-center">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  className="bg-white rounded-lg shadow-lg"
                />
                <span className="rounded-md p-2 px-5 m-2 cursor-pointer bg-yellow-600 ">
                  Select Start and End Date
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Charts;
