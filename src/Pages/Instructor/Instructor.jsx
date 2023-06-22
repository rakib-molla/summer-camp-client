import React, { useEffect, useState } from 'react';

const Instructor = () => {
    const [instructors, setInstructors] = useState([])
    useEffect(() => {
        fetch('https://summer-camp-server-12.vercel.app/instructor')
            .then(res => res.json())
            .then((data) => {
                setInstructors(data)
            })
    }, [])
    

    return (
        <div className='my-44'>
            <h1 className='text-center font-bold mb-10 text-4xl capitalize'>Welcome to Instructor Page</h1>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-10'>
                {
                    instructors.map(instructor =>
                        <div className='card w-80 bg-pink-100 shadow-xl  hover:bg-pink-200' >
                            <figure className="px-10 pt-10" >
                                <div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={instructor?.image} alt='image' />
                                    </div>
                                </div>
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">Name: {instructor?.name} </h2>
                                <p>Email: {instructor?.email}</p>
                                <div className="card-actions">
                                    <button className="text-center bg-blue-400 text-white py-3 px-5 rounded-lg">Instructor Details</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Instructor;