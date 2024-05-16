'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const AllAdminsComp = () => {
    const [admins, setAdmins] = useState([]);
    console.log(admins)
    useEffect(() => {
        const getAdmins = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/user/getAdmins`);
                console.log(res)
                if (res.status === 200) {
                    setAdmins(res.data.data);
                }

            } catch (e) {
                console.log(e)
            }
        }
        getAdmins()
    }, [])

    const deleteAdmin = async (email) => {
        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER}/deleteAdmin`, { email });

            if (res.status === 200) {
                toast.success(res.data.message);
                setAdmins(admins.filter(admin => admin.email !== email));
            }
        } catch (e) {
            console.log(e)
        }     
    }
    console.log(admins);

    return (
        <div>
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="grid grid-cols-3 bg-gray-2 text-left dark:bg-meta-4">
                                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                                    Admin Name
                                </th>
                                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                                    Admin Email
                                </th>
                                <th className=" px-4 py-4 font-medium text-black dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin, index) => (
                                <tr key={admin._id} className='grid grid-cols-3'>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {index + 1}{"."}
                                        </h5>
                                        <p className="text-black dark:text-white">
                                            {admin.first_name} {admin?.lastName}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <p className="text-black dark:text-white">
                                            {admin.email}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <button onClick={() => deleteAdmin(admin.email)} className="hover:text-danger text-xl">
                                            <MdDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllAdminsComp;