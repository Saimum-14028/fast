import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion"
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ChectoutForm from './ChectoutForm';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import Loading from './Loading';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    
    const navigation = useNavigation();

    if(navigation.loading == "loading")
    return <Loading></Loading>;

    const singleData = useLoaderData();

   // console.log(singleData);

    return (
        <div>
            <Helmet>
                <title>Fast | Payment</title>
            </Helmet>

            <motion.div animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}>
                    <h1 className="text-3xl font-bold my-2 text-center">Your Parcel Price is: {singleData.cost}</h1>
            </motion.div>

            <div>
                <Elements stripe={stripePromise}>
                    <ChectoutForm singleData={singleData}></ChectoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;