import React, { useContext } from 'react';
import GoogleLogin from './GoogleLogin';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {signin} = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        // get field values 
        const email = event.target.email.value;
        const password = event.target.password.value;

        // validation 
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        // creating a new user
        signin(email, password)
            .then(res => {
                toast.success('User logged in successfully');
           //     console.log(location);
                navigate(location?.state ? location.state : '/');
            })
            .catch(error => {
                toast.error(error.message)
            })
    }

    return (
        <div className='py-10'>
            <Helmet>
                <title>Fast | Login</title>
            </Helmet>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            Login To Your Account
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required></input>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required></input>
                            </div>
                            <div className="flex items-center justify-between">
                                <a className="text-sm font-medium text-primary-600 hover:underline text-gray-500 dark:text-gray-300">Forgot Password?</a>
                            </div>
                            <div className="form-control mt-6 p-0">
                                            <button type='submit' className="btn bg-green-600">Login</button>
                            </div>
                            <p className="text-sm font-light text-red-500 dark:text-red-400">
                                Don’t Have An Account Yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</Link>
                            </p>
                        </form>
                        <GoogleLogin></GoogleLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;