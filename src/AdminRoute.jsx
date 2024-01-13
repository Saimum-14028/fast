import React from 'react';
import Loading from './Loading';
import useRole from './useRole';
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
    const [role, isLoading] = useRole()

    if (isLoading) 
        return <Loading></Loading>

    if (role === 'Admin') 
        return children

    return <Navigate to='/dashboard' />
};

export default AdminRoute;