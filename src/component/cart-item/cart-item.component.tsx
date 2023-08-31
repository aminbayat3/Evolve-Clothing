import { FC, memo } from 'react';

import { CartItem as TCartItem } from '../../store/cart/cart.type';

import './cart-item.styles.scss';

export type CartItemProps = {
    cartItem: TCartItem;
}

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
    console.log('cartitem')
    const { name, imageUrl, price, quantity } = cartItem;
    return(
        <div className='cart-item w-100 d-flex mb-4'>
            <img src={imageUrl} alt={`${name}`} />

            <div className='cart-item__details d-flex flex-column'>
                <span className='cart-item__details__name'> {name} </span>
                <span className='cart-item__details__price'>{quantity} x ${price}</span>
            </div>
        </div>
    )
});

export default CartItem;