import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import ProductsOverview from "../../component/products-overview/products-overview.component";
import CategoryPage from "../category/category.component";
import { fetchCategoriesStart } from "../../store/categories/categories.action";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route exact index element={<ProductsOverview />} />
      <Route path="/:categoryId" element={<CategoryPage />} />
    </Routes>
  );
};

export default Shop;
