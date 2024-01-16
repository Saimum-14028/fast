import React from 'react';
import MenuItem from './MenuItem';

const AdminMenu = () => {
    return (
        <div>
            <MenuItem label='All Admins' address='all admins'></MenuItem>
            <MenuItem label='All Parcels' address='all parcels'></MenuItem>
            <MenuItem label='All Users' address='all users'></MenuItem>
            <MenuItem label='All Delivery Men' address='all delivery men'></MenuItem>
            <MenuItem label='Statistics' address='/dashboard'></MenuItem>
        </div>
    );
};

export default AdminMenu;