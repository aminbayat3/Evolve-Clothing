import { useDispatch, useSelector } from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartCount } from '../../store/cart/cart.selector';

import { CartIconContainer, ShoppingIcon, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);

    const toggleCart = () => {
        dispatch(setIsCartOpen());
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