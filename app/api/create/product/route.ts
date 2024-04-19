import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: NextRequest, res: Response) {
  const product = await req.json();

  try {
    const result = await prisma.products.create({
      data: product as Product,
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
