import { useContext, Fragment } from "react";

import { ProductContext } from "../../contexts/shop-context";
import ProductsPreview from "../products-preview/products-preview.component";

const ProductsOverview = () => {
  const { categoriesMap } = useContext(ProductContext);
  const productKeys = Object.keys(categoriesMap);
  //shop-context first gets rendered without calling the useEffect. as a result, all of those components that are using value object get rendered  the first time that's why we first get undefined for products variable in the products-overview compoenent then we get the whole products.
  return (
    <Fragment>
      {productKeys.length &&
        productKeys.map((title) => {
          const products = categoriesMap[title];
          return <ProductsPreview key={title} title={title} products={products} />;
        })}
    </Fragment>
  );
};

export default ProductsOverview;
