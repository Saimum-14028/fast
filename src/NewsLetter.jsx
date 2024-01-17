import React from 'react';
import toast from 'react-hot-toast';

const NewsLetter = () => {

    const handleSubmit = (event) => {
        event.preventDefault();

        // get field values 
        const email = event.target.email.value;

        toast.success('Subscribed successfully');
    }

    return (
        <div className="py-5">
            <div className="">
                <div className="px-4 mx-auto max-w-screen-xl lg:px-6">
                    <div className="mx-auto max-w-screen-md text-center">
                        <h2 className="mb-4 text-3xl tracking-tight font-bold  md:text-4xl lg:text-5xl">Sign up for our Newsletter</h2>
                        <p className="mx-auto mb-8 max-w-2xl font-light  md:mb-12 sm:text-xl ">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
                        <form onSubmit={handleSubmit}>
                            <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                                <div className="relative w-full">
                                    <label htmlFor="email" className="hidden mb-2 text-sm font-medium  ">Email address</label>
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5  " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                    </div>
                                    <input className="block p-3 pl-10 w-full text-sm   rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 " placeholder="Enter your email" type="email" id="email" required></input>
                                </div>
                                <div>
                                    <button type="submit" className="btn bg-green-500 text-white py-3 px-5 w-full ">Subscribe</button>
                                </div>
                            </div>
                            <div className="mx-auto max-w-screen-sm text-sm text-left  newsletter-form-footer ">We care about the protection of your data. <a className="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;