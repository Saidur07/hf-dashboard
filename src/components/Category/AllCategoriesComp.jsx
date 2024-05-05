'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AllCategoriesComp = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    
    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/category`);
                console.log(res)
                if (res.status === 200) {
                    const formattedCategories = res.data.data.map((category) => ({
                        ...category,
                        createdAt: new Date(category.createdAt).toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true,
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        }),
                    }));
                    setCategories(formattedCategories);
                }

            } catch (e) {
                console.log(e)
            }
        }
        getCategories()
    }, [])

    console.log(categories);

     const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );

    const itemsPerPage = 20;
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCats = filteredCategories.slice(startIndex, endIndex);


    const nextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    }

    const prevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    }

    
    const deleteCategory = async (id) => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/category/${id}`);
            console.log(res)
            if (res.status === 200) {
                toast.success("Category deleted")
                const filteredCategories = categories.filter((category) => category._id !== id);
                setCategories(filteredCategories);
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <h2 className="text-3xl bold mb-2">All Categories</h2>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by category name"
                    className="px-4 py-3 mb-4 rounded border border-gray-300 focus:outline-none focus:border-primary w-[60%]"
                />
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                    #
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Category Name
                                </th>
                                <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                    Created At
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCats.map((category, index) => (
                                <tr key={category._id}>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {index + 1}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <Image
                                            src={category.image} alt="category image" width={80} height={80} className="rounded-lg"/>
                                        <p className="text-black dark:text-white">
                                            {category.name}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {category.createdAt}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <Link href={`/category/${category._id}`} className="hover:text-warning text-xl">
                                                <FaRegPenToSquare />
                                            </Link>
                                            <button onClick={() => deleteCategory(category._id)} className="hover:text-danger text-xl">
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
            <ToastContainer/>
        </div>
    );
};

export default AllCategoriesComp;