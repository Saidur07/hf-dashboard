'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Link from "next/link";

const AllSubCatComp = () => {
    const [subCats, setSubCats] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

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
        const getsubCats = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/subCategory`);
                console.log(res)
                if (res.status === 200) {
                    setSubCats(res.data.data);
                }

            } catch (e) {
                console.log(e)
            }
        }
        getsubCats();
        getCategories();
    }, [])
    const findCategoryNameById = (id) => {
        const category = categories.find(category => category._id === id);
        return category ? category.name : 'Category not found';
    };

    const itemsPerPage = 10;
    const totalPages = Math.ceil(subCats.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentSubCats = subCats.slice(startIndex, endIndex);

    const nextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    }

    const prevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    }

    const deleteSubCat = async (id) => {
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER}/subCategory/${id}`);
            console.log(res)
            if (res.status === 200) {
                const filteredSubCats = subCats.filter((sub) => sub._id !== id);
                setSubCats(filteredSubCats);
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <h2 className="lg:md:text-3xl text-xl font-semibold mb-2">Tüm Alt Kategoriler</h2>
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-left dark:bg-meta-4">
                                <th className="min-w-[60px] px-4 py-4 font-medium text-black dark:text-white">
                                    #
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Alt Kategori

                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Kategori
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Aksiyon
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentSubCats.map((cat, index) => (
                                <tr key={cat._id}>
                                    <td className="border-b px-4 py-5 dark:border-strokedark">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {index + 1}
                                        </h5>
                                    </td>
                                    <td className="border-b px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <Image
                                            src={cat.image} alt="category image" width={80} height={80} className="rounded-lg w-50 h-40" />
                                        <p className="text-black dark:text-white">
                                            {cat.name}
                                        </p>
                                    </td>
                                    <td className="border-b px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white capitalize">
                                            {findCategoryNameById(cat?.category)}
                                        </p>
                                    </td>
                                    <td className="border-b px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <Link href={`/subCategory/${cat?._id}`} className="text-black dark:text-white capitalize text-xl">
                                            <FaRegEye />
                                        </Link>
                                        <button onClick={() => deleteSubCat(cat._id)} className="hover:text-danger text-xl">
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
        </div>
    );
};

export default AllSubCatComp;