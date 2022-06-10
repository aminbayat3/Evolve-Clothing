import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const ProductContext = createContext({
  products: {},
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    let mounted = true;
    try {
      (async () => {
        const categoryMap = await getCategoriesAndDocuments();
        if (mounted) {
          setProducts(categoryMap);
        }
      })();
    } catch (error) {
      console.log("error occured!", error.message);
    }
    return () => (mounted = false);
  }, []);

  const value = { products };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
