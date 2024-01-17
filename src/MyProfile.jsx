import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from './AuthProvider';
import { imageUpload } from './functions';
import Loading from './Loading';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const image_key = import.meta.env.VITE_image_hosting_key;
const image_api = `https://api.imgbb.com/1/upload?key=${image_key}`;

const MyProfile = () => {
    const { user, loading, handleUpdateProfile} = useContext(AuthContext);
    const [cart, setCart] = useState([]);

    const navigate = useNavigate();

    if (loading) 
        return <Loading></Loading>

    useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`)
            .then(res => res.json())
            .then(data => setCart(data))
    }, [user.email],);

  //  console.log(cart);

    const UpdateImage = async (event) => {
        event.preventDefault();

        const img = event.target.img.files[0];
        const imageData = await imageUpload(img);
        const image = imageData?.data?.display_url;

        cart.image = image;

        await handleUpdateProfile(cart.name, image)
            .then(() => {
            toast.success('User Updated successfully');
        })

        await fetch(`http://localhost:5000/users/${user?.email}`, {
            method: "PUT",
            //  mode: 'no-cors',
            headers: {
                'content-type': 'application/json'
                //  'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(cart)
            })
            .then((res) => res.json())
            .then((data) => {           
                console.log(data);
                if(data.modifiedCount || data.upsertedCount){
                    swal(
                        'Updated!',
                        'Profile Picture Updated.',
                        'success'
                    )
                    navigate('/dashboard/my profile');
                }
                else{
                    toast.error('Something is Wrong! Please Try Again Later');
                }
            });
        }

    return (
        <div>
            <Helmet>
                <title>Fast | My Profile</title>
            </Helmet>
            <motion.div animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                  }}>
                    <h1 className="text-3xl font-bold my-2 text-center">My Profile</h1>
            </motion.div>
            <div className="w-full my-10">
                <div className="flex flex-col items-center pb-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={cart.image} alt={cart.name}/>
                    <h5 className="mb-1 text-xl font-medium">{cart.name}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{cart.email}</span>
                    <div className="mt-4 md:mt-6">
                        <form onSubmit={UpdateImage}>
                            <input type="file" name="img" id="img" accept='image/*' className="file-input file-input-bordered w-full" required></input>
                            <div className="form-control mt-6 p-0">
                                <button type='submit' className="btn bg-green-600 text-white">Update Profile Picture</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;