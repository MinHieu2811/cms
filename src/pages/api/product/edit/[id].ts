import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req?.method !== "PUT") {
    return res.status(500).json({
      success: false,
      message: "Not this method!",
    });
  }

  try {
    const productId = (req?.query?.id as string) || "";
    const { title, description, price, quantity, images } = req?.body;

    const productFound = await prisma?.product?.update({
      where: {
        id: productId,
      },
      data: {
        title,
        description,
        price: Number(price),
        quantity: Number(quantity),
        images
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
