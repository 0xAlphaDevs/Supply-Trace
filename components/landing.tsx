"use client"

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Home from "./home";
import { useAccount } from "wagmi";


const Landing = () => {
  const [showHome, setShowHome] = useState(false);
  const { isConnected } = useAccount()

  useEffect(() => {
    if (isConnected) {
      setShowHome(true);
    }
  }, [isConnected]);

  const launchApp = () => {
    setShowHome(true);
  };

  return (
    <>
      {!showHome && (
        <div className="">
          <p>Welcome to Supply Trace</p>
          <Button onClick={launchApp}>Launch App</Button>
        </div>
      )}
      {showHome && <Home />}
    </>
  );
};

export default Landing;

