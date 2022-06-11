import { useContext } from "react";

import { ProductContext } from "../../contexts/shop-context";
import ProductsPreview from "../products-preview/products-preview.component";

import "./products-overview.styles.scss";

const ProductsOverview = () => {
  const { products } = useContext(ProductContext);
  const productKeys = Object.keys(products);
//shop-context first gets rendered without calling the useEffect. as a result, all of those components that are using value object get rendered  the first time that's why we first get undefined for products variable in the products-overview compoenent then we get the whole products.
  return (
    <div className="products-overview">
      {productKeys.length && productKeys.map((title) => (
        <ProductsPreview key={title} title={title} products={products[title]} />
      ))}
    </div>
  );
};

export default ProductsOverview;
