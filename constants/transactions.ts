import { PastTransactions } from "@/lib/types";

// transactions.ts
export const combinedTransactions: PastTransactions[] = [
  {
    buyTransactions: [
      {
        attestation: {
          previousAttestationId: "",
          productName: "Test Product",
          productSerialNo: "123",
          soldBy: "test",
          boughtBy: "test",
          grandTotal: 100,
          taxRate: 0.1,
        },
        attestationId: "1",
        from: "test",
        to: "test",
        archived: false,
        transactionValue: 100,
        timestamp: new Date(),
      },
    ],
    sellTransactions: [
      {
        attestation: {
          previousAttestationId: "",
          productName: "Test Product",
          productSerialNo: "123",
          soldBy: "test",
          boughtBy: "test",
          grandTotal: 100,
          taxRate: 0.1,
        },
        attestationId: "1",
        from: "test",
        to: "test",
        archived: false,
        transactionValue: 100,
        timestamp: new Date(),
      },
    ],
  },
];
