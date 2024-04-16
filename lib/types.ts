// types.ts
export interface Attestation {
  productName: string;
  productSerailNo: string;
  soldBy: string;
  boughtBy: string;
  previousAttestationId: string;
  grandTotal: number;
  taxRate: number;
}

export interface InventoryItem extends Attestation {
  attestationId: string;
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
  amount: number;
  timestamp: Date;
}

export interface User {
  name: string;
  wallet: string;
  category: string;
  timestamp: Date;
}
