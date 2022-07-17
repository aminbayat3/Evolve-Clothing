import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTIONS_TYPES } from "./cart.type";

const addCartItem = (cartItems, productToAdd, checkoutProduct) => {
  let isProductExist = true;

  if (!checkoutProduct)
    isProductExist = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );

  if (isProductExist) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }
};

const removeCartItem = (cartItems, productToRemove) => {
  if (productToRemove.quantity > 1) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  } else {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
};

const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

export const setCartItems = (cartItemsObject) =>
  createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, cartItemsObject);

export const setIsCartOpen = () => {
  return createAction(CART_ACTIONS_TYPES.SET_CART_OPEN);
};

export const addItemToCart = (cartItems, productToAdd, checkoutProduct) => {
  const newCartItems = addCartItem(cartItems, productToAdd, checkoutProduct);
  return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, productToClear) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
};
