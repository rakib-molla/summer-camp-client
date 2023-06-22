import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import img from '../../assets/login.png'
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
const Login = () => {
    const { signIn} = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        // console.log(data);
        signIn(data.email, data.password)
        .then(result =>{
            

            navigate(from, { replace: true });
            Swal.fire('user login successfully')
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
            <title>Login</title>
        </Helmet>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 max-w-screen-lg h-screen mx-auto mt-20 p-20">
            <div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="card-body">
                            
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
                                    type={showPassword ? "text" : "password"} {...register("password", { required: true, minLength: 8, })}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                    placeholder="password" className="input input-bordered" />
                                    {errors.password?.type === 'required' && <p className="text-red-600"> Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 8 characters</p>}

                                <label className="label">
                                    <span
                                        onClick={handleTogglePassword}
                                    >{showPassword ? <FaEye /> : <FaEyeSlash />} </span>

                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <span>Don't Have An Account ? <Link to="/signup">SignUp</Link></span>
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

export default Login;