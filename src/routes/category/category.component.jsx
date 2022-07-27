import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Spinner from "../../component/spinner/spinner.component";
import ProductCard from "../../component/product-card/product-card.component";

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../store/categories/categories.selector";

import { Title, Items } from "./category.styles";

const CategoryPage = () => {
  const categoriesMap = useSelector(selectCategoriesMap); // this useSelector will run every time the state object in root reducer has updated(whether it is currentUser or categories) and it only force the component to re-render if the return of the selector function you pass to it is different, and given the fact that the selector always return a new object it will lead to unnecssary re-renders
  const isLoading = useSelector(selectCategoriesIsLoading);
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //we did it this way because whenever our category gets rendered this line wont get executed
    setProducts(categoriesMap[categoryId]);
  }, [categoryId, categoriesMap]);

  return (
    <Fragment>
      <Title>{categoryId.toUpperCase()}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <Items>
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </Items>
      )}
    </Fragment>
  );
};

export default CategoryPage;
