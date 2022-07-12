import { useContext } from 'react';

import { CartContext } from '../../contexts/cart-context';

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
    const { setIsCartOpen, isCartOpen, cartCount } = useContext(CartContext);
    
    const toggleCart = () => {
        setIsCartOpen();
        // setIsCartOpen(!isCartOpen);
        // setIsCartOpen(prevIsCartOpen => !prevIsCartOpen); // when we used useState
    }
    return(
        <CartIconContainer onClick={toggleCart}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;