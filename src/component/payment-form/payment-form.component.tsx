import { useState, FormEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from '@stripe/stripe-js';
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import Button from "../button/button.component";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";

import "./payment-form.styles.scss";

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessingPayment(true);

    try {
      const response = await fetch(
        "/.netlify/functions/create-payment-intent",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount * 100 }),
        }
      );
      const {
        paymentIntent: { client_secret },
      } = await response.json();

      const cardDetails = elements.getElement(CardElement);

      if(!ifValidCardElement(cardDetails)) { // yiha just returned nothing he didn't throw any error, we can also be more specific about it by using type predicate, so instead of saying (cardDetails === null) we can do this
        throw new Error("card element is not valid");
      }
      
      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardDetails,
          billing_details: {
            name: currentUser ? currentUser.displayName : "Guest",
          },
        },
      });

      setIsProcessingPayment(false);

      if (paymentResult.error) {
        alert(paymentResult.error.message);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          alert("Payment Successful");
        }
      }
    } catch (error) {
      let message: string;
      (error instanceof Error) ? (message = error.message) : (message = String(error));
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: message,
        }),
      };
    }
  };

  return (
    <div className="payment center flex-column">
      <form className="payment__form" onSubmit={paymentHandler}>
        <h2 className="mb-1"> Credit Card Payment: </h2>
        <CardElement />
        <Button disabled={isProcessingPayment} type="submit" buttonType={BUTTON_TYPE_CLASSES.inverted}>
          {" "}
          Pay now{" "}
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
