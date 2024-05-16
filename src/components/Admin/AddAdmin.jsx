'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IMGBB_KEY from './../../../constant';
import { IoIosArrowDown } from 'react-icons/io';

const AddAdminComp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const token = Cookies.get('token');
    const onAddAdmin = async (data) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/user/makeAdmin`,data, {
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

    return (
        <div>
            <h2 className="text-3xl font-semibold mb-2">Add Admin</h2>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Add Admin
                    </h3>
                </div>
                <form action="#" onSubmit={handleSubmit(onAddAdmin)}>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Admin Email
                            </label>
                            <input
                                type="text"
                                placeholder="Enter admin email"
                                {...register("email", { required: true })}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Add Admin
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddAdminComp;