import "./index.css";
import Home from "./pages/Home/Home";
import List from "./pages/List/List";
import TokenData from "./pages/TokenData/TokenData";
import Transfer from "./pages/Transfer/Transfer";
import Allowance from "./pages/Allowance/Allowance";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { getUsersAllLoader, getUserByIdLoader } from "./loaders";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/tokendata" element={<TokenData />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/allowance" element={<Allowance />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
