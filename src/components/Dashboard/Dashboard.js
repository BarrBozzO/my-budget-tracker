import React from "react";

import Sidebar from "../Sidebar/Sidebar";
import ContentContainer from "../Content/ContentContainer";

function Dashboard() {
  return (
    <div className="d-flex d-flex-row">
      <Sidebar />
      <ContentContainer />
    </div>
  );
}

export default Dashboard;
