import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const ProductContext = createContext({
  categoriesMap: {},
  selectItems: () => {},
});

export const ProductsProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    let mounted = true;
    try {
      (async () => {
        const categoryMap = await getCategoriesAndDocuments();
        if (mounted) {
          setCategoriesMap(categoryMap);
        }
      })();
    } catch (error) {
      console.log("error occured!", error.message);
    }
    return () => (mounted = false);
  }, []);

  // const selectItems = (categoryId) => {
  //   return categoriesMap[categoryId];
  // }

  const value = { categoriesMap };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
 //shop-context first gets rendered without calling the useEffect. as a result, all of those components that are using value object get rendered  the first time that's why we first get undefined for products variable in the products-overview compoenent or other components that use this variable, then we get the whole products after calling the useEffect( remember the useEffect gets called after the return)