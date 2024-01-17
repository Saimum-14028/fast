import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion"
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import Loading from './Loading';
import moment from 'moment';

const MyParcels = () => {
    const { user, loading} = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [deliveryMan, setDeliveryMan] = useState([]);
    const [newUser, setNewUser] = useState();
    const [id, setId] =useState();

    if (loading) 
        return <Loading></Loading>

    useEffect(() => {
        fetch(`http://localhost:5000/parcels?email=${user.email}`)
            .then(res => res.json())
            .then(data => setCart(data))
    }, [user.email],);

 //   console.log(user);

    const handleSearch = event => {
        event.preventDefault();

        const status = event.target.role.value;

        if (loading) 
        return <Loading></Loading>
        
        fetch(`http://localhost:5000/parcels?email=${user.email}&status=${status}`)
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

    const handleReview = _id => {
        console.log(_id);

        const remaining = cart.find(car => car._id === _id);
   //     console.log(remaining);
        setDeliveryMan(remaining);
        // console.log(deliveryMan.delivery_men_id);

        // const query = deliveryMan.delivery_men_email;

        // console.log(query);

        // fetch(`http://localhost:5000/users?email=${deliveryMan?.delivery_men_email}`)
        //     .then((res) => res.json())
        //     .then(data => setNewUser(data))
    }

  //  console.log(deliveryMan);

    useEffect(() => {
        fetch(`http://localhost:5000/users?email=${deliveryMan?.delivery_men_email}`)
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
 
         fetch('http://localhost:5000/reviews', {
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

                    console.log(newUser[0]);

                    fetch(`http://localhost:5000/users/${newUser[0]?.email}`, {
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
                                    <button className='btn btn-sm bg-green-500 text-white'>Pay Now</button> : 
                                    <p className='text-green-500 font-medium'>Done</p>
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
                                    <button className="btn btn-sm bg-green-500 text-white" onClick={()=>{document.getElementById('my_modal_4').showModal();handleReview(card._id)}}>Review
                                    </button>
                                    <dialog id="my_modal_4" className="modal">
                                        <div className="modal-box w-11/12 md:w-1/2 lg:w-1/4 max-w-5xl">

                                        <form onSubmit={handleSubmit} action="#">
                                            <div className="w-full">
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium ">User's Name</label>
                                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your Name" defaultValue={user.displayName} readOnly required></input>
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="image" className="block mb-2 text-sm font-medium ">User's Image</label>
                                                <input type="text" name="image" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your image" defaultValue={user.photoURL} readOnly required></input>
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="id" className="block mb-2 text-sm font-medium ">DeliveryMen Id</label>
                                                <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" >{deliveryMan.delivery_men_id}</p>
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="rating" className="block mb-2 text-sm font-medium">Select Rating</label>
                                                <select id="rating" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                </select>
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="feedback" className="block mb-2 text-sm font-medium ">Feedback</label>
                                                <textarea id="feedback" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write Here.." required></textarea>
                                            </div>
                                            {/* if there is a button, it will close the modal */}
                                            <button type='submit' className="btn btn-sm bg-green-500 text-white">Submit</button>
                                        </form>

                                    <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button, it will close the modal */}
                                            <button className="btn btn-sm bg-red-500 text-white">Close</button>
                                        </form>
                                    </div>
                                    </div>
                                </dialog>
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