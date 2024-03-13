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
    const productId = req?.query?.id as string
    const productFound = await prisma?.product?.findFirst({
      where: {
        id: productId || ''
      }
    });

    res?.status(200).json(productFound);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
}
