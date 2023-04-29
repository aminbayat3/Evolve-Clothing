import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { CategoryItem } from "../../store/categories/categories.type";

import Spinner from "../../component/spinner/spinner.component";
import ProductCard from "../../component/product-card/product-card.component";

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/categories.selector";

import "./category.styles.scss";

type CategoryRouteParams = {
  categoryId: string;
}

const CategoryPage = () => {
  const categoriesMap = useSelector(selectCategoriesMap); // this useSelector will run every time the state object in root reducer has updated(whether it is currentUser or categories) and it only forces the component to re-render if the return of the selector function you pass to it is different, and given the fact that the selector always return a new object it will lead to unnecssary re-renders
  const isLoading = useSelector(selectCategoriesIsLoading);
  const { categoryId } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
  const [products, setProducts] = useState<CategoryItem[]>([]);

  useEffect(() => {
    setProducts(categoriesMap[categoryId]);
  }, [categoryId, categoriesMap]);

  return (
    <div className="category d-flex flex-column">
      <h2 className="category__title mt-0 mx-auto mb-6">{categoryId.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="row gapx-1 gapy-2">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
