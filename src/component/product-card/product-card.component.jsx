import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { ProductCardContainer, Footer } from "./product-card.styles";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, price } = product;

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

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
