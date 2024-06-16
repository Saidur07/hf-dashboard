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
    const [typeFilter, setTypeFilter] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [denialReason, setDenialReason] = useState("");
    const [showDenialModal, setShowDenialModal] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState("");

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
        if (status === 'denied') {
            setSelectedRequestId(id);
            setShowDenialModal(true);
        } else {
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
    }

    const handleDenialSubmit = async () => {
        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER}/transaction/${selectedRequestId}`, { status: 'denied', reason: denialReason });
            if (res.status === 200) {
                setReqs(reqs.map(req => req._id === selectedRequestId ? { ...req, status: 'denied' } : req));
                toast.success('Withdrawal request denied successfully!');
                setShowDenialModal(false);
            }
        } catch (e) {
            console.error(e);
            toast.error('Failed to deny withdrawal request');
        }
    }


    const filteredReqs = reqs.filter(req => {
        const reqDate = new Date(req.createdAt).toISOString().split('T')[0]; // Adjust the field name to match your data structure and format the date
        return req.type === "withdrawal" &&
            (statusFilter === "" || req.status === statusFilter) &&
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
        <div className="relative min-h-screen">
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 min-h-[80vh]">
                <h2 className="lg:md:text-3xl text-xl font-semibold mb-2">Para Çekme Talepleri</h2>
                <div className="w-full grid lg:md:grid-cols-3 grid-cols-2 gap-x-4">
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="px-4 py-2 mb-4 rounded border border-gray-300 focus:outline-none focus:border-primary "
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 mb-4 rounded border border-gray-300 focus:outline-none focus:border-primary "
                    >
                        <option value="">Tüm Talepler</option>
                        <option value="pending">Askıda</option>
                        <option value="approved">Onaylı</option>
                        <option value="denied">Reddedildi</option>
                    </select>
                </div>
                <div className="rounded-lg shadow-md m-2 lg:m-5 overflow-x-auto overflow-y-hidden">
                    <table className="min-w-full border-collapse text-left text-sm">
                        <thead className="sticky top-0 z-10 overflow-x-hidden">
                            <tr className="text-left dark:bg-meta-4 w-full overflow-x-hidden">
                                <th scope="col" className="px-4 py-4 font-medium text-black dark:text-white">İsim</th>
                                <th scope="col" className="px-4 py-4 font-medium text-black dark:text-white">e-mail </th>
                                <th scope="col" className="px-4 py-4 font-medium text-black dark:text-white">Tarih</th>
                                <th scope="col" className="px-4 py-4 font-medium text-black dark:text-white">IBAN</th>
                                <th scope="col" className="px-4 py-4 font-medium text-black dark:text-white">Banka</th>
                                <th scope="col" className="px-4 py-4 font-medium text-black dark:text-white">Miktar</th>
                                <th scope="col" className="px-4 py-4 font-medium text-black dark:text-white">İşlem</th>
                                <th scope="col" className="px-4 py-4 font-medium text-black dark:text-white">Durum</th>
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
                                                {req.iban_number.slice(0, 5)}**
                                            </p>
                                            <button onClick={() => copyToClipboard(req.iban_number)} className="text-black dark:text-white">
                                                <GoCopy />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white capitalize">
                                            {req.bank_name}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white w-full">
                                            ₺{req.amount}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white w-full">
                                            {req.type === 'withdrawal' && "Para Çekme"}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <select
                                            value={req.status}
                                            onChange={(e) => updateStatus(req._id, e.target.value)}
                                            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-primary"
                                        >
                                            <option value="pending">Askıda</option>
                                            <option value="approved">Onaylı</option>
                                            <option value="denied">Reddedildi</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showDenialModal && (
                    <div className="absolute z-10 inset-0 overflow-y-hidden lg:md:top-0 top-[-25%]">
                        <div className="flex items-end justify-center min-h-screen  text-center sm:block p-5">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-4 sm:align-middle ">
                                <div className="dark:bg-[#1A222C] bg-white px-4 py-6 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="text-center ">
                                            <h3 className="lg:md:text-lg text-[18px] font-medium dark:text-white text-[#333]">Reddetme Nedenini Belirtin</h3>
                                            <div className="mt-4">
                                                <textarea
                                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary dark:bg-[#1A222C] bg-white w-full"
                                                    rows="4"
                                                    placeholder="Reddetme Nedenini Belirtin"
                                                    value={denialReason}
                                                    onChange={(e) => setDenialReason(e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 flex items-center gap-x-2 w-full mt-4 justify-center">
                                        <button
                                            onClick={handleDenialSubmit}
                                            className="lg:md:px-6 px-4 rounded-md py-2 lg:md:text-[16px] text-[14px] bg-primary text-[#fff]"
                                        >
                                            Reddetmek
                                        </button>
                                        <button
                                            onClick={() => setShowDenialModal(false)}
                                            className="lg:md:px-6 px-4 rounded-md py-2 lg:md:text-[16px] text-[14px] text-primary bg-[#fff]"
                                        >
                                            İptal etmek
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}


            </div>
            <div className="flex gap-x-4 items-center justify-center mt-4">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded bg-[#ddd] dark:bg-gray-700 text-[#333] dark:text-gray-300 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    Geri
                </button>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded bg-[#ddd] dark:bg-gray-700 text-[#333] dark:text-gray-300 ${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    İleri
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AllWithdrawalReqs;