import React, { useContext, useEffect, useState  } from 'react';
import { AuthContext } from './AuthProvider';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion"
import Loading from './Loading';

const AllDeliveryMen = () => {
    const { user, loading} = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const query = "Delivery Men";

    if (loading) 
        return <Loading></Loading>

    useEffect(() => {
         fetch(`http://localhost:5000/users?role=${query}`)
            .then(res => res.json())
            .then(data => {
             //   console.log(data);
                setCart(data);
             //   console.log(cart);
            })
    },[],);

    return (
        <div>
            <Helmet>
                <title>Fast | All Delivery Men</title>
            </Helmet>
            <motion.div animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}>
                    <h1 className="text-3xl font-bold my-2 text-center">All Delivery Men</h1>
            </motion.div>

            {
                cart.length ? 
                <div>
                    <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                        <tr>
                            <th>SL.</th> 
                            <th>Delivery<br />Man's Name</th> 
                            <th>Phone<br></br>Number</th> 
                            <th>Number of<br />Parcel Delivered</th> 
                            <th>Average<br />Review</th> 
                        </tr>
                        </thead> 
                        <tbody>
                        {
                            cart.map((card,index) => (
                                <tr key={index}>
                                    <th>{index+1}.</th> 
                                    <td>{card.name}</td> 
                                    <td>{card.number}</td> 
                                    <td>{card.numberOfParcelDelivered}</td>
                                    <td>{card.averageRating?.toFixed(2)}</td>
                                </tr>
                                )) 
                        }
                        </tbody> 
                    </table>
                    </div>
                </div> : 
                <motion.div animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}>
                    <h1 className="text-5xl font-bold mt-5 text-center">No Delivery Men Found!</h1>
                </motion.div>
            }
        </div>
    );
};

export default AllDeliveryMen;