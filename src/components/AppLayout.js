import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import pubAddressData from "../context/UserContext";

const AppLayout = () => {
  const [pubAddress, _setPubAddress] = useState("");
  return (
    <div>
      <pubAddressData.Provider value={{ pubAddress }}>
        <Header setPubAddress={_setPubAddress} />
        <div>
          <Outlet />
        </div>
      </pubAddressData.Provider>
    </div>
  );
};

export default AppLayout;
export { pubAddressData };
