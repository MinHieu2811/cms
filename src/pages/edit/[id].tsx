import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Button, Input, Stack, StackItem } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Product } from "@/types";
import axios from "axios";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const initialProduct: Product = {
  title: "",
  description: "",
  price: 0,
  images: [],
  quantity: 0,
};

export default function Home() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState<Product>();
  const [loading, setLoading] = useState(false);

  const handleOnChange =
    (key?: keyof Product) => (e: ChangeEvent<HTMLInputElement>) => {
      setProductInfo({
        ...productInfo,
        [key || ""]: e?.target?.value,
      });
    };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios?.get<Product>(
          `/api/product/${router?.query?.id}`
        );
        setProductInfo(res?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [router?.query?.id]);

  const handleCreateProduct = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/product/edit/${router?.query?.id}`, productInfo);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setProductInfo(initialProduct);
    }
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Stack>
          <StackItem>
            <Input
              value={productInfo?.title}
              placeholder="Name"
              onChange={handleOnChange("title")}
            />
          </StackItem>
          <StackItem>
            <Input
              value={productInfo?.description}
              placeholder="Description"
              onChange={handleOnChange("description")}
              resize="horizontal"
            />
          </StackItem>
          <StackItem>
            <Input
              value={productInfo?.price}
              type="number"
              placeholder="Price"
              onChange={handleOnChange("price")}
            />
          </StackItem>
          <StackItem>
            <Input
              value={productInfo?.quantity}
              type="number"
              placeholder="Quantity"
              onChange={handleOnChange("quantity")}
            />
          </StackItem>
          <StackItem>
            <Button
              isLoading={loading}
              loadingText="Submitting"
              colorScheme="teal"
              variant="outline"
              onClick={handleCreateProduct}
            >
              Submit
            </Button>
          </StackItem>
        </Stack>
      </main>
    </>
  );
}
