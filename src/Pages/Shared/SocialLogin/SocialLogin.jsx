import React, { useContext } from 'react';
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../../../Providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const SocialLogin = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { googleSignIn } = useContext(AuthContext);

    const handleGoogleSignIn =()=>{
        googleSignIn()
        .then((result)=>{
            const loggedUser = result.user;
            const saveUser = { name: loggedUser.displayName, email: loggedUser.email, image: loggedUser.photoURL, role: 'user' }
                        fetch('https://summer-camp-server-12.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    
                                }
                            })
            

            navigate(from, { replace: true });
        }).then((error) =>{
            // console.log(error.message);
        })
    }

    
    return (
        <div>
            <div className="w-full text-center my-4">
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
                    <FaGoogle></FaGoogle>
                </button>
                
            </div>
        </div>
    );
};

export default SocialLogin;