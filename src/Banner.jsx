import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"

const Banner = () => {
    return (
        <motion.div animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }} className='md:h-80 md:w-11/12 mx-auto my-5'>
            <div className="hero h-full" style={{backgroundImage: 'url(https://i.ibb.co/pvxJtYG/pexels-yan-krukau-6818157.jpg)'}}>
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div>
                        <h1 className="mb-10 text-5xl font-bold text-green-500">Delivering Smile</h1>
                        <div className="flex">
                        <input type="text" placeholder="Search here...." className="input input-bordered bg-white text-black w-full max-w-xs mr-2 mb-2" />
                        <button className="btn bg-green-500 text-white">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Banner;