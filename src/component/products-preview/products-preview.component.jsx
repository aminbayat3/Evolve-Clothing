import ProductCard from "../../component/product-card/product-card.component";

import { ProductPreview, Preview, Title } from  "./products-preview.styles";

const ProductsPreview = ({ products, title }) => {

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
