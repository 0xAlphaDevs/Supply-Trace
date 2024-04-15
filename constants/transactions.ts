// types.ts
export interface Transaction {
  proposalId: number;
  description: string;
  createdAt: string;
  createdBy: string;
  bid: number;
}

// transactions.ts
export const transactions: Transaction[] = [
  {
    proposalId: 1,
    description: "Proposal 1 description",
    createdAt: "2024-04-01",
    createdBy: "Freelancer 1",
    bid: 1000000000000000000, // 1 GHO
  },
];
