import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { motion } from "framer-motion"
import TopDeliveryMenCard from './TopDeliveryMenCard';

const TopDeliveryMen = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/users?sortField=numberOfParcelDelivered&sortOrder=desc&sortf=averageRating&sorto=desc`)
            .then(res => res.json())
            .then(data => setCart(data.filter(card => card.role === "Delivery Men")))
    }, []);

    console.log(cart);

    return (
        <div className='w-11/12 mx-auto my-5'>
            <h3 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-10">Top <span className='text-green-500'>5</span> Delivery Men</h3>
            <div>
                {cart.length ?  cart.length > 5 ?     
                <div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10 text-center'>
                        {
                            cart.slice(0,5).map((card) => (
                                <TopDeliveryMenCard key={card._id} card={card}></TopDeliveryMenCard>
                            ))
                        }
                    </div>
                </div> :
                <div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10 text-center'>
                    {
                        cart.map((card) => (
                            <TopDeliveryMenCard key={card._id} card={card}></TopDeliveryMenCard>
                        ))
                    }
                </div>
                </div>
                : 
                <motion.div animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }} className='w-full'>
                    <h1 className="text-3xl font-bold mt-5 text-center">No Data Found!</h1>
                </motion.div>}
            </div>
        </div>
    );
};

export default TopDeliveryMen;