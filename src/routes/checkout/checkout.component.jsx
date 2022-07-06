import { useContext, useEffect } from 'react';

import { CartContext } from '../../contexts/cart-context';
import CheckoutItem from '../../component/checkout-item/checkout-item.component';

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

const CheckoutPage = () => {
    const { cartItems, cartTotal } = useContext(CartContext);
    
    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map((cartItem) => (
                    <CheckoutItem key={cartItem.id} product={cartItem} />
                ))
            }

            <Total>
                <span>TOTAL: ${cartTotal}</span>
            </Total>

        </CheckoutContainer>
    )
}

export default CheckoutPage;