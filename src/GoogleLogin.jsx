import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import swal from 'sweetalert';
import toast from 'react-hot-toast';

const GoogleLogin = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const {googleLogin} = useContext(AuthContext);

    const handleGoogleLogin = (media) => {
        
        media()
            .then(res => {
              //  console.log(res);
                swal("Done!", "Logged in Successfully!", "success");
                navigate(location?.state ? location.state : '/');

                const email = res.user?.email;
                const name = res.user?.displayName;
                const number = "";
                const image = res.user?.photoURL;
                const createdAt = res.user?.metadata?.creationTime;
                const role = "User";
                const numberOfParcelDelivered = 0;
                const totalReview = 0;
                const numberofParcelBooked = 0;
                const totalSpent = 0;
                const numberOfRating = 0;
                const averageRating = 0;

                const user = {email,name,number,image,role,createdAt,numberOfParcelDelivered,totalReview,numberofParcelBooked,totalSpent,numberOfRating,averageRating};
                // send data to the server
                fetch('https://brainy-boa-shoulder-pads.cyclic.app/users', {
                    method: 'POST',
                    //mode: 'no-cors',
                    headers: {
                        'content-type': 'application/json'
                        //'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify(user)
                })
                .then(res => res.json())
                .then(data => {
                   // console.log(data);
                    if(data.insertedId){
                        toast.success('User added successfully');
                    }
                    else{
                        toast.success('User Already Exists!');
                    }
                })
            })
            .catch(error => {
            //    console.log(error);
                swal("Error!", error.message, "error");
               // toast.error(error.message)
            })
    }

    return (
        <div>
            <div className="divider text-white">Or Continue With</div>
            <div className="form-control mt-6 p-0">
                <button
                    onClick={() => handleGoogleLogin(googleLogin)}
                    className="btn bg-green-500 text-white">Google
                </button>
            </div>
        </div>
    );
};

export default GoogleLogin;