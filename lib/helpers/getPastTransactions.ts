import { PastTransactions } from "../types";

export async function getPastTransactions(
  walletAddress: string
): Promise<PastTransactions> {
  const res = await fetch("/api/read/past-transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      walletAddress: walletAddress,
    }),
  });

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return JSON.parse(await res.json()) as PastTransactions;
}
