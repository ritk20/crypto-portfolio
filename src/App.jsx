import "./index.css";
import Home from "./pages/Home/Home";
import List from "./pages/List/List";
import TokenData from "./pages/TokenData/TokenData";
import Transfer from "./pages/Transfer/Transfer";
import Allowance from "./pages/Allowance/Allowance";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { getUsersAllLoader, getUserByIdLoader } from "./loaders";
import CoinContextProvider from "./context/CoinContext";
import Coins from "./pages/Coins/Coins";
import { WalletProvider } from "./context/WalletContext";

function App() {
  return (
    <BrowserRouter>
      <CoinContextProvider>
        <WalletProvider>
          <div className="h-full w-full bg-gradient-to-r from-blue-950 to-purple-800 ">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/list" element={<List />} />
              <Route path="/tokendata" element={<TokenData />} />
              <Route path="/transfer" element={<Transfer />} />
              <Route path="/allowance" element={<Allowance />} />
              <Route path="/coins/:id" element={<Coins />} />
            </Routes>
          </div>
        </WalletProvider>
      </CoinContextProvider>
    </BrowserRouter>
  );
}

export default App;
