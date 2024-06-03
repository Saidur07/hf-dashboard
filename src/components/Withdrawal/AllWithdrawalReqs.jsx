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

const AllWithdrawalReqs = () => {
    const [reqs, setReqs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("");
    const [filterDate, setFilterDate] = useState("");


    useEffect(() => {
        const getReqs = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/transaction`);
                console.log(res)
                if (res.status === 200) {
                    setReqs(res.data.data);
                }

            } catch (e) {
                console.log(e)
            }
        }
        getReqs()
    }, [])

    const updateStatus = async (id, status) => {
        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER}/transaction/${id}`, { status });
            if (res.status === 200) {
                setReqs(reqs.map(req => req._id === id ? { ...req, status } : req));
                toast.success('Status updated successfully!');
            }
        } catch (e) {
            console.error(e);
            toast.error('Failed to update status');
        }
    }

    const filteredReqs = reqs.filter(req => {
        const reqDate = new Date(req.createdAt).toISOString().split('T')[0]; // Adjust the field name to match your data structure and format the date
        return (statusFilter === "" || req.status === statusFilter) &&
            (filterDate === "" || reqDate === filterDate);
    });

    const itemsPerPage = 20;
    const totalPages = Math.ceil(filteredReqs.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentReqs = filteredReqs.slice(startIndex, endIndex);


    const nextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    }

    const prevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('IBAN copied to clipboard!');
    }



    return (
        <div>
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <h2 className="lg:md:text-3xl text-xl font-semibold mb-2">All Withdrawal Requests</h2>
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="px-4 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-primary lg:md:w-[20%] w-[40%]"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="ml-2 px-4 py-3 mb-4 rounded border border-gray-300 focus:outline-none focus:border-primary lg:md:w-[20%] w-[40%]"
                >
                    <option value="">All Statuses</option>
                    <option value="pending">pending</option>
                    <option value="approved">approved</option>
                    <option value="denied">denied</option>
                </select>
               <div className="rounded-lg = shadow-md m-2 lg:m-5 overflow-x-auto">
    <table className="min-w-full border-collapse text-left text-sm">
        <thead className="sticky top-0 z-10">
            <tr className="text-left dark:bg-meta-4 w-full">
                <th scope="col" className="px-4 py-4 font-medium text-black dark:text-white">Name</th>
                <th scope="col" className="px-4 py-4 font-medium text-black dark:text-white">Email</th>
                <th scope="col" className="px-4 py-4 font-medium text-black dark:text-white">Date</th>
                <th scope="col" className="px-4 py-4 font-medium text-black dark:text-white">IBAN</th>
                <th scope="col" className="px-4 py-4 font-medium text-black dark:text-white">Bank</th>
                <th scope="col" className="px-4 py-4 font-medium text-black dark:text-white">Amount</th>
                <th scope="col" className="px-4 py-4 font-medium text-black dark:text-white">Status</th>
            </tr>
        </thead>
        <tbody className="divide-y border-t">
            {currentReqs.map((req, index) => (
                <tr key={req._id} className="!text-[14px] whitespace-nowrap">
                    <td className="border-b px-4 py-5 dark:border-strokedark">
                        <div className="flex gap-x-2">
                            <h5 className="font-medium text-black dark:text-white">
                                {(currentPage - 1) * itemsPerPage + index + 1}
                            </h5>
                            <p className="text-black dark:text-white">
                                {req.user?.first_name} {req.user?.lastName}
                            </p>
                        </div>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white w-full max-w-[180px] overflow-x-auto">
                            <span className="inline-block max-w-[220px]">
                                {req.user?.email}
                            </span>
                        </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white capitalize">
                            {new Date(req.createdAt).toISOString().split('T')[0]}
                        </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <div className="flex items-center gap-x-2">
                            <p className="text-black dark:text-white capitalize">
                                {req.ibn_number.slice(0, 5)}**
                            </p>
                            <button onClick={() => copyToClipboard(req.ibn_number)} className="text-black dark:text-white">
                                <GoCopy />
                            </button>
                        </div>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white capitalize">
                            Exim Bank
                        </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <p className="text-black dark:text-white w-full">
                            ₺{req.amount}
                        </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                        <select
                            value={req.status}
                            onChange={(e) => updateStatus(req._id, e.target.value)}
                            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-primary"
                        >
                            <option value="pending">pending</option>
                            <option value="approved">approved</option>
                            <option value="denied">denied</option>
                            {/* Add more options as needed */}
                        </select>
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

export default AllWithdrawalReqs;