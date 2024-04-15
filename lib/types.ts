// types.ts
export interface Attestation {}

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
  amount: number;
  timestamp: Date;
}

export interface User {
  name: string;
  wallet: string;
  category: string;
  timestamp: Date;
}
