import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: Response) {
  const { walletAddress }: { walletAddress: string } = await req.json();

  console.log("Getting products for: ", walletAddress);
  try {
    const result = await prisma.products.findMany({
      where: {
        vendor: walletAddress,
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
