import React from 'react';
import MenuItem from './MenuItem';

const DeliveryMenMenu = () => {
    return (
        <div>
            <MenuItem label='My Delivery List' address='my delivery list'></MenuItem>
            <MenuItem label='My Reviews' address='my reviews'></MenuItem>
        </div>
    );
};

export default DeliveryMenMenu;