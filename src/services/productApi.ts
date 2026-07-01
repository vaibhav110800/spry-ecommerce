import products from "../data/products.json";
import type { Product } from "../types";
import { NETWORK_DELAY } from "../utils/constant";

/**
 * Simulates network latency for mock API requests.
 */
const delay = () =>
  new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY));

/**
 * Fetches the list of products after a simulated network delay.
 */
export const getProducts = async (): Promise<Product[]> => {
  await delay();

  return products as Product[];
};
