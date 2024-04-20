"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import ProductCards from "@/components/inventory/productCards";
import SellNewItem from "@/components/inventory/sellNewItem";
import Navbar from "@/components/navbar";
import Spinner from "@/components/spinner";

const Inventory = () => {
  const { isConnected, address } = useAccount();
  const router = useRouter();
  useEffect(() => {
    if (!isConnected) {
      router.push("/app");
    }
  });
  return (
    <>
      <section className="flex flex-col justify-between px-8 py-4 ">
        <Navbar />
        {isConnected ? (
          <div className="py-10">
            <SellNewItem attestationId="" />
            <ProductCards />
          </div>
        ) : (
          <div className="flex justify-center mt-44">
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center p-4">
                <Spinner />
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Inventory;
