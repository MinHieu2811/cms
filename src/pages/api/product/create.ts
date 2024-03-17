import ProductSchema from "@/model/ProductModel";
import { connectToDataBase } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const listImages = [
  'photo-1459411552884-841db9b3cc2a.avif',
  'photo-1477414348463-c0eb7f1359b6.avif',
  'photo-1494253109108-2e30c049369b.avif',
  'photo-1496449903678-68ddcb189a24.avif',
  'photo-1497034825429-c343d7c6a68f.avif',
  'photo-1509114397022-ed747cca3f65.avif',
  'photo-1518895949257-7621c3c786d7.avif',
  'premium_photo-1664391847942-f9c4562ad692.avif',
  'premium_photo-1665657351688-3f147227034d.avif',
  'premium_photo-1670591396438-d3c517977c3b.avif'
]

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

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

  await connectToDataBase();

  try {
    const { title, description, price, quantity, images } = req?.body;

    const productFound = await ProductSchema?.find({
      title: title,
    });

    if (productFound?.length) {
      res?.status(500)?.json({
        success: false,
        message: "This product name has already exist!",
      });
      return;
    }

    const createdProduct = await ProductSchema?.create({
      title,
      description,
      price: Number(price),
      quantity: Number(quantity),
      images: [listImages[randomIntFromInterval(0, listImages?.length)]],
      createdAt: new Date(),
    });

    return res?.status(200).json({
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
