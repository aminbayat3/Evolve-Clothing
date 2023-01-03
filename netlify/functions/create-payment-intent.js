require("dotenv").config(); // this is our backend
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => { // old school way of saying export
    try {
        const { amount } = JSON.parse(event.body);

        const paymentIntent = await stripe.paymentIntent.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"]
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ paymentIntent })
        }
    } catch (error) {
        console.log('error parsing ', error);

        return {
            status: 400,
            body: JSON.stringify({error})
        }
    }
}