'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUserComp = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const token = Cookies.get('token');
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState({});

    const getSingleProfile = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/profile/${id}`);
            if (res.status == 200) {
                setProfile(res.data.data)
            }
        } catch (e) {
            console.log(e)
        }
    }
    console.log("Profile", profile)
    const getSingleUser = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/user/${id}`);
            if (res.status === 200) {
                setUser(res.data.data);
                console.log(res.data.data)
            }

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getSingleProfile()
        getSingleUser()
    }, [id]);

    const onEditUser = async (data) => {
        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER}/user/${id}`,
                {
                    email: data.email ? data.email : user.email,
                    password: data.password ? data.password : user.password,
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

    const onEditProfile = async (data) => {
        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER}/profile/${id}`,
                {
                    balance: data.balance ? data.balance : profile.balance,
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
    return (
        <div>
            <h2 className="lg:md:text-3xl text-xl font-semibold mb-2">Edit User</h2>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white lg:md:text-2xl text-lg">
                        Edit Balance
                    </h3>
                </div>
                <form action="#" onSubmit={handleSubmit(onEditProfile)}>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Current Balance
                            </label>
                            <input
                                type="number"
                                placeholder="Enter user balance"
                                defaultValue={profile?.balance}
                                {...register("balance")}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>


                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Edit Balance
                        </button>
                    </div>
                </form>
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-6">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark  ">
                    <h3 className="font-medium text-black dark:text-white lg:md:text-2xl text-lg">
                        Edit User Credentials
                    </h3>
                </div>
                <form action="#" onSubmit={handleSubmit(onEditUser)}>
                    <div className="p-6.5">
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                User Email
                            </label>
                            <input
                                type="text"
                                placeholder="Enter user email"
                                defaultValue={user.email}
                                {...register("email")}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                User Phone Number
                            </label>
                            <input
                                type="text"
                                placeholder="Enter user number"
                                defaultValue={user.phone_number}
                                {...register("phone_number")}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                User Password
                            </label>
                            <input
                                type="text"
                                placeholder="Enter user password"
                                {...register("password")}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>


                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Edit user
                        </button>
                    </div>
                </form>
            </div>


            <ToastContainer />
        </div>
    );
};

export default EditUserComp;