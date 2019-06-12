import React from "react";

import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";

function Dashboard() {
  return (
    <div className="d-flex d-flex-row">
      <Sidebar />
      <Content />
    </div>
  );
}

export default Dashboard;
