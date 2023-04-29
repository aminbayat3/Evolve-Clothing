import { useDispatch, useSelector } from 'react-redux';

import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import "./cart-icon.styles.scss";

const CartIcon = () => {
    const dispatch = useDispatch();
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);

    const toggleCart = () => {
        dispatch(setIsCartOpen(!isCartOpen));
        // setIsCartOpen(!isCartOpen);
        // setIsCartOpen(prevIsCartOpen => !prevIsCartOpen); // when we used useState
    }
    return(
        <div className='cart-icon position-relative center' onClick={toggleCart}>
            <ShoppingIcon className='cart-icon__shopping' />
            <span className='cart-icon__item-count position-absolute'>{cartCount}</span>
        </div>
    )
}

export default CartIcon;