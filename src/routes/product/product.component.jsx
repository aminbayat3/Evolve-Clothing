import { useContext } from "react";
import { useParams } from "react-router-dom";

import { ProductContext } from "../../contexts/shop-context";
import ProductCard from "../../component/product-card/product-card.component";

import "./product.styles.scss";

const ProductPage = () => {
  const { productId } = useParams();
  const { selectItems } = useContext(ProductContext);
  //shop-context first gets rendered without calling the useEffect. as a result, all of those components that are using value object get rendered  the first time that's why we first get undefined for selectItems function because products variabel is an empty object, then we get the whole products after useEffect gets called
  return (
    <div className="product-page">
      <h2 className="title">{productId}</h2>
      <div className="items">
        {selectItems(productId) &&
          selectItems(productId).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
