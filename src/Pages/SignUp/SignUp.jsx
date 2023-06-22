import React, { useContext, useState } from 'react';
import img from '../../assets/login.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Providers/AuthProvider';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);

    const navigate = useNavigate();

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        // console.log(data)
        createUser(data.email, data.password)
        .then(result =>{
            const loggedUser = result.user;
            console.log('signup page: ',loggedUser);
            updateUserProfile(data.name, data.photoURL)
            .then(()=>{

                const saveUser = { name: data.name, email: data.email, image: data.photoURL, role: data.role }
                        fetch('https://summer-camp-server-12.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                                Authorization: `Bearer ${localStorage.getItem('access-token')}`
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
                                    navigate('/');
                                }
                            })
                console.log('user profile info update');
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'user created successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  navigate('/');
            }).catch(error => {
                
                console.log(error)})
        })
        
    };



    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
        <Helmet>
            <title>SignUp</title>
        </Helmet>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 max-w-screen-lg h-screen mx-auto mt-20 p-20">
            <div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text"  {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text"  {...register("email", { required: true })} name="email" placeholder="Email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Email is required</span>}
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"} {...register("password", { required: true, minLength: 8,
                                    pattern: /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[A-Z])(?=.*[@#$%^&+!=])(?=.{8,}).*$/
                                    })}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                    placeholder="password" className="input input-bordered" />
                                    {errors.password?.type === 'required' && <p className="text-red-600"> Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 8 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase ,  and one special character.</p>}
                                <label className="label">
                                    <span
                                        onClick={handleTogglePassword}
                                    >{showPassword ? <FaEye /> : <FaEyeSlash />} </span>

                                </label>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            <div className="form-control hidden">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text"  {...register("role", { required: true })} defaultValue="user" placeholder="role" className="input input-bordered" />
                                
                            </div>


                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Signup</button>
                            </div>
                            
                            <span>Already Have An Account ? <Link to="/login">Login</Link></span>
                        </div>
                    </form>
                    <SocialLogin></SocialLogin>
                </div>
            </div>

            <div className='p-5'>
                <img className="w-full" src={img} alt="" />
            </div>
        </div>

    </>
    );
};

export default SignUp;