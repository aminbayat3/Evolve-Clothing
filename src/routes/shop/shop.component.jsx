import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import ProductsOverview from "../../component/products-overview/products-overview.component";
import CategoryPage from "../category/category.component";
import { setCategories } from "../../store/categories/categories.action";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    try {
      (async () => {
        const categoriesArray = await getCategoriesAndDocuments();
        if (mounted) {
          dispatch(setCategories(categoriesArray));
        }
      })();
    } catch (error) {
      console.log("error occured!", error.message);
    }
    return () => (mounted = false);
  }, []);

  return (
      <Routes>
        <Route exact index element={<ProductsOverview />} />
        <Route path="/:categoryId" element={<CategoryPage />} />
      </Routes>
  );
};

export default Shop;
