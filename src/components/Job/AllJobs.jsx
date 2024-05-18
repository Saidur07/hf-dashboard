'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

const AllJobsComp = () => {
    const [jobs, setJobs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        const getJobs = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/offer/all`);
                console.log(res)
                if (res.status === 200) {
                    setJobs(res.data.data);
                }

            } catch (e) {
                console.log(e)
            }
        }
        const getCategories = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/category`);
                console.log(res)
                if (res.status === 200) {
                    setCategories(res.data.data);
                }

            } catch (e) {
                console.log(e)
            }
        }
        getCategories()
        getJobs()
    }, [])

    const filteredJobs = jobs.filter(job => {
        return (
            (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "") ||
            (job.status === statusFilter || statusFilter === "")
        );
    });
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentJobs = filteredJobs.slice(startIndex, endIndex);

    const nextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };


  const findCategoryNameById = (id) => {
        const category = categories.find(category => category._id === id);
        return category ? category.name : 'Category not found';
    };

    const deleteJob = async (id) => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/offer/${id}`);
            console.log(res)
            if (res.status === 200) {
                const filteredJobs = jobs.filter((job) => job._id !== id);
                setJobs(filteredJobs);
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
                    <h2 className="text-3xl mb-2 text-[#fff]">All Jobs</h2>
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto mb-4">
                    <input
                        type="text"
                        placeholder="Search by job name"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="p-2 border rounded-md mr-2"
                    />
                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">All Statuses</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Open">Open</option>
                    </select>
                </div>
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4 grid grid-cols-10">
                                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                    #
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Title
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Category
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Budget
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    No. Of Proposals
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Time
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Size
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                   Hired
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                   Status
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                   Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentJobs.map((job, index) => (
                                <tr key={job._id} className="grid grid-cols-10">
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <p className="text-black dark:text-white">
                                            {job?.title}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <p className="text-black dark:text-white capitalize">
                                            {findCategoryNameById(job?.category)}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <p className="text-black dark:text-white capitalize">
                                            ${job?.budget}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <p className="text-black dark:text-white capitalize">
                                            {job?.proposals.length}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <p className="text-black dark:text-white capitalize">
                                            {job?.deadline}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <p className="text-black dark:text-white capitalize flex items-center gap-x-2">
                                            {job?.project_size}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <p className="text-black dark:text-white capitalize">
                                            {job?.hired ? 'true' : 'false'}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <p className="text-black dark:text-white capitalize">
                                            {job?.status}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <Link href={`https://koc-chat.vercel.app/job/${job?._id}`} className="text-black dark:text-white capitalize text-xl">
                                            <FaRegEye />
                                        </Link>
                                        <button onClick={() => deleteJob(job._id)} className="hover:text-danger text-xl">
                                                <MdDelete />
                                        </button>
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

export default AllJobsComp;