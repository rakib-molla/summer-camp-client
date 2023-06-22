import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { AuthContext } from '../../../../Providers/AuthProvider';

const image_hosting_token = import.meta.env.VITE_image_upload_token;

const AddClass = () => {
    const {user} = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

    const onSubmit = (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append('image', data.class_image[0])

        fetch(image_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res=> res.json())
        .then((imgResponse)=>{
            // console.log(imgResponse);
            const imgURL = imgResponse.data.display_url;
            const {class_name, class_image, instructor_name, instructor_email, available_seat, price, status } = data;

            const addClassDetails = {class_name, class_image: imgURL, instructor_name, instructor_email, available_seat, price: parseFloat(price), status,approve:'no', deny:'no', feedback: ' ' }
            console.log(addClassDetails);

            fetch('https://summer-camp-server-12.vercel.app/addclass', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(addClassDetails)
        })
        .then(res=> res.json())
        .then((data)=>{
            console.log(data);
            reset();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Class added successfully',
                showConfirmButton: false,
                timer: 1500
              })
        })
        
        })
    }

    return (
        <div className='w-full mt-4 px-5'>
            <h1 className='text-center font-bold italic text-3xl '>Add Class By Instructor</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex gap-5 w-full'>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Class Name</span>
                        </label>
                        <input type="text"  {...register("class_name", { required: true, maxLength: 30 })} placeholder="Class Name" className="input input-bordered w-full max-w-xs" />
                        {errors.class_name && <span className="text-red-600">Class Name is required</span>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Class Image</span>
                        </label>
                        <input type="file" {...register("class_image", { required: true, maxLength: 30 })} className="file-input file-input-bordered w-full max-w-xs" />

                        {errors.class_image && <span className="text-red-600">Class Image is required</span>}
                    </div>
                </div>
                <div className='flex gap-5 w-full'>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Instructor name</span>
                        </label>
                        <input type="text" defaultValue={user?.displayName}  {...register("instructor_name", { required: true, maxLength: 30 })} placeholder="Class Name" className="input input-bordered w-full max-w-xs" />
                        
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Instructor Email</span>
                        </label>
                        <input type="text" defaultValue={user?.email} {...register("instructor_email", { required: true, maxLength: 30 })} className="input input-bordered w-full max-w-xs" />
                    </div>
                </div>
                <div className='flex gap-5 w-full'>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Available Seat</span>
                        </label>
                        <input type="number"   {...register("available_seat", { required: true, maxLength: 30 })} placeholder="Class Name" className="input input-bordered w-full max-w-xs" />
                        {errors.available_seat && <span className="text-red-600"> How many seat is available</span>}
                    </div>
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input type="number"  {...register("price", { required: true, maxLength: 30 })} className="input input-bordered w-full max-w-xs" />
                        {errors.price && <span className="text-red-600"> Price is require </span>}
                    </div>
                    
                </div>
                <div className="form-control w-full hidden">
                        <label className="label">
                            <span className="label-text">Status</span>
                        </label>
                        <input type="text" defaultValue="pending"  {...register("status", { required: true, })} className="input input-bordered w-full max-w-xs" />
                        
                    </div>
                <div className="form-control mt-6 ">
                    <input className="btn btn-primary" type="submit" value="Add Class" />
                </div>
            </form>
        </div>
    );
};

export default AddClass;