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

const AllApplicationsComp = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [campusFilter, setCampusFilter] = useState("");
  const [universityFilter, setUniversityFilter] = useState("");
  const [intakeFilter, setIntakeFilter] = useState("");

  // State to store dropdown options
  const [statuses, setStatuses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [intakes, setIntakes] = useState([]);

  useEffect(() => {
    const getApplications = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}/application/`,
        );
        if (res.status === 200) {
          setApplications(res.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getApplications();

    // Fetch options for dropdowns
    const fetchDropdownData = async () => {
      try {
        const [statusRes, courseRes, campusRes, universityRes, intakeRes] =
          await Promise.all([
            axios.get(`${process.env.NEXT_PUBLIC_SERVER}/statuses`),
            axios.get(`${process.env.NEXT_PUBLIC_SERVER}/courses`),
            axios.get(`${process.env.NEXT_PUBLIC_SERVER}/campuses`),
            axios.get(`${process.env.NEXT_PUBLIC_SERVER}/universities`),
            axios.get(`${process.env.NEXT_PUBLIC_SERVER}/intakes`),
          ]);

        setStatuses(statusRes.data);
        setCourses(courseRes.data);
        setCampuses(campusRes.data);
        setUniversities(universityRes.data);
        setIntakes(intakeRes.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchDropdownData();
  }, []);

  useEffect(() => {
    const getFilteredApplications = async () => {
      try {
        const params = {
          status: statusFilter,
          course: courseFilter,
          campus: campusFilter,
          university: universityFilter,
          intakes: intakeFilter,
        };
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}/application/`,
          { params },
        );
        if (res.status === 200) {
          setApplications(res.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getFilteredApplications();
  }, [
    statusFilter,
    courseFilter,
    campusFilter,
    universityFilter,
    intakeFilter,
  ]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const allApplications = applications.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div>
      <h2 className="mb-2 text-3xl text-[#333] dark:text-[#fff]">
        All Applications
      </h2>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-4 grid max-w-full grid-cols-1 gap-x-4 overflow-x-auto lg:md:grid-cols-2">
          <div className="mt-2 grid grid-cols-2 gap-x-4 lg:md:mt-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-md border p-2 text-[#333] placeholder:text-[#333]"
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full rounded-md border p-2 text-[#333] placeholder:text-[#333]"
            >
              <option value="">All Courses</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-x-4 lg:md:mt-0">
            <select
              value={campusFilter}
              onChange={(e) => setCampusFilter(e.target.value)}
              className="w-full rounded-md border p-2 text-[#333] placeholder:text-[#333]"
            >
              <option value="">All Campuses</option>
              {campuses.map((campus) => (
                <option key={campus._id} value={campus._id}>
                  {campus.name}
                </option>
              ))}
            </select>
            <select
              value={universityFilter}
              onChange={(e) => setUniversityFilter(e.target.value)}
              className="w-full rounded-md border p-2 text-[#333] placeholder:text-[#333]"
            >
              <option value="">All Universities</option>
              {universities.map((university) => (
                <option key={university._id} value={university._id}>
                  {university.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-x-4 lg:md:mt-0">
            <select
              value={intakeFilter}
              onChange={(e) => setIntakeFilter(e.target.value)}
              className="w-full rounded-md border p-2 text-[#333] placeholder:text-[#333]"
            >
              <option value="">All Intakes</option>
              {intakes.map((intake) => (
                <option key={intake} value={intake}>
                  {intake}
                </option>
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
                  ACK. No.
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Date Created
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Student Name
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  University Name
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Program Name
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Intake
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Created By
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Application Status
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  KC Assignee
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
                    <p className="text-black dark:text-white">{item.acks}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {format(parseISO(item.createdAt), "MM/dd/yyyy")}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="capitalize text-black dark:text-white">
                      {item.user.first_name + " " + item.user.last_name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="capitalize text-black dark:text-white">
                      {item.course.university.name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="capitalize text-black dark:text-white">
                      {item.course.course_name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="capitalize text-black dark:text-white">
                      {item.course.intakes[0] + " " + item.course.intakes[1]}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="capitalize text-black dark:text-white">
                      {item.createdBy}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="capitalize text-black dark:text-white">
                      {item.status}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="capitalize text-black dark:text-white">
                      {item.kcAssignee}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link
                        href={`https://hfconsultancy.net/application/${item._id}`}
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

export default AllApplicationsComp;
