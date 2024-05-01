'use client';

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Link from "next/link";

const AllSkillComp = () => {
    const [skills, setSkills] = useState([]);
    useEffect(() => {
        const getSkills = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/skill`);
                console.log(res)
                if (res.status === 200) {
                    setSkills(res.data.data);
                }

            } catch (e) {
                console.log(e)
            }
        }
        getSkills()
    }, [])

    console.log(skills);

    return (
        <div>
            <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                    #
                                </th>
                                <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                    Skill Name
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {skills.map((skill, index) => (
                                <tr key={skill._id}>
                                    <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                        <h5 className="font-medium text-black dark:text-white">
                                            {index + 1}
                                        </h5>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark flex items-center gap-x-2">
                                        <Image
                                            src={skill.image} alt="category image" width={80} height={80} className="rounded-lg" />
                                        <p className="text-black dark:text-white">
                                            {skill.name}
                                        </p>
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

export default AllSkillComp;