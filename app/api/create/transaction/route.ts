import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Transaction } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest, res: Response) {
  const transaction: Transaction = await req.json();

  console.log("Creating transaction: ", transaction);
  try {
    const result = await prisma.transactions.create({
      data: transaction as any,
    });
    return NextResponse.json(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
