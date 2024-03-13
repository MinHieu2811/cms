import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/utils/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req?.method !== "GET") {
    return res.status(500).json({
      success: false,
      message: "Not this method!",
    });
  }

  try {

    const productFound = await prisma?.product?.findMany();

    res?.status(200).json({
      content: productFound,
      totalItems: productFound?.length
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
}
