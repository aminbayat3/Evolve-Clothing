import { Routes, Route } from 'react-router-dom';

import ProductsOverview from '../../component/products-overview/products-overview.component';
import ProductPage from '../product/product.component';

const Shop = () => {
  return(
    <Routes>
      <Route exact index element={<ProductsOverview />} />
      <Route index path="/:productId" element={<ProductPage />} />
    </Routes>
  )
};


export default Shop;
