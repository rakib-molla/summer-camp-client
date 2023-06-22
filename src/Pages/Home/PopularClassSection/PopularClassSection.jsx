import React, { useContext, useEffect, useState } from 'react';
import { Slide } from 'react-awesome-reveal';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

const PopularClassSection = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate()

    const [allClass, setAllClass] = useState([]);
    useEffect(() => {
        fetch('https://summer-camp-server-12.vercel.app/class/')
            .then(res => res.json())
            .then((data) => {
                setAllClass(data);
            })
    }, [])

    const selectClass=(singleClass)=>{

        const myClass = { class_name: singleClass?.class_name, class_image: singleClass?.class_image, instructor_name: singleClass?.instructor_name, instructor_email: singleClass?.instructor_email , available_seat: singleClass?.available_seat, price: singleClass?.price , status: singleClass?.status , approve: singleClass?.approve, deny: singleClass?.deny, feedback: singleClass?.feedback, }
        
        console.log(myClass);

        // const previousBookmark = JSON.parse(localStorage.getItem('selected-class'))
        // let bookmark = [];
        // if(previousBookmark){
        //     bookmark.push(...previousBookmark, singleClass);
        // }else{
        //     bookmark.push(singleClass);
        //     localStorage.setItem('selected-class', JSON.stringify(bookmark));
        // }
        if(user){
        
            fetch('https://summer-camp-server-12.vercel.app/selected-class', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(myClass)
        })
        .then(res=> res.json())
        .then((data)=>{
            
            console.log(data);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        })

            // localStorage.setItem("selected-class", JSON.stringify(singleClass));
            // Swal.fire({
            //     position: 'top-end',
            //     icon: 'success',
            //     title: 'Your work has been saved',
            //     showConfirmButton: false,
            //     timer: 1500
            //   })
        }else{
            navigate('/login')
        }
    }

    return (
        <div className='my-5'>
            <Slide> <h1 className='text-center uppercase text-3xl font-bold my-20 text-pink-500'>popular class </h1> </Slide>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 px-5'>
                {
                    allClass.map(singleClass => {
                        return <>
                            <div className="card w-96 bg-base-100 shadow-xl border">
                                <figure><img src={singleClass?.class_image} className='h-80 w-full rounded-lg' alt="image" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {singleClass?.class_name}
                                        <div className="badge badge-secondary">Hot</div>
                                    </h2>
                                    <div className='card-title'>Instructor: <span className='uppercase text-gray-500'>{singleClass?.instructor_name}</span></div>
                                    <div className='card-title'>Price: <span className='text-green-600'>{singleClass?.price}<span className='font-bold '>$</span></span></div>
                                    <div className="card-actions justify-end">
                                        <button className='badge badge-outline py-4 me-5' onClick={()=>{selectClass(singleClass)}}>select class</button>
                                        {/* <div className="badge badge-outline py-4 hover:bg-pink-200"><Link to={`/dashboard/payment/${singleClass?._id}`}>Enroll Now</Link></div> */}
                                    </div>
                                </div>
                            </div>
                        </>
                    })
                }
            </div>
        </div>
    );
};

export default PopularClassSection;