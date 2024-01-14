import React, { useContext } from 'react';
import GoogleLogin from './GoogleLogin';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { imageUpload } from './functions';

const image_key = import.meta.env.VITE_image_hosting_key;
const image_api = `https://api.imgbb.com/1/upload?key=${image_key}`;

const Register = () => {

    const {createUser,handleUpdateProfile} = useContext(AuthContext);

    const location = useLocation();

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();

        // get field values 
        const name = event.target.name.value;
        const email = event.target.email.value;
        const number = event.target.number.value;
        const img = event.target.img.files[0];
        const password = event.target.password.value;
        const role = event.target.role.value;

      //  console.log(name,email,img,password,number,role);

        const imageData = await imageUpload(img);

        // validation 
        if(number<0){
            toast.error('Please input valid phone number');
            return; 
        }

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
          //  console.log("Password must be at least 6 characters")
            return;
        }

        if(/[A-Z]/.test(password)===false){
            toast.error('Password must have 1 capital letter');
            return;
        }

        if(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)===false){
            toast.error('Password must have 1 special character');
            return;
        }

        // creating a new user
        await createUser(email, password)
        .then(res => {
            handleUpdateProfile(name, imageData?.data?.display_url)
                .then(() => {
                    toast.success('User created successfully');
                    navigate(location?.state ? location.state : '/');
                })
                // console.log(res.user);
                // console.log(res.user.email);
                // console.log(res.user.displayName);
                const createdAt = res.user?.metadata?.creationTime;
                const image = imageData?.data?.display_url;
          //      console.log(img,image);
                const numberOfParcelDelivered = 0;
                const totalReview = 0;
                const numberofParcelBooked = 0;
                const totalSpent = 0;
                const numberOfRating = 0;

                const user = {email,name,number,image,role,createdAt,numberOfParcelDelivered,totalReview,numberofParcelBooked,totalSpent,numberOfRating};
                // send data to the server
                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    //mode: 'no-cors',
                    headers: {
                        'content-type': 'application/json'
                        //'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify(user)
                })
                .then(res => res.json())
                .then(data => {
                    //console.log(data);
                    if(data.insertedId){
                        toast.success('User added successfully');
                    }
                })
        })
        .catch(error => {
            toast.error(error.message)
        })
    }

    return (
        <div className='py-10'>
            <Helmet>
                <title>Fast | Register</title>
            </Helmet>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Create an Account
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="John Doe" required></input>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="name@company.com" required></input>
                            </div>
                            <div>
                                <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Number</label>
                                <input type="number" name="number" id="number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="01700112233" required></input>
                            </div>
                            <div>
                                <label htmlFor="img" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Your Image</label>
                                <input type="file" name="img" id="img" accept='image/*' className="file-input file-input-bordered w-full" required></input>
                                {/* <input type="text" name="img" id="img" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="xyz.com/1.jpg" required></input> */}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" required></input>
                            </div>
                            
                            <div>
                                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Your Role</label>
                                <select id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required>
                                    <option value="User">User</option>
                                    <option value="Delivery Men">Delivery Men</option>
                                </select>
                            </div>

                            <div className="form-control mt-6 p-0">
                                    <button type='submit' className="btn bg-green-600">Register</button>
                            </div>
                            <p className="text-sm font-light text-green-500 dark:text-green-400">
                                Have An Account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                            </p>
                        </form>
                        <GoogleLogin></GoogleLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;