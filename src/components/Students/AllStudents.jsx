"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { GoCopy } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseISO, format } from "date-fns";

const AllStudentsComp = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getApplications = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}/dashboard/students/`,
        );
        console.log(res);
        if (res.status === 200) {
          setStudents(res.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getApplications();
  }, []);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(students.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const allApplications = students.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div>
      <h2 className="mb-2 text-3xl text-[#333] dark:text-[#fff]">
        All Students
      </h2>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-4 grid max-w-full grid-cols-1 gap-x-4 overflow-x-auto lg:md:grid-cols-2">
          {/* <div className="mt-2 grid grid-cols-2 gap-x-4 lg:md:mt-0">
            <input
              type="text"
              placeholder="ID ile ara"
              value={jobId}
              onChange={handleJobChange}
              className="mr-2 w-full max-w-2xl rounded-md border p-2"
            />
            <input
              type="text"
              placeholder="İş başlığı ile ara"
              value={searchTerm}
              onChange={handleSearchChange}
              className="mr-2 w-full max-w-2xl rounded-md border p-2"
            />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-x-4 lg:md:mt-0">
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="w-lg w-full rounded-md border p-2 text-[#333] placeholder:text-[#333]"
            >
              <option value="">Tüm Durumlar</option>
              <option value="Completed">Tamamlanmış</option>
              <option value="Open">Açık</option>
              <option value="In Progress">Devam Etmekte</option>
              <option value="Canceled">İptal Edildi</option>
              <option value="Invited">Davetler</option>
            </select>
          </div> */}
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  #
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Date Created
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Student Name
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Email Address
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Mobile Number
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Created By
                </th>

                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allApplications.map((item, index) => (
                <tr key={item._id}>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </h5>
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {format(item?.createdAt, "MM/dd/yyyy")}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {item?.first_name + " " + item?.last_name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="capitalize text-black dark:text-white">
                      {item?.email}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="capitalize text-black dark:text-white">
                      {item?.phone_number}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="capitalize text-black dark:text-white">
                      {item?._id}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="capitalize text-black dark:text-white">
                      {item?.status}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link
                        href={`https://hfconsultancy.net/profile/${item?._id}`}
                        className="text-xl capitalize text-black dark:text-white"
                      >
                        <FaRegEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`dark:bg-gray-700 dark:text-gray-300 rounded bg-[#ddd] px-4 py-2 text-[#333] ${currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`dark:bg-gray-700 dark:text-gray-300 rounded bg-[#ddd] px-4 py-2 text-[#333] ${currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          Next
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AllStudentsComp;
