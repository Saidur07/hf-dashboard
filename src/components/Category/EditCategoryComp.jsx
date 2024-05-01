'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditCategoryComp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const token = Cookies.get('token');
    const [selectedFile, setSelectedFile] = useState(null);
    const [img, setImg] = useState('');
    const { id } = useParams();
    const [category, setCategory] = useState({});

    const getSingleCategory = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/category/${id}`);
            console.log(res)
            if (res.status === 200) {
                setCategory(res.data.data);
                console.log(res.data.data)
            }

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getSingleCategory()
    }, [id])
    const saveImage = async () => {
        try {
            const formData = new FormData();
            formData.append("image", selectedFile);

            const postToImgBB = await axios.post(`${process.env.IMGBB_API}?key=${process.env.IMGBB_KEY}`, formData);
            console.log(postToImgBB)
            if (postToImgBB.status === 200) {
                setImg(postToImgBB.data.data.url);
                return postToImgBB.data.data.url
            }
        } catch (e) {
            console.log(e)
        }
    }
    const onEditCategory = async (data) => {
        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER}/category/${id}`,
                { 
                    name: data.name ? data.name : category.name,
                    image: img ? img : category.image,
                    description: data.description ? data.description : category.description
                 }, {
                headers: {
                    authorization: `${token}`,
                },
            });
            console.log(res);
            if (res.status === 200) {
                console.log(res.data.data);
                toast.success(res.data.message);
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (selectedFile !== null) {
            saveImage();
        }
    }, [selectedFile]);
    return (
        <div>
            <h2 className="text-3xl font-semibold mb-2">Edit Category</h2>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Edit Category
                    </h3>
                </div>
                <form action="#" onSubmit={handleSubmit(onEditCategory)}>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Category Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter category name"
                                defaultValue={category.name}
                                {...register("name")}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div className='mb-4.5'>
                            <Image src={category.image} alt={category.name} width={100} height={100} className="w-12 h-12 rounded-full mb-2" />
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Category Image
                            </label>
                            <input
                                type="file"
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Description
                            </label>
                            <textarea
                                rows={6}
                                placeholder="Description"
                                defaultValue={category.description}
                                {...register("description")}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                        </div>

                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Edit Category
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditCategoryComp;