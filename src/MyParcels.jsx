import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import Loading from './Loading';

const MyParcels = () => {
    const { user, loading} = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/parcels?email=${user.email}`)
            .then(res => res.json())
            .then(data => setCart(data))
    }, [user.email],);

    console.log(cart);

    const handleSearch = event => {
        event.preventDefault();

        const status = event.target.role.value;

        console.log(status);

        if (loading) 
        return <Loading></Loading>
        
        fetch(`http://localhost:5000/parcels?email=${user.email}&&status=${status}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setCart(data);
                //  console.log(userData);
            })
        }

    const handleCancel = _id => {
        console.log(_id);

        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            buttons: ["Cancel", "Do it!"],
        }).then((result) => {
            if (result) {

                const newParcel = cart.find(car => car._id === _id);
                newParcel.status = "Cancelled";

                console.log(newParcel.status);

                fetch(`http://localhost:5000/parcels/${_id}`, {
                method: "PUT",
              //  mode: 'no-cors',
                headers: {
                    'content-type': 'application/json'
                  //  'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(newParcel)
                })
                .then((res) => res.json())
                .then((data) => {
                  //  console.log(data);
                    if(data.modifiedCount || data.upsertedCount){
                        swal(
                            'Cancelled!',
                            'Your Parcel has been Cancelled.',
                            'success'
                        )
                        navigate('/dashboard/my parcels');
                    }
                    else{
                        toast.error('Something is Wrong! Please Try Again Later');
                    }
                });

            }
        })
    }

    return (
        <div>
            <Helmet>
                <title>Fast | My Parcels</title>
            </Helmet>

            <form onSubmit={handleSearch}>
                <div className='flex gap-2 justify-center mb-5'>
                    <select id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value="">All</option>
                        <option value="Pending">Pending</option>
                        <option value="On the way">On the way</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Returned">Returned</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <div className="form-control">
                        <button type='submit' className="btn bg-green-600">Filter By Status</button>
                    </div>
                </div>
            </form>
        
            {
                cart.length ? 
                <div>
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
                                        
                                        <button onClick={() => handleCancel(card._id)} className='btn btn-sm bg-red-600'>Cancel</button>
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
                    </div>
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