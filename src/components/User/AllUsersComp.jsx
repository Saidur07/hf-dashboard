'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

const AllUsersComp = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
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

    const itemsPerPage = 20;
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = users.slice(startIndex, endIndex);

    const nextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    }

    const prevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    }

    return (
        <div>
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <h2 className="text-3xl">All Users</h2>
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4 grid grid-cols-7">
                                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                    #
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Name
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Role
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Email
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Country
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Overall Rating
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Hourly Rate
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => (
                                <tr key={user._id} className="grid grid-cols-7">
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <p className="text-black dark:text-white">
                                            {user.first_name} {user.lastName}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <p className="text-black dark:text-white capitalize">
                                            {user.role}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <p className="text-black dark:text-white capitalize">
                                            {user.email}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <p className="text-black dark:text-white capitalize">
                                            {user?.profile?.country}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <p className="text-black dark:text-white capitalize flex items-center gap-x-2">
                                            {user?.profile?.overall_rating} <FaStar />
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <p className="text-black dark:text-white capitalize">
                                            ${user?.profile?.hourly_rate}
                                        </p>
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
        </div>
    );
};

export default AllUsersComp;