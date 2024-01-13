import React from 'react';
import useRole from './useRole';
import Loading from './Loading';
import { Navigate } from 'react-router-dom';

const DeliveryMenRoute = ({ children }) => {
    const [role, isLoading] = useRole()

    if (isLoading) 
        return <Loading></Loading>

    if (role === 'Delivery Men') 
        return children

    return <Navigate to='/dashboard' />
};

export default DeliveryMenRoute;