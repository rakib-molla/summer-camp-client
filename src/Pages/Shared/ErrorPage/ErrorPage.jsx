import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../../assets/error.json';
import Lottie from "lottie-react";
const ErrorPage = () => {
    return (
        <div className='w-full'>
            <div class="flex justify-center">
                <Link href="#" class="text-center font-bold text-4xl text-green-500">Back To Home</Link>
            </div>
            <div>
                <Lottie className='h-screen' animationData={error} loop={true} />
            </div>
        </div>
    );
};

export default ErrorPage;