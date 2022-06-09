import { useContext } from 'react';

import { CartContext } from '../../contexts/cart-context';

import './checkout-item.styles.scss';

const CheckoutItem = ({ product }) => {
    const { name, imageUrl, quantity, price } = product;

    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext);

    const addProductToCart = () => {
        addItemToCart(product, true);
    }

    const removeProductFromCart = () => {
        removeItemFromCart(product);
    }

    const clearProductFromCart = () => {
        clearItemFromCart(product);
    }

    return(
        <div className='checkout-item-container'>
            <div className='image-container' style={{
                backgroundImage: `url(${imageUrl})`
            }} />

            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeProductFromCart}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addProductToCart}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearProductFromCart}>&#10005;</div>

        </div>
    )
}

export default CheckoutItem;