import { Product } from "@/types";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const ProductModel = new Schema<Product>(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
    images: {
      type: Array<String>,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const ProductSchema =
  mongoose.models?.Product || mongoose.model("Product", ProductModel);
export default ProductSchema;
