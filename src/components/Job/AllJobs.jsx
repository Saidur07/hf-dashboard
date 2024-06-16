'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { GoCopy } from "react-icons/go";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllJobsComp = () => {
    const [jobs, setJobs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [jobId, setJobId] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

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
            (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "") &&
            (job._id.toString() === jobId || jobId === "") &&
            (job.status.toLowerCase() === statusFilter.toLowerCase() || statusFilter === "") &&
            (job.category === categoryFilter || categoryFilter === "")
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
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/offer/delete/${id}`);
            console.log(res)
            if (res.status === 200) {
                const filteredJobs = jobs.filter((job) => job._id !== id);
                setJobs(filteredJobs);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleJobChange = (e) => {
        setJobId(e.target.value);
        setCurrentPage(1);
    }

    const handleStatusFilterChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1);
    };

    const handleCategoryFilterChange = (e) => {
        setCategoryFilter(e.target.value);
        setCurrentPage(1);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Job ID copied to clipboard!');
    }
    return (
        <div>
            <h2 className="text-3xl mb-2 dark:text-[#fff] text-[#333]">Tüm İşler</h2>
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto mb-4 gap-x-4 grid lg:md:grid-cols-2 grid-cols-1">
                    <div className="grid grid-cols-2 gap-x-4 lg:md:mt-0 mt-2">
                        <input
                            type="text"
                            placeholder="ID ile ara"
                            value={jobId}
                            onChange={handleJobChange}
                            className="p-2 border rounded-md mr-2 max-w-2xl w-full"
                        />
                        <input
                            type="text"
                            placeholder="İş başlığı ile ara"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="p-2 border rounded-md mr-2 max-w-2xl w-full"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 lg:md:mt-0 mt-2">
                        <select
                            value={statusFilter}
                            onChange={handleStatusFilterChange}
                            className="p-2 border rounded-md w-lg w-full placeholder:text-[#333] text-[#333]"
                        >
                            <option value="">Tüm Durumlar</option>
                            <option value="Completed">Tamamlanmış</option>
                            <option value="Open">Açık</option>
                            <option value="In Progress">Devam Etmekte</option>
                            <option value="Canceled">İptal Edildi</option>
                            <option value="Invited">Davetler</option>
                        </select>
                        <select
                            value={categoryFilter}
                            onChange={handleCategoryFilterChange}
                            className="p-2 border rounded-md w-lg w-full placeholder:text-[#333] text-[#333]"
                        >
                            <option value="">Tüm Kategoriler</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-left dark:bg-meta-4">
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    #
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    İş ID
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Başlık
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Kategori
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Bütçe
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Teklif Sayısı
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Zaman
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Boyut
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Anlaşıldı
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Durum
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Aksiyon
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentJobs.map((job, index) => (
                                <tr key={job._id}>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <p className="text-black dark:text-white capitalize">
                                            {job._id.slice(0, 5)}**
                                        </p>
                                        <button onClick={() => copyToClipboard(job._id)} className="text-black dark:text-white">
                                            <GoCopy />
                                        </button>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {job?.title.length > 30 ? job?.title.slice(0, 30) + '...' : job?.title}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white capitalize">
                                            {findCategoryNameById(job?.category)}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white capitalize">
                                            ₺{job?.budget}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white capitalize">
                                            {job?.proposals.length}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white capitalize">
                                            {job?.deadline}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white capitalize">
                                            {job?.project_size}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white capitalize">
                                            {job?.hired ? 'Doğru' : 'Yanlış'}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white capitalize">
                                            {job?.status}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <Link href={`https://koc-chat.vercel.app/job/${job?._id}`} className="text-black dark:text-white capitalize text-xl">
                                                <FaRegEye />
                                            </Link>
                                            <button onClick={() => deleteJob(job._id)} className="hover:text-danger text-xl">
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

export default AllJobsComp;