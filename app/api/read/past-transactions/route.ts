import { Transaction } from "@/lib/types";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: Response) {
  const { walletAddress }: { walletAddress: string } = await req.json();

  console.log("Getting past transactions for: ", walletAddress);
  try {
    const buyTransactions = await prisma.transactions.findMany({
      where: {
        to: walletAddress,
      },
    });
    const sellTransactions = await prisma.transactions.findMany({
      where: {
        from: walletAddress,
      },
    });
    const result = {
      buyTransactions,
      sellTransactions,
    };

    return NextResponse.json(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
