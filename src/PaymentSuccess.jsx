import React from 'react';
import ReactConfetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { motion } from "framer-motion"
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
    const { width, height } = useWindowSize()
    return (
        <div>
            <Helmet>
                <title>Fast | Payment Confirmation</title>
            </Helmet>

            <motion.div animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}>
                    <h1 className="text-3xl font-bold my-2 text-center">Congrats! Your Payment Received Successfully</h1>
            </motion.div>

            <ReactConfetti
                width={width}
                height={height}
            />
            <div className='flex justify-center'>
                <Link to="/"><button className='btn bg-green-500 text-white'>Go Home</button></Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;