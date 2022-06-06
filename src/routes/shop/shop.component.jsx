import { useContext } from 'react';

import { ProductContext } from '../../contexts/shop-context';
import ProductCard from '../../component/product-card/product-card.component';

import './shop.styles.scss';

const Shop = () => {

    const products = useContext(ProductContext);

    return(
        <div className='products-container'>
            {
                products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            }
        </div>
    )
}

// * Remember in the practice project try to change the shop data js , use it as befere

export default Shop;