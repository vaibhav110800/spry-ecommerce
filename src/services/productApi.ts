import products from "../data/products.json";
import type { Product } from "../types";
import { NETWORK_DELAY } from "../utils/constant";

const delay = () =>
  new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY));

export const getProducts = async (): Promise<Product[]> => {
  await delay();

  return products as Product[];
};
