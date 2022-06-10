import { Fragment ,useContext } from "react";

import { ProductContext } from "../../contexts/shop-context";
import ProductCard from "../../component/product-card/product-card.component";

import "./shop.styles.scss";

// instead of Fragment we can use <></>
const Shop = () => {
  const { products } = useContext(ProductContext);

  return (
    <>
      {Object.keys(products).map((title) => (
        <Fragment key={title}>
        <h2>{title}</h2>
        <div className="products-container">
          {
            products[title].filter((product, idx) => idx < 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          }
        </div>
        </Fragment>
      ))}
    </>
  );
};

// * Remember in the practice project try to change the shop data js , use it as befere

export default Shop;
