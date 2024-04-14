import prisma from "@/prisma/prisma"
import { NextRequest, NextResponse } from "next/server"

export type MyData = {
  data: string
}

export default async function POST(req: NextRequest, res: Response) {
  const { data }: MyData = await req.json()

  const result = await prisma.user.create({
    data: data,
  })

  return NextResponse.json(JSON.stringify(result), { status: 200 })
}
