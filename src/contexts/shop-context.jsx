import { createContext, useState } from "react";
import PRODUCTS from "../routes/shop/shop-data.json";

export const ProductContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products] = useState(PRODUCTS);

  return <ProductContext.Provider value={products}>{children}</ProductContext.Provider>;
};
