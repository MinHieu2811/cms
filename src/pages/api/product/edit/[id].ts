import { NextApiRequest, NextApiResponse } from "next";
import ProductSchema from "@/model/ProductModel";
import { connectToDataBase } from "@/utils";

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

    await connectToDataBase();

    const productFound = await ProductSchema?.findByIdAndUpdate(productId, {
      title,
      description,
      price: Number(price),
      quantity: Number(quantity),
      images,
    });

    res?.status(200).json(productFound);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
}
