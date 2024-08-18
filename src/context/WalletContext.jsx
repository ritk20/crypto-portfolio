import React, { createContext, useState } from "react";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState(null);

  const connectWallet = (address, provider) => {
    setWalletAddress(address);
    setProvider(provider);
  };

  const disconnectWallet = () => {
    setWalletAddress("");
    setProvider(null);
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        setWalletAddress,
        provider,
        setProvider,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
