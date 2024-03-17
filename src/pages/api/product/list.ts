import { NextApiRequest, NextApiResponse } from "next";
import ProductSchema from "@/model/ProductModel";
import { connectToDataBase } from "@/utils";

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

    await connectToDataBase()

    const productFound = await ProductSchema.find();

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
