import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../Providers/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
const MyClasses = () => {
    const {user} = useContext(AuthContext);
    const [myClass, setMyClass] = useState([]);
    useEffect(()=>{
        fetch('https://summer-camp-server-12.vercel.app/class').then(res=>res.json()).then((data)=>{setMyClass(data)})
    },[])

    console.log(myClass);

    const handleChangeStatus =(singleClass)=>{
        // console.log(singleClass);

        fetch(`https://summer-camp-server-12.vercel.app/users/instructor/${singleClass._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount){
                
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title:  'change status ',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    return ( 
        <div className='w-full px-5'>
            <h1 className='text-center font-bold text-3xl my-5'>Manage Users</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Class Name</th>
                            <th>Instructor</th>
                            <th>Email</th>
                            <th>Available Seat</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            myClass.map((singleClass, index)=>{ 
                                if(singleClass.instructor_email === user.email){
                                    
                                return <>
                                    <th>{singleClass.class_name}</th>
                                    <th>{singleClass.instructor_name}</th>
                                    <th>{singleClass.instructor_email}</th>
                                    <th>{singleClass.available_seat}</th>
                                    <th>{singleClass.price}</th>
                                    
                                    <td>{ singleClass.status === 'available' ? 'available' :
                                    <button onClick={() => handleChangeStatus(singleClass)} className="btn btn-ghost bg-orange-600  text-white"> Make Available </button> 
                                    }
                                </td>
                                <td>
                                    <button className='btn btn-warning'><Link to="">Update</Link></button>
                                </td>
                                </>
                                
                                }else{
                                    
                                }
                            })
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClasses;