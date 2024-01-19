import React, { useContext, useEffect, useState  } from 'react';
import { AuthContext } from './AuthProvider';
import { Helmet } from 'react-helmet-async';
import { motion } from "framer-motion"
import Loading from './Loading';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const AllUsers = () => {
    const { user, loading} = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const query = "User";
    const [count, setCount] = useState(0)
    const role = "User";

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    

    const numberOfPages = Math.ceil(count / itemsPerPage);

  //  console.log(numberOfPages);

    const pages = [...Array(numberOfPages).keys()];

    if (loading) 
        return <Loading></Loading>

    useEffect( () =>{
        fetch(`https://brainy-boa-shoulder-pads.cyclic.app/userCount?role=${role}`)
        .then(res => res.json())
        .then(data => {
       //     console.log(data.length);
            setCount(data.length)
        })
    }, [])

   // console.log(count);

    useEffect(() => {
         fetch(`https://brainy-boa-shoulder-pads.cyclic.app/users?role=${query}&page=${currentPage}&size=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => {
              //  console.log(data);
                setCart(data);
               // console.log(cart);
            })
    },[currentPage, itemsPerPage]);

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    const makeAdmin = _id => {
           //  console.log(_id);
     
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            buttons: ["Cancel", "Do it!"],
        }).then((result) => {
            if (result) {

                const targetUser = cart.find(car => car._id === _id);
                targetUser.role = "Admin";

            //   console.log(targetUser.email);

                fetch(`https://brainy-boa-shoulder-pads.cyclic.app/users/${targetUser.email}`, {
                method: "PUT",
            //  mode: 'no-cors',
                headers: {
                    'content-type': 'application/json'
                //  'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(targetUser)
                })
                .then((res) => res.json())
                .then((data) => {
                //  console.log(data);
                    if(data.modifiedCount || data.upsertedCount){
                        swal(
                            'Done!',
                            `${targetUser.name} is now Admin`,
                            'success'
                        )
                        navigate('/dashboard/all admins');
                    //   const update = cart.filter(car => car._id !== _id);
                    //   setCart(update);
                    }
                    else{
                        toast.error('Something is Wrong! Please Try Again Later');
                    }
                });

            }
        })
    }

    const makeDeliveryMen = _id => {
        //   console.log(_id);

        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            buttons: ["Cancel", "Do it!"],
        }).then((result) => {
            if (result) {

                const targetUser = cart.find(car => car._id === _id);
                targetUser.role = "Delivery Men";

            //     console.log(targetUser.email);

                fetch(`https://brainy-boa-shoulder-pads.cyclic.app/users/${targetUser.email}`, {
                method: "PUT",
                //  mode: 'no-cors',
                headers: {
                    'content-type': 'application/json'
                    //  'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify(targetUser)
                })
                .then((res) => res.json())
                .then((data) => {
                    //  console.log(data);
                    if(data.modifiedCount || data.upsertedCount){
                        swal(
                            'Done!',
                            `${targetUser.name} is now DeliveryMen`,
                            'success'
                        )
                        navigate('/dashboard/all delivery men');
                        //  const update = cart.filter(car => car._id !== _id);
                        //  setCart(update);
                        // // setCount(count-1);
                        // // console.log(count);
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
                <title>Fast | All Users</title>
            </Helmet>

            <motion.div animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}>
                    <h1 className="text-3xl font-bold my-2 text-center">All Users</h1>
            </motion.div>

            {
                cart.length ? 
                <div>
                    <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                        <tr>
                            <th>SL.</th> 
                            <th>User's<br />Name</th> 
                            <th>Phone<br></br>Number</th> 
                            <th>Number of<br />Parcel Booked</th> 
                            <th>Total Spent<br />Amount</th> 
                            <th>Action</th>
                        </tr>
                        </thead> 
                        <tbody>
                        {
                            cart.map((card,index) => (
                                <tr key={index}>
                                    <th>{currentPage*5 + index+1}.</th> 
                                    <td>{card.name}</td> 
                                    <td>{card.number}</td> 
                                    <td>{card.numberofParcelBooked}</td>
                                    <td>{card.totalSpent}</td>
                                    <td><button onClick={() => makeAdmin(card._id)} className='btn btn-sm bg-blue-500 text-white'>Make Admin</button>
                                    <button onClick={() => makeDeliveryMen(card._id)} className='btn btn-sm bg-green-500 text-white'>Make DeliveryMen</button></td>
                                    
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
                    <h1 className="text-5xl font-bold mt-5 text-center">No User Found!</h1>
                </motion.div>
            }

            <div className='w-11/12 mx-auto my-5'>
                {/* <p>Current page: {currentPage}</p> */}
                {
                    cart.length ? <button className='btn btn-sm bg-green-500 text-white' onClick={handlePrevPage}>Prev</button> : <div></div>
                }
                
                {
                    pages.map(page => <button
                        className={currentPage === page ? 'btn btn-sm btn-active m-1 bg-green-500 text-white' : 'btn btn-sm m-1'}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >{page+1}</button>)
                }
                {
                    cart.length ? <button className='btn btn-sm bg-green-500 text-white' onClick={handleNextPage}>Next</button> : <div></div>
                }
            </div>
        </div>
    );
};

export default AllUsers;