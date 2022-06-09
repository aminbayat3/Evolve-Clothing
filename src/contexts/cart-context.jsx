import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  // cartItemCount: () => {},
  cartCount: 0,
});

const addCartItem = (cartItems, productToAdd) => {
  const isProductExist = cartItems.find(
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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0); // we could handle this without storing this in the state

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  //   const cartItemCount = () => {
  //     return cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0);
  //   }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

//   const cartItemCount = () => {
//     let count = 0;
//     cartItems.forEach((cartItem) => {
//         count += cartItem.quantity;
//     });
//     return count;
//   }

//   const cartItemCount = () => {
//     let count = 0;
//     const cartItemQuantities = cartItems.map((cartItem) => {
//         return cartItem.quantity;
//     });
//     for (let quantity of cartItemQuantities) {
//         count += quantity;
//     }
//     return count;
//   }
