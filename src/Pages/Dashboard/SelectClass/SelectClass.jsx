import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, } from 'react-router-dom';
import Swal from 'sweetalert2';

const SelectClass = () => {

    const [mySelectedClass, setMySelectedClass] = useState([]);

    useEffect(() => {
        fetch('https://summer-camp-server-12.vercel.app/selected-class/')
            .then((res) => res.json())
            .then((data) => {
                setMySelectedClass(data);
            })
    }, [mySelectedClass])

    const handleDelete = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://summer-camp-server-12.vercel.app/selected/${id}`).then((data) => {

                    if (data.data.deletedCount > 0) {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )

                    }
                })

            }
        })

    }

    return (
        <div className='w-full p-2'>
            
                <h1 className='my-10 text-center font-bold text-4xl capitalize'>welcome to my selected class </h1>
                
            
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Name</th>
                            <th>Price </th>
                            <th>Payment</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            mySelectedClass.map((singleClass, index) => {
                                return <tr>
                                    <th>{index + 1}</th>
                                    <th>{singleClass?.class_name}</th>
                                    <th>{singleClass?.price}</th>
                                    <th><Link to={`/dashboard/payment/${singleClass?.price}`} className='btn bg-green-500 p-3 rounded'>pay</Link></th>
                                    <th><button className='btn bg-red-500 p-3 rounded' onClick={() => handleDelete(singleClass?._id)}>Delete</button></th>
                                </tr>
                            })
                        }


                        {/* <tr>
                            <th>{mySelectedClass?.class_name}</th>
                            <th>{mySelectedClass?.price}</th>
                            <th><Link to={`/dashboard/payment/${mySelectedClass?._id}`} className='btn bg-green-500 p-3 rounded'>pay</Link></th>
                            <td><Link className=' bg-red-500 p-3 rounded' > Delete Class</Link></td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SelectClass;