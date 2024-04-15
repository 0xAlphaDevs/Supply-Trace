import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest, res: Response) {
  const { attestaionId, walletAddress } = await req.json();

  console.log("Updating transaction with attestationId: ", attestaionId);
  try {
    const result = await prisma.transactions.update({
      where: {
        attestationId: attestaionId,
        to: walletAddress,
      },
      data: {
        archived: true,
      },
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
