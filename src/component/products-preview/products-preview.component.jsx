import { Link } from "react-router-dom";

import ProductCard from "../../component/product-card/product-card.component";

import "./products-preview.styles.scss";

const ProductsPreview = ({ products, title }) => {

  return (
    <div className="products-preview">
      <h2>
        <Link className='title' to={title}>{title.toUpperCase()}</Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductsPreview;
