import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CategoryItem } from '../../store/categories/categories.type';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { ProductCardContainer, Footer } from "./product-card.styles";

export type ProductCardProps = {
  product: CategoryItem;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, price } = product;

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product, false));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      
      <Footer>
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </Footer>

      <Button type='button' buttonType={ BUTTON_TYPE_CLASSES.inverted } onClick={addProductToCart}>ADD TO CART</Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
