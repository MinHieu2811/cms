import ProductSchema from "@/model/ProductModel";
import { connectToDataBase } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

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

  await connectToDataBase()

  try {
    const productId = req?.query?.id as string
    const productFound = await ProductSchema?.findById(productId)

    res?.status(200).json(productFound);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
}
