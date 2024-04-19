import { InventoryItem, Transaction } from "@/lib/types";
import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: Response) {
  const { walletAddress }: { walletAddress: string } = await req.json();

  console.log("Getting inventory for: ", walletAddress);
  try {
    const result = await prisma.transactions.findMany({
      where: {
        to: walletAddress,
        archived: false,
      },
    });

    let inventory: InventoryItem[] = [];
    result.forEach((item: any) => {
      // @ts-ignore
      inventory.push({
        productName: item.attestation.productName,
        productSerialNo: item.attestation.productSerialNo,
        soldBy: item.attestation.soldBy,
        boughtBy: item.attestation.boughtBy,
        attestationId: item.attestationId,
        previousAttestationId: item.attestation.previousAttestationId,
        grandTotal: Number(item.attestation.grandTotal),
        taxRate: Number(item.attestation.taxRate),
      });
    });

    // console.log("Inventory : ", inventory);

    return NextResponse.json(JSON.stringify(inventory), { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
