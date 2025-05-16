import React from "react";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

function Private() {
  return (
    <div className="flex">
      <Sidebar/>
      <main className="flex-1 p-6 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
}

export default Private;
