import React, { useContext, useEffect, useState } from 'react';
import './CheckoutForm.css';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import axios from 'axios';

import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { AuthContext } from '../../../Providers/AuthProvider';

const CheckoutForm = ( ) => {
  const price = 100;
  const {user} = useContext(AuthContext);

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [axiosSecure] = UseAxiosSecure();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(()=>{
    console.log(price);
    axiosSecure.post('/create-payment-intent', {price})
    .then(res=>{
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    })
  },[])


  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    console.log('card', card);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setCardError(error.message)
    } else {
      setCardError('')
      console.log('PaymentMethod', paymentMethod);
    }

    const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || 'unknown',
            email: user?.email || 'unknown',
          },
        },
      },
    );

    if(confirmError){
      console.log(confirmError);
    }
    console.log(paymentIntent);

  };



  return (
    <>
    <div className='w-full p-10'>
      <h1 className='my-10'>welcome to checkout form page </h1>

      <form className='w-80 ' onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className="btn btn-primary btn-sm mt-4" type="submit" disabled={!stripe || clientSecret}>
          Pay
        </button>
      </form>
      {cardError && <p className='text-red-500 ms-5 mt-5'>{cardError}</p>}
    </div>
    </>
  );
};

export default CheckoutForm;