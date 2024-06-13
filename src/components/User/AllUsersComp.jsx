'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoCopy } from "react-icons/go";

const AllUsersComp = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/user`);
                console.log(res)
                if (res.status === 200) {
                    setUsers(res.data.data);
                }

            } catch (e) {
                console.log(e)
            }
        }
        getUsers()
    }, [])
    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(search.toLowerCase()) &&
        (user._id.toString() === userId || userId === "")
    );

    const itemsPerPage = 20;
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);


    const nextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    }

    const prevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    }


    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/user/${id}`);
            console.log(res)
            if (res.status === 200) {
                toast.success("User deleted")
                const filteredUsers = users.filter((user) => user._id !== id);
                setUsers(filteredUsers);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('User ID copied to clipboard!');
    }

    return (
        <div>
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <h2 className="lg:md:text-3xl text-xl font-semibold mb-2">All Users</h2>
                 <div className="grid grid-cols-2 gap-x-4 lg:md:mt-0 mt-2">
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Search by User Id"
                    className="lg:md:px-4 px-2 lg:md:py-3 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-primary"
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email"
                    className="lg:md:px-4 px-2 lg:md:py-3 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-primary"
                />
                </div>
              <div className="max-w-full overflow-x-auto">
    <table className="w-full table-auto">
        <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4">
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Name
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    User Id
                </th>
                <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                    Role
                </th>
                <th className="min-w-[200px] px-4 py-4 font-medium text-black dark:text-white">
                    Email
                </th>
                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                    Overall Rating
                </th>
                <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                   Balance
                </th>
                <th className="min-w-[100px] px-4 py-4 font-medium text-black dark:text-white">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {currentUsers.map((user, index) => (
                <tr key={user._id} className="!text-[14px]">
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <div className="flex items-center gap-x-2">
                            <h5 className="font-medium text-black dark:text-white">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                            </h5>
                            <Link className="text-black dark:text-white" rel="noopener noreferrer" target="_blank" href={`https://koc-chat.vercel.app/profile/${user?._id}`}>
                                {user.first_name} {user.lastName}
                            </Link>
                        </div>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                        <p className="text-black dark:text-white capitalize">
                            {user._id.slice(0, 5)}**
                        </p>
                        <button onClick={() => copyToClipboard(user._id)} className="text-black dark:text-white">
                            <GoCopy />
                        </button>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white capitalize">
                            {user.role}
                        </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white w-full max-w-[180px] overflow-x-scroll">
                            <span className="inline-block max-w-[220px]">
                                {user.email}
                            </span>
                        </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <div className="flex items-center gap-x-2">
                            <p className="text-black dark:text-white capitalize flex items-center gap-x-2">
                                {user?.profile?.overall_rating.toFixed(2)} <FaStar />
                            </p>
                        </div>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white capitalize">
                            ₺{user?.profile?.balance.toFixed(2)}
                        </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <div className="flex items-center space-x-3.5">
                            <Link href={`/users/${user._id}`} className="hover:text-warning text-xl">
                                <FaRegPenToSquare />
                            </Link>
                            <button onClick={() => deleteUser(user._id)} className="hover:text-danger text-xl">
                                <MdDelete />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

            </div>
            <div className="flex gap-x-4 items-center justify-center mt-4">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded bg-[#ddd] dark:bg-gray-700 text-[#333] dark:text-gray-300 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    Previous
                </button>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded bg-[#ddd] dark:bg-gray-700 text-[#333] dark:text-gray-300 ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    Next
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AllUsersComp;