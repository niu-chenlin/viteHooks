import React, { useState } from 'react';
import {staticChangeLoading} from "../../publicComponents/publicComponents";


export const DashboardView: React.FC<{}> = () => {
  console.log("dashboard-view");
  staticChangeLoading();
  return <div className="dashboard-view">
    <p>this is dashboard-view</p>

  </div>
};