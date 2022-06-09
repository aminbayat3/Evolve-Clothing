import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import { CartContext } from "../../contexts/cart-context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { setIsCartOpen, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const cartItemsLength = cartItems.length;

  const goToCheckoutHandler = () => {
    navigate('/checkout');
    setIsCartOpen(prevIsCartOpen => !prevIsCartOpen);
  }


  
  return (
    <div className="cart-dropdown-container">
      <div
        className="cart-items"
        style={cartItemsLength > 2 ? null : { overflowY: "initial" }}
      >
        {cartItemsLength ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button type="button" onHandleClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
