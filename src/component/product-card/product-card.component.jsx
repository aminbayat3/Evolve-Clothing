import { useContext, useEffect } from 'react';

import { CartContext } from '../../contexts/cart-context';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { ProductCardContainer, Footer } from "./product-card.styles";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  const { addItemToCart } = useContext(CartContext);

  // useEffect(() => {  //we can check the new state like this
  //   console.log('cartItem is ', cartItems);
  // }, [cartItems]);

  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCardContainer onClick={addProductToCart}>
      <img src={imageUrl} alt={`${name}`} />
      
      <Footer>
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </Footer>

      <Button type='button' buttonType={ BUTTON_TYPE_CLASSES.inverted }>ADD TO CART</Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
