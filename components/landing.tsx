"use client"

import React, { useState } from "react";
import { Button } from "./ui/button";
import Home from "./home";

const Landing = () => {
  const [showHome, setShowHome] = useState(false);

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

