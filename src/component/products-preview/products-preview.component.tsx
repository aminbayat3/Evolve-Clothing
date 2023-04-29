import { FC } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../../component/product-card/product-card.component";
import { CategoryItem } from "../../store/categories/categories.type";

import "./products-preview.styles.scss";

export type ProductsPreviewProps = {
  products: CategoryItem[];
  title: string;
}

const ProductsPreview: FC<ProductsPreviewProps> = ({ products, title }) => {
  
  return (
    <div className="products d-flex flex-column mb-6">
      <h2>
        <Link className="products__title mb-5" to={title}>{title.toUpperCase()}</Link>
      </h2>
      <div className="products__preview d-flex space-between gapx-1">
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
