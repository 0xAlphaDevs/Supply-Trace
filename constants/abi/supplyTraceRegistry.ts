export const supplyTraceRegistryAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "wallet",
        type: "address",
      },
      { indexed: false, internalType: "string", name: "name", type: "string" },
      {
        indexed: false,
        internalType: "string",
        name: "industry",
        type: "string",
      },
    ],
    name: "UserAdded",
    type: "event",
  },
  {
    inputs: [{ internalType: "address", name: "_wallet", type: "address" }],
    name: "getUser",
    outputs: [
      { internalType: "string", name: "", type: "string" },
      { internalType: "string", name: "", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_industry", type: "string" },
    ],
    name: "setUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "users",
    outputs: [
      { internalType: "string", name: "name", type: "string" },
      { internalType: "string", name: "industry", type: "string" },
    ],
    stateMutability: "view",
    type: "function",
  },
];
