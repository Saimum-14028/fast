import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import { Helmet } from 'react-helmet-async';
import Loading from './Loading';
import { AuthContext } from './AuthProvider';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const UpdateParcel = () => {
    const {user, loading} = useContext(AuthContext);
    const [requestedDeliveryDate, setRequestedDeliveryDate] = useState(new Date());
    const [userData, setUserData] = useState();
    
    const navigate = useNavigate();

    const navigation = useNavigation();

    // receive data from the server
    if (loading) 
        return <Loading></Loading>

    useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                 // console.log(data);
                  setUserData(data);
                //  console.log(userData);
            })
    }, [user.email]);

    if(navigation.loading == "loading")
    return <Loading></Loading>;

    const singleData = useLoaderData();
  
 //   console.log(singleData);

    const { _id, name, email, number, parcel_type, receiver_name, receiver_number, parcel_weight, prevCost, delivery_address, prevRequestedDeliveryDate, latitude, longitude, status, booking_date, approximate_delivery_date, delivery_men_id, payment_status } = singleData;

  //  console.log(singleData.cost);

    const [cost, setCost] = useState(singleData.cost);

    const handleUpdateParcel = event => {
        event.preventDefault();

        const form = event.target;

        const name = form.name.value;
        const email = form.email.value;
        const number = form.number.value;
        const parcel_type = form.parcel_type.value;
        const receiver_name = form.receiver_name.value;
        const receiver_number = form.receiver_number.value;
        const parcel_weight = form.parcel_weight.value;
        const delivery_address = form.delivery_address.value;
        const latitude = form.latitude.value;
        const longitude = form.longitude.value;

        if (number < 0) {
            toast.error('Please input valid Number');
          //  console.log(number)
            return;
        }

        if (receiver_number < 0) {
            toast.error('Please input valid Number');
            return;
        }

        if (parcel_weight <= 0) {
            toast.error('Please input valid Weight');
            return;
        }

        if (latitude > 90 || latitude < -90) {
            toast.error('Please input valid latitude');
           // console.log(latitude)
            return;
        }

        if (longitude > 180 || longitude < -180) {
            toast.error('Please input valid longitude');
          //  console.log(longitude)
            return;
        }

        const newParcel = { name, email, number, parcel_type, receiver_name, receiver_number, parcel_weight, cost, delivery_address, requestedDeliveryDate, latitude, longitude, status, booking_date, approximate_delivery_date, delivery_men_id, payment_status };

     //   console.log(newParcel);

        // Update data to the server

        fetch(`http://localhost:5000/parcels/${singleData._id}`, {
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
                    swal("Done!", "Percel Updated Successfully!", "success");
                    //navigate('/my added items');
                    userData.number = number;
                    userData.numberofParcelBooked = parseInt(userData.numberofParcelBooked);
                    userData.totalSpent = parseInt(userData.totalSpent) + parseInt(cost) - parseInt(singleData.cost);

                    //  console.log(userData);

                    fetch(`http://localhost:5000/users/${user?.email}`, {
                        method: "PUT",
                    //  mode: 'no-cors',
                        headers: {
                            'content-type': 'application/json'
                        //  'Access-Control-Allow-Origin': '*',
                        },
                        body: JSON.stringify(userData)
                        })
                        .then((res) => res.json())
                        .then((data) => {
                        // console.log(data);
                        navigate('/dashboard/my parcels');
                    });
                }
                else{
                    toast.error('Data is same. Please Update');
                }
            });
        }
        
    return (
        <div>
            <Helmet>
                <title>Fast | Update Parcel</title>
            </Helmet>
            <section className="">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-2xl font-bold  text-center">Update A Parcel</h2>
                    <form onSubmit={handleUpdateParcel} action="#">
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium ">Name</label>
                                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your Name" defaultValue={name} readOnly required></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium ">Email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your Email" defaultValue={email} readOnly required></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="number" className="block mb-2 text-sm font-medium ">Number</label>
                                <input type="number" name="number" id="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="01711223344" defaultValue={number} required></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="parcel_type" className="block mb-2 text-sm font-medium ">Parcel's Type</label>
                                <input type="text" name="parcel_type" id="parcel_type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type" defaultValue={parcel_type} required></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="receiver_name" className="block mb-2 text-sm font-medium ">Receiver's Name</label>
                                <input type="text" name="receiver_name" id="receiver_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Receiver Name" defaultValue={receiver_name} required></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="receiver_number" className="block mb-2 text-sm font-medium ">Receiver's Number</label>
                                <input type="number" name="receiver_number" id="receiver_number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="01711223344" defaultValue={receiver_number} required></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="parcel_weight" className="block mb-2 text-sm font-medium ">Parcel's Weight</label>
                                <input type="number" name="parcel_weight" id="parcel_weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Weight" defaultValue={parcel_weight} onChange={ e => setCost(e.target.value >= 3 ? 150 : e.target.value < 0 ? 0 :e.target.value * 50 )} required></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="cost" className="block mb-2 text-sm font-medium ">Cost</label>
                                <p className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">{cost}</p>
                            </div>
                            <div className="w-full">
                                <label htmlFor="delivery_address" className="block mb-2 text-sm font-medium ">Delivery Address</label>
                                <input type="text" name="delivery_address" id="delivery_address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Delivery Address" defaultValue={delivery_address} required></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="requested_delivery_date" className="block mb-2 text-sm font-medium ">Select Delivery Date</label>
                                <DatePicker className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" selected={requestedDeliveryDate} onChange={(date) => setRequestedDeliveryDate(date)} minDate={new Date()} dateFormat="dd-MM-yyyy" required/>
                            </div>
                            <div className="w-full">
                                <label htmlFor="latitude" className="block mb-2 text-sm font-medium ">Latitude</label>
                                <input type="text" name="latitude" id="latitude" inputMode="decimal" pattern="[+]?-?[0-9]*[.]?[0-9]*" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="21.121365496" defaultValue={latitude} required></input>
                            </div>
                            <div className="w-full">
                                <label htmlFor="longitude" className="block mb-2 text-sm font-medium ">Longitude</label>
                                <input type="text" name="longitude" id="longitude" inputMode="decimal" pattern="[+]?-?[0-9]*[.]?[0-9]*" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="21.121365496" defaultValue={longitude} required></input>
                            </div>
                        </div>
                        <div className="form-control mt-6 p-0">
                            <button type='submit' className="btn bg-green-500 text-white">Update Now</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default UpdateParcel;