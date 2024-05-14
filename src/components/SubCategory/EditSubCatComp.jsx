'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosArrowDown } from 'react-icons/io';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditSubCatComp = () => {
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
    const [subCat, setSubsubCat] = useState({});
     const [categories, setCategories] = useState([]);

    const getSinglesubCat = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/subCategory/${id}`);
            console.log(res)
            if (res.status === 200) {
                setSubsubCat(res.data.data);
                console.log(res.data.data)
            }

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/category`);
                console.log(res)
                if (res.status === 200) {
                    setCategories(res?.data?.data);
                }

            } catch (e) {
                console.log(e)
            }
        }
        getCategories()
        getSinglesubCat()
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
    const onEditsubCat = async (data) => {
        console.log(data)
        console.log("in")
        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER}/subCategory/${id}`,
                { 
                    category: subCat.category,
                    name: data.name ? data.name : subCat.name,
                    image: img ? img : subCat.image,
                    description: data.description ? data.description : subCat.description
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

      const findCategoryNameById = (id) => {
        const category = categories.find(category => category._id === id);
        return category ? category.name : 'Category not found';
    };

    useEffect(() => {
        if (selectedFile !== null) {
            saveImage();
        }
    }, [selectedFile]);
    return (
        <div>
            <h2 className="text-3xl font-semibold mb-2">Edit subCat</h2>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Edit subCat
                    </h3>
                </div>
                <form action="#" onSubmit={handleSubmit(onEditsubCat)}>
                    <div className="p-6.5">
                         <div className="relative z-20 bg-white dark:bg-form-input  mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Category
                            </label>
                            <select
                                value={subCat.category}
                                readOnly
                                {...register("category")}
                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent ps-6 pr-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input text-black dark:text-white`}
                            >
                                <option value="" className="text-body dark:text-bodydark">
                                    {findCategoryNameById(subCat?.category)}
                                </option>
                            </select>

                            <span className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
                                <IoIosArrowDown />
                            </span>
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                subCat Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter subCat name"
                                defaultValue={subCat.name}
                                {...register("name")}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div className='mb-4.5'>
                            <Image src={subCat.image} alt={subCat.name} width={100} height={100} className="w-32 h-18 rounded-md mb-2" />
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                subCat Image
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
                                defaultValue={subCat.description}
                                {...register("description")}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            ></textarea>
                        </div>

                       <button
    type="submit"
    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
>
    Edit subCat
</button>

                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditSubCatComp;