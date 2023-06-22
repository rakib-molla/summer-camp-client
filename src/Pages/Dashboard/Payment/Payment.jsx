import React, { useContext, useEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Link, useLoaderData, useParams } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';

const Payment = () => {
    const {user} = useContext(AuthContext);
    const {id}= useParams();

    // const [price, setPrice] = useState({});
     const price = parseInt(id)
    // useEffect(()=>{
    //     fetch(`https://summer-camp-server-12.vercel.app/class/${id}`,{
    //         headers:{
    //             Authorization: `Bearer ${localStorage.getItem('access-token')}`
    //         }
    //     })
    //     .then(res=>res.json())
    //     .then((data)=>{
    //         setPrice(data.price)
    //     })
    // },[])
    console.log(price);

    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);

    return (
        <div className='my-10 w-full p-10'>

            <h1 className='my-10'>welcome to payment page </h1>

            { user ? <Elements stripe={stripePromise}>
                <CheckoutForm price={price}></CheckoutForm>
            </Elements> : <Link to="/login"> Login</Link>
            }
        </div>
    );
};

export default Payment;