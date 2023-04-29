import { useSelector } from "react-redux";

import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/categories.selector";

import ProductsPreview from "../../component/products-preview/products-preview.component";
import Spinner from "../../component/spinner/spinner.component";

const ProductsOverview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  //shop-context first gets rendered without calling the useEffect. as a result, all of those components that are using value object get rendered the first time that's why we first get undefined for products variable in the products-overview compoenent then we get the whole products.
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title, index) => {
          const products = categoriesMap[title];
          return (
            <ProductsPreview key={`${title}-${index}`} title={title} products={products} />
          );
        })
      )}
    </>
  );
};

export default ProductsOverview;