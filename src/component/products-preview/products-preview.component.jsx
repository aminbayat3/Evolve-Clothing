
import ProductCard from "../../component/product-card/product-card.component";

import './products-preview.styles.scss'

const ProductsPreview = ({ products, title }) => {
    return(
        <div className='products-preview'>
            <h2 className="title">{title}</h2>
            <div className="preview">
            {
                products.filter((product, idx) => idx < 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
            </div>
            
        </div>
    )
}

export default ProductsPreview;