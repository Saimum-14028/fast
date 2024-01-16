import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';
import Loading from './Loading';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion"
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const MyDeliveryList = () => {
    const { user, loading} = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const [target, setTarget] = useState([])

    if (loading) 
        return <Loading></Loading>

    useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`)
            .then(res => res.json())
            .then(data => setTarget(data))
    }, [user.email],);

    // useEffect(() => {
    //     fetch(`http://localhost:5000/parcels?delivery_men_email=${user.email}`)
    //         .then(res => res.json())
    //         .then(data => setCart(data))
    // }, [user.email],);

    const id = target._id;
   // console.log(id);

    useEffect(() => {
        fetch(`http://localhost:5000/parcels?delivery_men_id=${id}`)
            .then(res => res.json())
            .then(data => setCart(data))
    }, [id],);

    const handleDelivered = _id => {
    //    console.log(_id);

        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            buttons: ["Cancel", "Do it!"],
        }).then((result) => {
            if (result) {
                const newParcel = cart.find(car => car._id === _id);
                newParcel.status = "Delivered";

    //         console.log(newParcel.status);

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
                            'Delivered!',
                            'Your Parcel has Delivered.',
                            'success'
                        )

                        target.numberOfParcelDelivered = parseInt(target.numberOfParcelDelivered) + 1;

                        fetch(`http://localhost:5000/users/${user?.email}`, {
                            method: "PUT",
                        //  mode: 'no-cors',
                            headers: {
                                'content-type': 'application/json'
                            //  'Access-Control-Allow-Origin': '*',
                            },
                            body: JSON.stringify(target)
                            })
                            .then((res) => res.json())
                            .then((data) => {
                        //      console.log(data);
                                if(data.modifiedCount || data.upsertedCount){
                                    toast.success('Updated Successfully');
                                    navigate('/dashboard/my delivery list');
                                }
                                else{
                                    toast.error('Something is Wrong! Please Try Again Later');
                                }
                        });
                    }
                    else{
                        toast.error('Something is Wrong! Please Try Again Later');
                    }
                });
            }
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
 
        //         console.log(newParcel.status);
 
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
                         navigate('/dashboard/my delivery list');
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
                <title>Fast | My Delivery List</title>
            </Helmet>

            {
                cart.length ? 
                <div>
                    <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                        <tr>
                            <th>SL.</th> 
                            <th>Booked<br />User’s<br></br> Name</th> 
                            <th>Receiver's<br></br>Name</th> 
                            <th>Booked<br></br>User’s<br></br> Phone</th> 
                            <th>Requested<br></br> Delivery<br></br> Date</th>
                            <th>Approximate<br></br> Delivery<br></br> Date</th> 
                            <th>Receiver's<br></br> Phone <br></br>number</th>
                            <th>Receivers<br></br> Address</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead> 
                        <tbody>
                        {
                            cart.map((card,index) => (
                                <tr key={index}>
                                    <th>{index+1}.</th> 
                                    <td>{card.name}</td> 
                                    <td>{card.receiver_name}</td>
                                    <td>{card.number}</td> 
                                    <td>{card.requestedDeliveryDate.substr(0,10)}</td>
                                    <td>{card.approximate_delivery_date.substr(0,10)}</td>
                                    <td>{card.receiver_number}</td>
                                    <td>{card.delivery_address}</td>
                                    <td>{card.status}</td>
                                    <td>
                                        <button className='btn btn-sm bg-blue-500 text-white'>View Location</button>
                                        {card.status === "On The Way" ? 
                                        <button onClick={() => handleDelivered(card._id)} className='btn btn-sm bg-green-500 text-white'>Delivered</button>: ""
                                        }
                                        {card.status === "On The Way" ? 
                                        <button onClick={() => handleCancel(card._id)}  className='btn btn-sm bg-red-500 text-white'>Cancel</button>: ""
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

export default MyDeliveryList;