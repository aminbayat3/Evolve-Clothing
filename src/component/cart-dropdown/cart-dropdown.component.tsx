import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const cartItemsLength = cartItems.length;

  const goToCheckoutHandler = () => {
    navigate("/checkout");
    // setIsCartOpen(!isCartOpen);
    dispatch(setIsCartOpen(false));
  };

  return (
    <div className="cart-dropdown position-absolute d-flex flex-column justify-content-center">
      <div className="cart-dropdown__items d-flex flex-column" style={cartItemsLength > 2 ? undefined : {overflowY: "initial"}}>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <Button type="button" onClick={goToCheckoutHandler}>
        GO TO CHECKOUT
      </Button>
    </div>
  );
};

export default CartDropdown;
