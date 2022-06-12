import { Routes, Route } from 'react-router-dom';

import ProductsOverview from '../../component/products-overview/products-overview.component';
import CategoryPage from '../category/category.component';

const Shop = () => {
  return(
    <Routes>
      <Route exact index element={<ProductsOverview />} />
      <Route path="/:categoryId" element={<CategoryPage />} />
    </Routes>
  )
};


export default Shop;
