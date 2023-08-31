import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CartItem } from "../../store/cart/cart.type";

import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";

import './checkout-item.styles.scss';

export type CheckoutItemProps = {
  product: CartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = memo(({ product }) => {
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
    <div className="checkout-item w-100 d-flex align-items-center py-4 px-0">
      <div className="checkout-item__image me-4" style={{
        backgroundImage: `url(${imageUrl})`
      }} />

      <span className="checkout-item__name">{name}</span>
      <div className="checkout-item__quantity d-flex me-xs-3 me-sm-0">
        <div className="checkout-item__quantity__arrow" onClick={removeProductFromCart}>&#10094;</div>
        <span className="checkout-item__quantity__value my-0 mx-3">{quantity}</span>
        <div className="checkout-item__quantity__arrow" onClick={addProductToCart}>&#10095;</div>
      </div>
      <span className="checkout-item__price ps-3">{price}</span>
      <div className="checkout-item__remove-button ps-sm-1 me-xs-5 me-sm-0" onClick={clearProductFromCart}>&#10005;</div>
    </div>
  );
});

export default CheckoutItem;
