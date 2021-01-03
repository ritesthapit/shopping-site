import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey =
		"pk_test_51I5K7QDTeXsyN7gRUjuA6vFrn7QSKeYbyZ6Zth3pmFr0cttOa9J3V79o6ogXbLW1BaXlH3I2VbCcmw6zQRywTESs00eeIwWLSo";
	const onToken = (token) => {
		console.log(token);
		alert("Payment Success");
	};
	return (
		<StripeCheckout
			label="Pay Now"
			name="Clothing Site"
			billingAddress
			shippingAddress
			image="https://svgshare.com/i/CUz.svg"
			description={`your total is ${price}`}
			amount={priceForStripe}
			panelLabel="Pay Now"
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
