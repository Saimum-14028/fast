import React from 'react';
import MenuItem from './MenuItem';

const UserMenu = () => {
    return (
        <div>
            <MenuItem label='Book A Parcel' address='book a parcel'></MenuItem>
            <MenuItem label='My Parcels' address='my parcels'></MenuItem>
            <MenuItem label='My Profile' address='my profile'></MenuItem>
        </div>
    );
};

export default UserMenu;