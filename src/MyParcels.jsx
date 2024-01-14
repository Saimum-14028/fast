import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';

const MyParcels = () => {
    const { user} = useContext(AuthContext);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/parcels?email=${user.email}`)
            .then(res => res.json())
            .then(data => setCart(data))
    }, [user.email]);

  //  console.log(cart);

    return (
        <div>
            <Helmet>
                <title>Fast | My Parcels</title>
            </Helmet>
        
            {
                cart.length ? 
                <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                    <tr>
                        <th>SL.</th> 
                        <th>Parcel<br />Type</th> 
                        <th>Requested<br />Delivery<br />Date</th> 
                        <th>Approximate<br />Delivery<br />Date</th> 
                        <th>Booking<br />Date</th> 
                        <th>Delivery<br />Men ID</th> 
                        <th>Booking<br></br>Status</th> 
                        <th>Payment<br></br>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead> 
                    <tbody>
                    {
                        cart.map((card,index) => (
                        <tr key={card._id}>
                            <th>{index+1}.</th> 
                            <td>{card.parcel_type}</td> 
                            <td>{card.requestedDeliveryDate.substr(0,10)}</td>
                            <td>{card.approximate_delivery_date === "" ? "N/A" : card.approximate_delivery_date.substr(0,10)}</td>  
                            <td>{card.booking_date.substr(0,10)}</td> 
                            <td>{card.delivery_men_id === "" ? "N/A" : card.delivery_men_id}</td> 
                            <td>{card.status}</td> 
                            <td>{card.payment_status === "Unpaid" ? 
                                <button className='btn btn-sm bg-green-600'>Pay Now</button> : 
                                <p className='text-green-500 font-medium'>Done</p>
                            }
                            </td>
                            <td>
                                {card.status === "Pending" ?
                                <div>
                                    <Link to={`/dashboard/update a parcel/${card._id}`}>
                                    <button className='btn btn-sm bg-green-600'>Update</button>
                                    </Link>
                                    
                                    <button className='btn btn-sm bg-red-600'>Cancel</button>
                                </div>
                                : ""
                            }
                                {card.status === "Delivered" ?
                                <button className='btn btn-sm bg-green-600'>Review</button>
                                : ""
                            }
                                
                            </td>
                        </tr>
                        )) 
                    }
                    </tbody> 
                </table>
                </div> : 
                <motion.div animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}>
                    <h1 className="text-5xl font-bold mt-5 text-center">No Item Found!</h1>
                </motion.div>
            }
        </div>
    );
};

export default MyParcels;