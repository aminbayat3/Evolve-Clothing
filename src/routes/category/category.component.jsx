import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ProductContext } from "../../contexts/shop-context";
import ProductCard from "../../component/product-card/product-card.component";

import { ProductPage, Items} from "./category.styles";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { categoriesMap } = useContext(ProductContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {  //we did it this way because whenever our category gets rendered this line wont get executed
    setProducts(categoriesMap[categoryId]);
  }, [categoryId, categoriesMap]);
  

  return (
    <ProductPage>
      <h2>{categoryId.toUpperCase()}</h2>
      <Items>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Items>
    </ProductPage>
  );
};

export default CategoryPage;

