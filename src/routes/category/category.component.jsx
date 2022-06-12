import { useContext, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { ProductContext } from "../../contexts/shop-context";
import ProductCard from "../../component/product-card/product-card.component";

import "./category.styles.scss";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { categoriesMap } = useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState(''); // just comparing useCallback and useEffect here.

  useEffect(() => {  //we did it this way because whenever our category gets rendered this line wont get executed
    setProducts(categoriesMap[categoryId]);
    console.log("selectItems");
  }, [categoryId, categoriesMap]);
  console.log('categorypage')
  // const selectItems = useCallback((categoryId) => {
  //   console.log('selectItems')
  //   return categoriesMap[categoryId];
  // }, [categoryId, categoriesMap]);
  // console.log(selectItems(categoryId))

  return (
    <div className="product-page">
      <h2 className="title">{categoryId.toUpperCase()}</h2>
      <button style={{
        width: '200px',
        margin: '0 auto 10px'
      }} onClick={() => setMessage('Amen')}>Change the message</button>
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