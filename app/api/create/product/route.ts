import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export type MyData = {
  data: string;
};

export const runtime = "nodejs";

export async function POST(req: NextRequest, res: Response) {
  const { data }: MyData = await req.json();

  console.log(data);
  try {
    const result = await prisma.products.create({
      data: {
        test: "test",
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
