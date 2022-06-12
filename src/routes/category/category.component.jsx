import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ProductContext } from "../../contexts/shop-context";
import ProductCard from "../../component/product-card/product-card.component";

import "./category.styles.scss";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { categoriesMap } = useContext(ProductContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {  //we did it this way because whenever our category gets rendered this line wont get executed
    setProducts(categoriesMap[categoryId]);
  }, [categoryId, categoriesMap]);

  return (
    <div className="product-page">
      <h2 className="title">{categoryId.toUpperCase()}</h2>
      <div className="items">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;

//check if you could use a useCallback on selectItems funtion you had before