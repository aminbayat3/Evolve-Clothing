import { CategoryItem } from "../categories/categories.type";
import {
  createAction,
  withMatcher,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import { CART_ACTIONS_TYPES, CartItem } from "./cart.type";

import {
  addCartItem,
  removeCartItem,
  clearCartItem,
} from "../../utils/cart/cart.utils";

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTIONS_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTIONS_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => {
  return createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, boolean);
});

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems => {
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, cartItems);
  }
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem,
  isCheckoutProduct: boolean
): SetCartItems => {
  const newCartItems = addCartItem(cartItems, productToAdd, isCheckoutProduct);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
): SetCartItems => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart =
  (cartItems: CartItem[], productToClear: CartItem): SetCartItems => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    return setCartItems(newCartItems);
  }
