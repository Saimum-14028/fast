import React, { useState } from 'react';
import DatePicker from "react-datepicker";

const ManageModal = ({ isOpen, onClose, handleAssign, approximate_delivery_date, deliveryMen, setapproximate_delivery_date }) => {
  return (
    <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', zIndex: 999 }}>
      <div className="modal-box">

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
            
            <button type='submit' onClick={onClose} className="btn btn-sm bg-green-500 text-white">Assign</button>
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

export default ManageModal;
