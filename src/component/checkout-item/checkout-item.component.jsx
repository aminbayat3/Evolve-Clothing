import { useContext } from 'react';

import { CartContext } from '../../contexts/cart-context';

import {CheckoutItemContainer, ImageContainer, Quantity, Price} from './checkout-item.styles';

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
        <CheckoutItemContainer>
            <ImageContainer imageUrl={imageUrl} />

            <span>{name}</span>
            <Quantity>
                <div onClick={removeProductFromCart}>&#10094;</div>
                <span>{quantity}</span>
                <div onClick={addProductToCart}>&#10095;</div>
            </Quantity>
            <Price>{price}</Price>
            <div onClick={clearProductFromCart}>&#10005;</div>

        </CheckoutItemContainer>
    )
}

export default CheckoutItem;