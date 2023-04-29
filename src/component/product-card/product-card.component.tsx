import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CategoryItem } from '../../store/categories/categories.type';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import "./product-card.styles.scss";

export type ProductCardProps = {
  product: CategoryItem;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, price } = product;

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product, false));

  return (
    <div className='product-card col-3 center flex-column position-relative'>
      <img className=' w-100 mb-1' src={imageUrl} alt={`${name}`} />
      
      <div className='product-card__footer w-100 d-flex space-between'>
        <span className="product-card__footer__name mb-4">{name}</span>
        <span className="product-card__footer__price">${price}</span>
      </div>

      <Button type='button' buttonType={ BUTTON_TYPE_CLASSES.inverted } onClick={addProductToCart}>ADD TO CART</Button>
    </div>
  );
};

export default ProductCard;
