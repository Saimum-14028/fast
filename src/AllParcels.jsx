import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';
import Loading from './Loading';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import swal from 'sweetalert';
import toast from 'react-hot-toast';

const AllParcels = () => {
    const { user, loading} = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const [target, setTarget] = useState([]);
    const [deliveryMen, setDeliveryMen] = useState([]);
    const [approximate_delivery_date, setapproximate_delivery_date] = useState(new Date());
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const query = "Delivery Men";

    if (loading) 
        return <Loading></Loading>

    useEffect(() => {
        fetch(`http://localhost:5000/parcels`)
            .then(res => res.json())
            .then(data => {setCart(data); setTarget(data)})
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5000/users?role=${query}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setDeliveryMen(data);
                //  console.log(userData);
            })
    },[]);

  //  console.log(cart);
  //  console.log(deliveryMen);

    const handleManage = _id => {
        console.log(_id);

        const remaining = cart.find(car => car._id === _id);
        setTarget(remaining);
    }

 //   console.log(target);

    const handleAssign = event => {
       //  event.preventDefault();

        const form = event.target;

        target.delivery_men_id = form.deliveryMen.value;
        const temp = deliveryMen.find(car => car._id === target.delivery_men_id);
        target.delivery_men_email = temp.email;
        target.approximate_delivery_date = approximate_delivery_date;
        target.status = "On The Way";

        console.log(target);

        fetch(`http://localhost:5000/parcels/${target._id}`, {
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
                    console.log(data);
                    navigate('/dashboard/all parcels')
                });
        }

        const handleSearch = event => {
            event.preventDefault();
    
          //  const status = event.target.role.value;
    
        //    console.log(status);
        if (loading) 
        return <Loading></Loading>
            
        fetch(`http://localhost:5000/parcels?startDate=${startDate}&endDate=${endDate}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setCart(data);
                //  console.log(userData);
            })
        }

    return (
        <div>
            <Helmet>
                <title>Fast | All Parcels</title>
            </Helmet>

            <div>
                <form onSubmit={handleSearch}>
                    <div className='flex gap-2 justify-between mb-5'>
                        <div className="w-full">
                            <label htmlFor="start_date" className="block mb-2 text-sm font-medium ">Start Date</label>
                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd-MM-yyyy" required/>
                        </div>
                        <div className="w-full">
                            <label htmlFor="end_date" className="block mb-2 text-sm font-medium ">End Date</label>
                            <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" selected={endDate} onChange={(date) => setEndDate(date)} dateFormat="dd-MM-yyyy" required/>
                        </div>
                    </div>
                    <div className="form-control">
                        <button type='submit' className="btn mx-auto bg-green-500 text-white w-1/2 md:w-1/3 lg:w-1/4">Filter By Requested Delivery Date</button>
                    </div>
                    
                </form>
            </div>

            {
                cart.length ? 
                <div>
                    <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                        <tr>
                            <th>SL.</th> 
                            <th>User’s<br />Name</th> 
                            <th>User’s<br />Phone</th> 
                            <th>Booking<br />Date</th> 
                            <th>Requested<br />Delivery<br />Date</th> 
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead> 
                        <tbody>
                        {
                            cart.map((card,index) => (
                            <tr key={card._id}>
                                <th>{index+1}.</th> 
                                <td>{card.name}</td> 
                                <td>{card.number}</td>
                                <td>{card.booking_date.substr(0,10)}</td> 
                                <td>{card.requestedDeliveryDate.substr(0,10)}</td>
                                <td>{card.cost}</td>
                                <td>{card.status}</td>
                                <td>
                                    {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="btn btn-sm bg-green-500 text-white" onClick={()=>{document.getElementById('my_modal_4').showModal();handleManage(card._id)}}>Manage</button>
                                    <dialog id="my_modal_4" className="modal">
                                    <div className="modal-box w-11/12 md:w-1/3 lg:w-1/4 max-w-5xl">

                                        <form onSubmit={handleAssign} action="#">
                                        <div className="w-full">
                                                <label htmlFor="requested_delivery_date" className="block mb-2 text-sm font-medium ">Select Approximate Delivery Date</label>
                                                <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" selected={approximate_delivery_date} onChange={(date) => setapproximate_delivery_date(date)} minDate={new Date()} dateFormat="dd-MM-yyyy" required/>
                                            </div>
                                            <div className="w-full">
                                                <label htmlFor="deliveryMen" className="block mb-2 text-sm font-medium">Select DeliveryMen ID</label>
                                                <select id="deliveryMen" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                                                    {
                                                        deliveryMen.map((card) => (
                                                            <option key={card._id} value={card._id}>{card._id}</option>
                                                        ))
                                                    }
                                                    
                                                </select>
                                            </div>
                                            {/* if there is a button, it will close the modal */}
                                            
                                            <button type='submit' className="btn btn-sm bg-green-500 text-white">Assign</button>
                                        </form>

                                        <div className="modal-action">
                                        
                                        <form method="dialog">
                                            {/* if there is a button, it will close the modal */}
                                            <button className="btn btn-sm bg-red-500 text-white">Close</button>
                                        </form>
                                        </div>
                                    </div>
                                    </dialog>
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

export default AllParcels;