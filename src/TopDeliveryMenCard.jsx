import React from 'react';
import { Link } from 'react-router-dom';

const TopDeliveryMenCard = ({card}) => {
    return (
        <div className="mb-6 py-2 md:mb-0 bg-base-200">
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={card.image} alt={card.name}/>
                </div>
            </div>
            <p className='text-xl font-semibold'>Name: {card.name}</p>
            <p className='text-xl font-semibold'>Parcel Delivered: {card.numberOfParcelDelivered}</p>
            <p className='text-xl font-semibold'>Average Rating: {card.averageRating?.toFixed(2)}</p>
        </div>
    );
};

export default TopDeliveryMenCard;