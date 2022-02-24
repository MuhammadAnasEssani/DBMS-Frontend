import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AdminDashboard from "./AdminDashboard";

export default function Dashboard() {

  const history = useHistory();
  return (
    <>
     <AdminDashboard />
    </>
  );
}
