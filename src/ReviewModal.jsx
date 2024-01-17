import React, { useState } from 'react';

const ReviewModal = ({ isOpen, onClose, handleSubmit, user, deliveryMan }) => {
  return (
    <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', zIndex: 999 }}>
        <div className="modal-box">
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
                <button onClick={onClose} type='submit' className="btn btn-sm bg-green-500 text-white">Submit</button>
            </form>

            <div className="modal-action">
                <form method="dialog">
                    {/* if there is a button, it will close the modal */}
                    <button onClick={onClose} className="btn btn-sm bg-red-500 text-white">Close</button>
                </form>
            </div>
        </div>
      {/* <button onClick={onClose}>Close Modal</button> */}
    </div>
  );
};

export default ReviewModal;
