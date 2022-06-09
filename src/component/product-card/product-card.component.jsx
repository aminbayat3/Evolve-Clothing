import { useContext, useEffect } from 'react';

import { CartContext } from '../../contexts/cart-context';
import Button from '../button/button.component';

import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  const { addItemToCart } = useContext(CartContext);

  // useEffect(() => {  //we can check the new state like this
  //   console.log('cartItem is ', cartItems);
  // }, [cartItems]);

  const addProductToCart = () => addItemToCart(product);

  return (
    <div className="product-card-container" onClick={addProductToCart}>
      <img src={imageUrl} alt={`${name}`} />
      
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>

      <Button type='button' buttonType='inverted'>ADD TO CART</Button>
    </div>
  );
};

export default ProductCard;
