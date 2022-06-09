import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  // cartItemCount: () => {},
  cartCount: 0,
  cartTotal: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

const addCartItem = (cartItems, productToAdd, checkoutProduct) => {
  let isProductExist = true;

  if(!checkoutProduct)
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
  if(productToRemove.quantity > 1) {
    return cartItems.map((cartItem) => cartItem.id === productToRemove.id ? ({...cartItem, quantity: cartItem.quantity - 1}) : (cartItem))
  } else {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
  }
}

const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
}



export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0); // we could handle this without storing this in the state
  const [cartTotal, setCartTotal] = useState(0); // we could also handle this without storing it in the state

  const addItemToCart = (productToAdd, checkoutProduct) => {
    setCartItems(addCartItem(cartItems, productToAdd, checkoutProduct));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  }

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
  }

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newTotal = cartItems.reduce((total, cartItem) => total += cartItem.price * cartItem.quantity, 0);
    setCartTotal(newTotal);
  }, [cartItems]);


  // const totalPrice = () => {
  //   return cartItems.reduce((total, cartItem) => total += cartItem.price * cartItem.quantity, 0);
  // }

  //   const cartItemCount = () => {
  //     return cartItems.reduce((accumulator, cartItem) => accumulator + cartItem.quantity, 0);
  //   }

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    cartTotal,
    removeItemFromCart,
    clearItemFromCart,
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
