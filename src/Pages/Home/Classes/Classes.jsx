import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { useNavigate, useNavigation } from 'react-router-dom';
import Swal from 'sweetalert2';

const Classes = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useNavigation()
    const from = location.state?.from?.pathname || "/";

    const [allClass, setAllClass] = useState([])
    useEffect(() => {
        axios.get('https://summer-camp-server-12.vercel.app/class/').then((data) => {
            setAllClass(data.data);
        })
    }, [])

    const selectClass = (singleClass) => {
      

        const myClass = { class_name: singleClass?.class_name, class_image: singleClass?.class_image, instructor_name: singleClass?.instructor_name, instructor_email: singleClass?.instructor_email , available_seat: singleClass?.available_seat, price: singleClass?.price , status: singleClass?.status , approve: singleClass?.approve, deny: singleClass?.deny, feedback: singleClass?.feedback, }
        
        // console.log(myClass);

        if (user) {
            fetch('https://summer-camp-server-12.vercel.app/selected-class', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(myClass)
        })
        .then(res=> res.json())
        .then((data)=>{
            
            // console.log(data);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        })

        } else {
            navigate('/login')
        }
    }

    return (
        <div className='my-32'>
            <h1 className='text-center font-bold text-4xl capitalize my-10'>welcome to classes page</h1>

            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10'>
                {
                    allClass.map(singleClass => {
                        return <div className="card w-96 bg-base-100 shadow-xl image-full">
                            <figure><img src={singleClass?.class_image} alt="Shoes" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Class Name: {singleClass?.class_name}</h2>
                                <p className='font-bold'>Instructor: {singleClass?.instructor_name}</p>

                                <p className='font-bold'>Available Seat: {singleClass?.available_seat}</p>
                                <p className='font-bold'>Price: {singleClass?.price}$</p>
                                <div className="card-actions justify-end">
                                    <button className=" bg-pink-500 px-5 py-3 font-bold  rounded-lg" onClick={() => selectClass(singleClass)}> Select Class</button>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    );
};

export default Classes;