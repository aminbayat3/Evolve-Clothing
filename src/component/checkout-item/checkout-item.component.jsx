import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";

import {
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  Price,
} from "./checkout-item.styles";

const CheckoutItem = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, quantity, price } = product;

  const addProductToCart = () => {
    dispatch(addItemToCart(cartItems, product, true));
  };

  const removeProductFromCart = () => {
    dispatch(removeItemFromCart(cartItems, product));
  };

  const clearProductFromCart = () => {
    dispatch(clearItemFromCart(cartItems, product));
  };

  return (
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
  );
};

export default CheckoutItem;
