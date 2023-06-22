import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSignLanguage } from 'react-icons/fa';
import Swal from 'sweetalert2'
const ManageClasses = () => {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        axios.get('https://summer-camp-server-12.vercel.app/class').then((data) => { setClasses(data.data) })
    }, [classes])

    const handlePending = (id) => {
        axios.patch(`https://summer-camp-server-12.vercel.app/class/manage-status/${id}`)
            .then((data) => {
                console.log(data.data);
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'update successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleApprove = (id) => {
        axios.patch(`https://summer-camp-server-12.vercel.app/class/manage-approve/${id}`)
            .then((data) => {
                console.log(data.data);
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'update successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleDeny = (id) => {
        axios.patch(`https://summer-camp-server-12.vercel.app/class/manage-deny/${id}`)
            .then((data) => {
                console.log(data.data);
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'update successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleFeedback = (event) => {
        event.preventDefault();
        const form = event.target;
        const feedback = form.feedback.value;

        console.log(feedback);
    }

    return (
        <div className='w-full p-5'>
            <h1 className='text-center font-bold text-3xl mt-5'>welcome to manage classes</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Class Image</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Instructor email</th>
                            <th>Available seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Approve</th>
                            <th>Deny</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((singleClass, index) => <tr key={singleClass._id}>

                                <td><img src={singleClass?.class_image} className='rounded-lg' alt="img" /></td>
                                <td>{singleClass?.class_name}</td>
                                <td>{singleClass?.instructor_name}</td>
                                <td>{singleClass?.instructor_email}</td>
                                <td>{singleClass?.available_seat}</td>
                                <td>{singleClass?.price}</td>

                                <td>{singleClass?.status === 'pending' ? <button onClick={() => handlePending(singleClass?._id)} className='btn-sm rounded bg-green-600 '>Pe</button> :
                                    <span className=" rounded bg-red-600 px-3 py-2  text-white disabled">Active</span>
                                }
                                </td>
                                <td>{singleClass?.approve === 'no' ? <button onClick={() => handleApprove(singleClass?._id)} className='btn-sm rounded bg-green-600 '>No</button> :
                                    <span className="rounded bg-red-600 px-3 py-2 text-white disabled">Approve</span>
                                }
                                </td>
                                <td>{singleClass?.deny === 'no' ? <button onClick={() => handleDeny(singleClass?._id)} className='btn-sm rounded bg-green-600 '>No</button> :
                                    <span className="btn-sm rounded bg-red-600 px-3 py-2 text-white disabled">Yes</span>
                                }
                                </td>
                                <td>


                                    {/* The button to open modal */}
                                    <label htmlFor="my_modal_6" className="btn"> Send Feedback </label>

                                    {/* Put this part before </body> tag */}
                                    <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                                    <div className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg text-center"> Feedback </h3>

                                            <form onSubmit={handleFeedback}>
                                                <textarea name="feedback" id="" cols="60" rows="5" className='border' key={singleClass?._id}> </textarea>
                                                <button className='btn '>Submit</button>
                                            </form>

                                            <div className="modal-action">
                                                <label htmlFor="my_modal_6" className="btn">Close!</label>
                                            </div>
                                        </div>
                                    </div>


                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;