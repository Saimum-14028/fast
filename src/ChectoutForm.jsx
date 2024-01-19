import React, { useContext } from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Loading from './Loading';
import { AuthContext } from './AuthProvider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ChectoutForm = ({singleData}) => {
    const navigate = useNavigate();
    const {user, loading} = useContext(AuthContext);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();

 //   console.log(singleData);

    if(loading)
        <Loading></Loading>

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://brainy-boa-shoulder-pads.cyclic.app/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price: singleData.cost }),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
          //  console.log('payment error', error);
            setError(error.message);
        }
        else {
          //  console.log('payment method', paymentMethod)
            setError('');
        }

      //  confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            toast.error("An Error Found. Please Try Again");
        }
        else {
           // console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id', paymentIntent.id);
                // setTransactionId(paymentIntent.id);

                singleData.payment_status = "Paid";

                // Update data to the server

            fetch(`https://brainy-boa-shoulder-pads.cyclic.app/parcels/${singleData._id}`, {
            method: "PUT",
            //  mode: 'no-cors',
            headers: {
                'content-type': 'application/json'
                //  'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(singleData)
            })
            .then((res) => res.json())
            .then((data) => {
                //  console.log(data);
                if(data.modifiedCount || data.upsertedCount){
                    toast.success('Payment Status Updated Successfully');
                  //  console.log(singleData);
                }
            });
            navigate('/dashboard/payment success');
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
            <div className='flex justify-center'>
            <button className="btn btn-sm bg-green-500 text-white my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay Now
            </button>
            </div>
        </form>
        </div>
    );
};

export default ChectoutForm;

// disabled={!stripe || !clientSecret}