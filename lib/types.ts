// types.ts
export interface Attestation {
  productName: string;
  productSerialNo: string;
  soldBy: string;
  boughtBy: string;
  previousAttestationId: string;
  grandTotal: number;
  taxRate: number;
}

export interface InventoryItem extends Attestation {
  attestationId: string;
}

export interface PastTransactions {
  buyTransactions: Transaction[];
  sellTransactions: Transaction[];
}

export interface Product {
  name: string;
  price: number;
  taxRate: number;
  vendor: string;
}

export interface Transaction {
  attestation: Attestation;
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
