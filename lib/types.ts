// types.ts
export interface ProductAttestationSchema {
  productName: string;
  productSerialNo: string;
  soldBy: string;
  boughtBy: string;
  previousAttestationId: string;
  grandTotal: number;
  taxRate: number;
}

export interface InventoryItem extends ProductAttestationSchema {
  attestationId: string;
}

export interface PastTransactions {
  buyTransactions: Transaction[];
  sellTransactions: Transaction[];
}

export interface Product {
  productName: string;
  productSerialNo: string;
  grandTotal: number;
  taxRate: number;
  vendorWalletAddress: string;
}

export interface Transaction {
  attestation: ProductAttestationSchema;
  attestationId: string;
  from: string;
  to: string;
  archived: boolean;
  transactionValue: number;
  timestamp: Date;
}

export interface User {
  name: string;
  wallet: string;
  category: string;
  timestamp: Date;
}
