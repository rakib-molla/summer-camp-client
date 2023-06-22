import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../../assets/img.jpg'
import { Slide } from 'react-awesome-reveal';
import './LearnSection.css';

const LearnSection = () => {
    return (
        <div className='my-10 bg-pink-100 p-20'>
            <div className='grid lg:grid-cols-2 mx-auto gap-5'>
                <div className='flex justify-center items-center'>
                    <div className=''>
                    <Slide><h1 className='font-bold text-5xl uppercase'>Let's learn together</h1></Slide> <br />
                    <Link className='bg-blue-500 rounded-md py-3 px-4 font-bold text-white ms-20'>Join Now</Link>
                    </div>
                </div>
                <div>
                    <img className='rounded-lg' src={img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default LearnSection;