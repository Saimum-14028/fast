import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from './Loading';

const PrivateRoute = ({children}) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    //console.log(location);

    if (loading) 
        return <Loading></Loading>

    if (!user?.email) {
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }

    return children;
};

export default PrivateRoute;