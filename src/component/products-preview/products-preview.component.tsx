import { FC } from "react";
import ProductCard from "../../component/product-card/product-card.component";

import { CategoryItem } from "../../store/categories/categories.type";

import { ProductPreview, Preview, Title } from  "./products-preview.styles";

export type ProductsPreviewProps = {
  products: CategoryItem[];
  title: string;
}

const ProductsPreview: FC<ProductsPreviewProps> = ({ products, title }) => {
  
  return (
    <ProductPreview>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      <Preview>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </Preview>
    </ProductPreview>
  );
};

export default ProductsPreview;
