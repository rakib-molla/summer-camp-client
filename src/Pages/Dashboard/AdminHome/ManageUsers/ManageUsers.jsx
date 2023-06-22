import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaChalkboardTeacher, FaTrashAlt, FaUserShield } from "react-icons/fa";
import axios from 'axios';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        fetch('https://summer-camp-server-12.vercel.app/users')
        .then(res=>res.json())
        .then((data)=>{
            setUsers(data);
        })
    },[users])

    const handleMakeAdmin = user =>{
        console.log(user._id);
        fetch(`https://summer-camp-server-12.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount){
                
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    const handleMakeInstructor =(user)=>{
        fetch(`https://summer-camp-server-12.vercel.app/users/instructor/${user._id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.modifiedCount){
                
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })

    }

    const handleDelete=(id)=>{
        // console.log(id);

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
                axios.delete(`https://summer-camp-server-12.vercel.app/users/${id}`).then((data)=>{
            console.log(data.data);
            if(data.data.deletedCount > 0){
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
        <div className='w-full px-5'>
            <h1 className='text-center font-bold text-3xl my-5'>Manage Users</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Make Admin</th>
                            <th>Make Instructor</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{ user.role === 'admin' ? <span className='bg-red-500 p-2 text-white rounded '>admin</span> :
                                    <button onClick={() => handleMakeAdmin(user)} className="btn btn-ghost bg-green-600  text-white"><FaUserShield></FaUserShield></button> 
                                    }
                                </td>
                                <td>{ user.role === 'instructor' ? <span className='bg-red-500 p-2 text-white rounded disabled'>instructor</span> :
                                    <button onClick={() => handleMakeInstructor(user)} className="btn-sm btn-ghost bg-green-600 rounded text-white">Make Instructor</button> 
                                    }
                                </td>

                                <td><button className="btn btn-warning" onClick={()=>handleDelete(user?._id)}>Delete User</button></td>
                                
                            </tr>)
                        } 
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;