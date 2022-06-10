import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

// import SHOP_DATA from "../shop-data.js"; // we only need it one time

export const ProductContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products] = useState([]);

  // useEffect(() => {  // we need to do it only one time
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);

  return <ProductContext.Provider value={products}>{children}</ProductContext.Provider>;
};
