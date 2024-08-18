import React, { useContext } from "react";
import { CoinContext } from "../../context/CoinContext";
const CoinInfo = (coin) => {
  const { currency } = useContext(CoinContext);
  if (!coin) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col justify-center m-3 p-2">
      <img src={coin.image.large} alt={coin.name} />
      <h1 className="flex justify-center text-3xl shadow-sm font-semibold">
        {coin.name}
      </h1>
      CoinInfo
    </div>
  );
};

export default CoinInfo;
