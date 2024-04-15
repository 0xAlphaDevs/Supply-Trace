import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: NextRequest, res: Response) {
  const { walletAddress }: { walletAddress: string } = await req.json();

  console.log("Getting past transactions for: ", walletAddress);
  try {
    const buyTransactions = await prisma.transactons.findMany({
      where: {
        to: walletAddress,
      },
    });
    const sellTransactions = await prisma.transactons.findMany({
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
