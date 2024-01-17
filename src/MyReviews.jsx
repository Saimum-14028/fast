import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';
import Loading from './Loading';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion"

const MyReviews = () => {
    const { user, loading} = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const [target, setTarget] = useState([])

    if (loading) 
        return <Loading></Loading>

    useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`)
            .then(res => res.json())
            .then(data => setTarget(data))
    }, [user.email],);

    const id = target._id;

  //  console.log(id);

    useEffect(() => {
        fetch(`http://localhost:5000/reviews?delivery_men_id=${id}`)
            .then(res => res.json())
            .then(data => setCart(data))
    }, [id]);

 //   console.log(cart);

    return (
        <div>
            <Helmet>
                <title>Fast | My Reviews</title>
            </Helmet>

            <motion.div animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}>
                    <h1 className="text-3xl font-bold my-2 text-center">My Reviews</h1>
            </motion.div>

            {
                cart.length ? 
                <div className="grid gap-12 text-center md:grid-cols-2">
                    {
                        cart.map((card,index) => (
                            <div key={index}>
                                {/* <!--First Testimonial--> */}
                                <div className="mb-6 py-2 md:mb-0 bg-base-200">
                                    <div className="avatar">
                                        <div className="w-24 rounded-full">
                                            <img src={card.reviewer_image} alt={card.reviewer_name}/>
                                        </div>
                                    </div>
                                    <p className="italic">{card.reviewer_name}</p>
                                    <p >{card.feedback_date}</p>

                                    <div className="rating">
                                        {card.rating > 0 ?
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />:""
                                        }
                                        {card.rating > 1 ?
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />:""
                                        }
                                        {card.rating > 2 ?
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />:""
                                        }
                                        {card.rating > 3 ?
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />:""
                                        }
                                        {card.rating > 4 ?
                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />:""
                                        }
                                    </div>
                                    
                                    <p className="my-4 text-xl">
                                        {card.feedback}
                                    </p>
                                    
                                </div>
                            </div>
                        )) 
                    }
                </div> :
                <motion.div animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}>
                    <h1 className="text-5xl font-bold mt-5 text-center">No Review Found!</h1>
                </motion.div>
            }
        </div>
    );
};

export default MyReviews;