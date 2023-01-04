import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
    // setIsCartOpen(!isCartOpen);
    dispatch(setIsCartOpen());
  };

  return (
    <CartDropdownContainer>
      <CartItems scroll={cartItems.length > 2}>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button type="button" onClick={goToCheckoutHandler}>
        GO TO CHECKOUT
      </Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
