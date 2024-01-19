import React, { useContext, useEffect, useState  } from 'react';
import { AuthContext } from './AuthProvider';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion"
import Loading from './Loading';

const AllAdmins = () => {
    const { user, loading} = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const query = "Admin";

    if (loading) 
        return <Loading></Loading>

    useEffect(() => {
         fetch(`https://brainy-boa-shoulder-pads.cyclic.app/users?role=${query}`)
            .then(res => res.json())
            .then(data => {
             //   console.log(data);
                setCart(data);
             //   console.log(cart);
            })
    },[]);

    return (
        <div>
            <Helmet>
                <title>Fast | All Admins</title>
            </Helmet>
            <motion.div animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}>
                    <h1 className="text-3xl font-bold my-2 text-center">All Admins</h1>
            </motion.div>

            {
                cart.length ? 
                <div>
                    <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                        <tr>
                            <th>SL.</th> 
                            <th>Admin<br />Name</th> 
                            <th>Email</th> 
                            <th>Phone<br></br>Number</th>  
                        </tr>
                        </thead> 
                        <tbody>
                        {
                            cart.map((card,index) => (
                                <tr key={index}>
                                    <th>{index+1}.</th> 
                                    <td>{card.name}</td> 
                                    <td>{card.email}</td>
                                    <td>{card.number}</td> 
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
                    <h1 className="text-5xl font-bold mt-5 text-center">No Admin Found!</h1>
                </motion.div>
            }
        </div>
    );
};

export default AllAdmins;