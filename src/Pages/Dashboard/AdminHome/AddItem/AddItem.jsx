import React from 'react';
import { useForm } from 'react-hook-form';

const image_hosting_token = import.meta.env.VITE_image_upload_token;
const AddItem = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    console.log(image_hosting_token);
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0])


        fetch(image_hosting_url, {
            method: 'POST',
            body: formData
        })
        .then(res=> res.json())
        .then((imgResponse)=>{
            // console.log(imgResponse);
            const imgURL = imgResponse.data.display_url;
            const {name, email, number_of_classes, name_of_classes } = data;
            const instructorDetails = {name, email, image: imgURL, number_of_classes: parseFloat(number_of_classes), name_of_classes }
            console.log(instructorDetails);

            fetch('https://summer-camp-server-12.vercel.app/instructor', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(instructorDetails)
        })
        .then(res=> res.json())
        .then((data)=>{
            reset();
            console.log(data);
        })
        
        })
        
        
    };
    return (
        <div className="w-full px-10">
            <h1 className='text-center font-bold text-3xl mt-5'>Add Instructor </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text font-semibold"> Name</span>
                    </label>
                    <input type="text" placeholder=" Name"
                        {...register("name", { required: true })}
                        className="input input-bordered w-full " />
                </div>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text font-semibold"> Email</span>
                    </label>
                    <input type="text" placeholder=" Email"
                        {...register("email", { required: true })}
                        className="input input-bordered w-full " />
                </div>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text font-semibold"> Number Of Classes</span>
                    </label>
                    <input type="text" placeholder=" Number Of Classes"
                        {...register("number_of_classes", { required: true })}
                        className="input input-bordered w-full " />
                </div>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text font-semibold"> Name of the Classes</span>
                    </label>
                    <input type="text" placeholder=" Name of the Classes"
                        {...register("name_of_classes", { required: true })}
                        className="input input-bordered w-full " />
                </div>
                
                
                <div className="form-control w-full my-4">
                    <label className="label">
                        <span className="label-text">Instructor Image</span>
                    </label>
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
                </div>
                <input className="btn btn-outline btn-accent mt-4" type="submit" value="Add Instructor" />
            </form>
        </div>
    );
};

export default AddItem;