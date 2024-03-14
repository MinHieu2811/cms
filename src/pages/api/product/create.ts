import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/utils/prismadb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req?.method !== "POST") {
    return res.status(500).json({
      success: false,
      message: "Not this method!",
    });
  }

  try {
    const { title, description, price, quantity, images } = req?.body;

    const productFound = await prisma?.product?.findMany({
      where: {
        title: title,
      },
    });

    console.log('redeploy');

    if (productFound?.length) {
      res?.status(500)?.json({
        success: false,
        message: "This product name has already exist!",
      });
      return;
    }

    const createdProduct = await prisma?.product?.create({
      data: {
        title,
        description,
        price: Number(price),
        quantity: Number(quantity),
        images,
        createdAt: new Date(),
      },
    });

    res?.status(200).json({
      success: true,
      data: createdProduct,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
}
