import { useSelector } from "react-redux";

import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import CheckoutItem from "../../component/checkout-item/checkout-item.component";
import PaymentForm from "../../component/payment-form/payment-form.component";

import "./checkout.styles.scss";

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <div className="checkout d-flex flex-column align-items-center mx-auto mt-8 mb-0">
      <div className="checkout__header d-flex space-between w-100 py-1 px-0">
        <div className="checkout__header__block me-1">
          <span>Product</span>
        </div>
        <div className="checkout__header__block">
          <span>Description</span>
        </div>
        <div className="checkout__header__block">
          <span>Quantity</span>
        </div>
        <div className="checkout__header__block checkout__header__block--price">
          <span>Price</span>
        </div>
        <div className="checkout__header__block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} product={cartItem} />
      ))}

      <div className="checkout__total mt-6 ms-auto">
        <span>TOTAL: ${cartTotal}</span>
      </div>
      <PaymentForm />
    </div>
  );
};

export default CheckoutPage;
