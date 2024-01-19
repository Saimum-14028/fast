import React, { createContext, useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { auth } from './FirebaseConfig';

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    let result;

    const [userCount, setUserCount] = useState();
    const [bookedCount, setBookedCount] = useState();
    const [deliveredCount, setDeliveredCount] = useState();
    const [target, setTarget] = useState();

    useEffect( () =>{
        fetch(`https://brainy-boa-shoulder-pads.cyclic.app/bookingdate`)
        .then(res => res.json())
        .then(data => {
       //     console.log(data.length);
            setTarget(data)
          //  setLoading(false);
        })
    }, [])

    useEffect( () =>{
        fetch(`https://brainy-boa-shoulder-pads.cyclic.app/userCount`)
        .then(res => res.json())
        .then(data => {
       //     console.log(data.length);
            setUserCount(data.length)
          //  setLoading(false);
        })
    }, [])

    useEffect( () =>{
        fetch(`https://brainy-boa-shoulder-pads.cyclic.app/parcelCount`)
        .then(res => res.json())
        .then(data => {
       //     console.log(data.length);
            setBookedCount(data.length)
          //  setLoading(false);
        })
    }, [])

    const status = "Delivered"

    useEffect( () =>{
        fetch(`https://brainy-boa-shoulder-pads.cyclic.app/parcelCount?status=${status}`)
        .then(res => res.json())
        .then(data => {
       //     console.log(data.length);
            setDeliveredCount(data.length)
          //  setLoading(false);
        })
    }, [])

    // create user 
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //google login
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // signin user
    const signin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // using observer
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
    }, [])

 //   console.log(user);

    const handleUpdateProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
    })
}

     // to sign out user
     const logOut = () => {
        return signOut(auth)
    }

    const authInfo = {
        createUser,
        googleLogin,
        signin,
        logOut,
        user,
        loading,
        handleUpdateProfile,
        userCount,
        bookedCount,
        deliveredCount,
        target
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;