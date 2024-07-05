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
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("new");

  useEffect(() => {
    const getApplications = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    getApplications();
  }, []);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(students.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredStudents = students
    .filter((student) =>
      `${student.first_name} ${student.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    )
    .filter((student) =>
      statusFilter ? student.status === statusFilter : true,
    )
    .sort((a, b) =>
      sortOrder === "new"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt),
    );

  const allApplications = filteredStudents.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div>
      <h2 className="mb-2 text-3xl text-[#333] dark:text-[#fff]">
        All Students
      </h2>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-4 grid max-w-full grid-cols-2 gap-x-4 overflow-x-auto lg:md:grid-cols-3">
          <input
            type="text"
            placeholder="Search students"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border-gray-300 mb-4 w-full rounded-md border p-2"
          />
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="border-gray-300 mb-4 w-full rounded-md border p-2"
          >
            <option value="">All Statuses</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
            <option value="banned">Banned</option>
          </select>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="border-gray-300 mb-4 w-full rounded-md border p-2"
          >
            <option value="new">Newest First</option>
            <option value="old">Oldest First</option>
          </select>
        </div>
        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <div className="py-6 text-center">Loading...</div>
          ) : (
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
                        {format(parseISO(item?.createdAt), "MM/dd/yyyy")}
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
                        {item?.created_by ?? "--"}
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
                          href={`https://hfconsultancy.net/dashboard/profile/${item?._id}`}
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
          )}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center gap-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`dark:bg-gray-700 dark:text-gray-300 rounded bg-[#ddd] px-4 py-2 text-[#333] ${
            currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`dark:bg-gray-700 dark:text-gray-300 rounded bg-[#ddd] px-4 py-2 text-[#333] ${
            currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllStudentsComp;
