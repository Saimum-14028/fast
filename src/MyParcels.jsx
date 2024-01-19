import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import Loading from './Loading';
import moment from 'moment';
import ReviewModal from './ReviewModal';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

const MyParcels = () => {
    const { user, loading} = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [deliveryMan, setDeliveryMan] = useState([]);
    const [newUser, setNewUser] = useState();
    const [id, setId] =useState();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (loading) 
        return <Loading></Loading>

    useEffect(() => {
        fetch(`https://brainy-boa-shoulder-pads.cyclic.app/parcels?email=${user.email}`)
            .then(res => res.json())
            .then(data => setCart(data))
    }, [user.email],);

 //   console.log(user);

    const handleSearch = event => {
        event.preventDefault();

        const status = event.target.role.value;

        if (loading) 
        return <Loading></Loading>
        
        fetch(`https://brainy-boa-shoulder-pads.cyclic.app/parcels?email=${user.email}&status=${status}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setCart(data);
                //  console.log(userData);
            })
    }

    const handleCancel = _id => {
   //     console.log(_id);

        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            buttons: ["Cancel", "Do it!"],
        }).then((result) => {
            if (result) {
                const newParcel = cart.find(car => car._id === _id);
                newParcel.status = "Cancelled";

                fetch(`https://brainy-boa-shoulder-pads.cyclic.app/parcels/${_id}`, {
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

    const handleReview = _id => {
      //  console.log(_id);

        const remaining = cart.find(car => car._id === _id);
   //     console.log(remaining);
        setDeliveryMan(remaining);
        // console.log(deliveryMan.delivery_men_id);

        // const query = deliveryMan.delivery_men_email;

        // console.log(query);

        // fetch(`https://brainy-boa-shoulder-pads.cyclic.app/users?email=${deliveryMan?.delivery_men_email}`)
        //     .then((res) => res.json())
        //     .then(data => setNewUser(data))
    }

  //  console.log(deliveryMan);

    useEffect(() => {
        fetch(`https://brainy-boa-shoulder-pads.cyclic.app/users?email=${deliveryMan?.delivery_men_email}`)
            .then(res => res.json())
            .then(data => setNewUser(data))
    }, [deliveryMan?.delivery_men_email],);

    //   console.log(newUser);

    const handleSubmit = event => {
        event.preventDefault();
 
         const form = event.target;

         const reviewer_name = user.displayName;
         const reviewer_image = user.photoURL;
         const delivery_men_id = deliveryMan.delivery_men_id;
         const rating = form.rating.value;
         const feedback = form.feedback.value;
         const feedback_date = moment().format('YYYY-MM-DD');

         const target = {reviewer_name, reviewer_image, delivery_men_id, rating, feedback, feedback_date};

      //   console.log(target);
 
         fetch('https://brainy-boa-shoulder-pads.cyclic.app/reviews', {
            method: 'POST',
            //mode: 'no-cors',
            headers: {
                'content-type': 'application/json'
                //'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(target)
            })
            .then(res => res.json())
            .then(data => {
                //  console.log(data);
                if (data.insertedId) {
                    swal("Done!", "Review Given Successfully!", "success");
                   //  navigate('/my parcels');
                   //   console.log(data);
                   newUser[0].totalReview = parseInt(newUser[0].totalReview) + parseInt(rating);
                    newUser[0].numberOfRating = parseInt(newUser[0].numberOfRating) + 1;
                    newUser[0].averageRating = parseFloat(newUser[0].totalReview/newUser[0].numberOfRating);

           //         console.log(newUser[0]);

                    fetch(`https://brainy-boa-shoulder-pads.cyclic.app/users/${newUser[0]?.email}`, {
                        method: "PUT",
                    //  mode: 'no-cors',
                        headers: {
                            'content-type': 'application/json'
                        //  'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify(newUser[0])
                        })
                        .then((res) => res.json())
                        .then((data) => {
                        //  console.log(data);
                            if(data.modifiedCount || data.upsertedCount){
                                toast.success('Updated Successfully');
                                navigate('/dashboard/my parcels');
                            }
                            else{
                                toast.error('Something is Wrong! Please Try Again Later');
                            }
                    });
                }
                else{
                    toast.error('Something is Wrong! Please Try Again Later');
            }
        })  
    }

    return (
        <div>
            <Helmet>
                <title>Fast | My Parcels</title>
            </Helmet>

            <ReviewModal isOpen={isModalOpen} onClose={closeModal} handleSubmit={handleSubmit} user={user} deliveryMan={deliveryMan}/>

            <motion.div animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}>
                    <h1 className="text-3xl font-bold my-2 text-center">My Parcels</h1>
            </motion.div>

            <form onSubmit={handleSearch}>
                <div className='flex gap-2 justify-center mb-5'>
                    <select id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value="">All</option>
                        <option value="Pending">Pending</option>
                        <option value="On The Way">On The Way</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Returned">Returned</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <div className="form-control">
                        <button type='submit' className="btn bg-green-500 text-white">Filter By Status</button>
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
                                    <Link to={`/dashboard/payment/${card._id}`}>
                                        <button className='btn btn-sm bg-green-500 text-white'>Pay Now</button>
                                    </Link> : 
                                    <PriceCheckIcon></PriceCheckIcon>
                                }
                                </td>
                                <td>
                                    {card.status === "Pending" ?
                                    <div>
                                        <Link to={`/dashboard/update a parcel/${card._id}`}>
                                        <button className='btn btn-sm bg-blue-500 text-white'>Update</button>
                                        </Link>
                                        
                                        <button onClick={() => handleCancel(card._id)} className='btn btn-sm bg-red-500 text-white'>Cancel</button>
                                    </div>
                                    : 
                                    <div>
                                        <button className='btn btn-sm btn-disabled'>Update</button>
                                    </div>
                                    }
                                    {card.status === "Delivered" ?
                                    <div>
                                    <button className="btn btn-sm bg-green-500 text-white" onClick={()=>{openModal();handleReview(card._id)}}>Review
                                    </button>
                                    </div>: ""}
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