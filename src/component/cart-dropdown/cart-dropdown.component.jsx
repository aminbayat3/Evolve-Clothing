import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart-context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
  InitialCartItems,
} from "./cart-dropdown.styles";

// const getOverflow = (state = 'scroll') => {
//   return {
//     scroll: CartItems,
//     initial: InitialCartItems,
//   }[state]
// }

// let CustomCartItems = InitialCartItems;

const CartDropdown = () => {
  const { setIsCartOpen, cartItems, isCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log('useEffect')
  //   const state = cartItems.length > 2 ? ('scroll') : ('initial');
  //   CustomCartItems = getOverflow(state);
  // }, [cartItems]);

  const goToCheckoutHandler = () => {
    navigate("/checkout");
    // setIsCartOpen(!isCartOpen);
    setIsCartOpen();
  };

  return (
    <CartDropdownContainer>
      {/* <CustomCartItems> */}
      <CartItems scroll={cartItems.length > 2}>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      {/* </CustomCartItems> */}
      <Button type="button" onHandleClick={goToCheckoutHandler}>
        GO TO CHECKOUT
      </Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
