import { useEffect } from 'react';
import axios  from 'axios';
import UseAuth from './UseAuth';
import { useNavigate } from 'react-router-dom';
const axiosSecure = axios.create({
    baseURL : 'https://summer-camp-server-12.vercel.app/',
});
const UseAxiosSecure = () => {
    const {logOut} = UseAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        axiosSecure.interceptors.request.use((config)=>{
            const token = localStorage.getItem('access-token');
            if(token){
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
              if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                await logOut();
                navigate('/login');
              }
              return Promise.reject(error);
            }
          );
    },[logOut, navigate])

    return [axiosSecure];
    
};

export default UseAxiosSecure;