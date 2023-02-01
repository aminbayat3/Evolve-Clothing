import { CategoryItem } from "../../store/categories/categories.type";
import { CartItem } from "../../store/cart/cart.type";

const isItemExist = (
  cartItems: CartItem[],
  productToAdd: CategoryItem,
  isCheckoutProduct: boolean
): boolean => {
  if (!isCheckoutProduct) {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) return true;
    else return false;
  }

  return true;
};


export const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem,
  isCheckoutProduct: boolean
): CartItem[] => {
  if (isItemExist(cartItems, productToAdd, isCheckoutProduct)) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }
};

export const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CartItem
): CartItem[] => {
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

export const clearCartItem = (cartItems: CartItem[], productToClear: CartItem): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};
