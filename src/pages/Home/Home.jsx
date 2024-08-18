import React from "react";
import "./Home.css";
import Dashboard from "../../components/Dashboard/Dashboard";
import Sidebar, { SidebarItem } from "../../components/Sidebar/Sidebar";
import { FiHome, FiUser, FiSettings, FiBell } from "react-icons/fi";

const Home = () => {
  return (
    <div className="flex gap-3">
      <Sidebar>
        <SidebarItem icon={<FiHome />} text="Dashboard" active />
        <SidebarItem icon={<FiUser />} text="Profile" alert />
        <SidebarItem icon={<FiSettings />} text="Settings" />
      </Sidebar>
      <Dashboard />
    </div>
  );
};

export default Home;
