import React from "react";
import "./Home.css";
import Dashboard from "../../components/Dashboard/Dashboard";
import Sidebar from "../../components/Sidebar/Sidebar";
import SidebarItem from "../../components/Sidebar/Sidebar";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar></Sidebar>
      <Dashboard />
    </div>
  );
};

export default Home;
