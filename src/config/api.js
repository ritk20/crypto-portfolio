export const CoinList = (currency) => {
  return fetch(
    `https://api.coingecko.com/api/v3/coins/list?currency=${currency}`
  );
};
