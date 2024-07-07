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
import Select from "react-select";

const AllApplicationsComp = () => {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [universityFilter, setUniversityFilter] = useState("");
  const [intakeFilter, setIntakeFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(true);

  const [courses, setCourses] = useState([]);
  const [universities, setUniversities] = useState([]);
  const statuses = [
    "Received Application at KC",
    "Application in Progress",
    "Application on Hold - Intake yet to open",
    "Application on Hold - KC team",
    "Application on Hold - University",
    "Pending from Partner",
    "Pending from Partner - Login Credentials",
    "Pending from Partner - Academic Documents",
    "Pending from Partner - Financial Documents",
    "Pending from Partner - Application Fee Pending",
    "Pending from KC",
    "Application submitted to the Institution",
    "Application Submitted - Consent Form/Student ID Required",
    "Application Submitted - Under Review",
    "Rejected by Institution",
    "Conditional Offer Received",
    "Un-conditional Offer Received",
    "Funds - Pending from Partner",
    "Funds - On hold by the Institution",
    "Funds - Submitted to the Institution",
    "Funds - Under Assessment",
    "Funds - Approved",
    "Rejected on GTE grounds",
    "COE Received",
    "Payment Received",
    "CAS - Requested",
    "CAS - Received",
    "I-20 - Initiated",
    "I-20 - Received",
    "AIP Received",
    "Visa In Process",
    "Visa Received",
    "Visa Rejected",
    "Proposed for Case Closure",
    "Case Closed",
    "Case Closed - Fraudulent Documents Found",
    "Case Closed - On Partner’s Suggestion",
    "Case Closed - Program Closed",
    "Case Closed - Student Not Qualified",
    "Case Closed - Offer Received - Student not interested to pay",
    "Case Closed - Offer Received - Student Paid Tuition Fees to Other Institution",
    "Case Closed - Student not tagged under KC",
    "Case Closed - Student not Enrolled",
    "Case Closed - Full Commission Received",
    "Deferral - Initiated",
    "Deferral - Completed - Refund Request Pending",
    "Deferral - Completed",
    "Refund Request Initiated",
    "Invoicing Due",
    "Invoice sent to the Institution",
    "Visa Received - Progressive Student",
    "Visa Received - Progressive Student - Discontinued Enrolment",
    "Visa Received - Progressive Student - Tuition Fees Not Paid",
  ];
  const intakes = [
    { value: "january", label: "January" },
    { value: "february", label: "February" },
    { value: "march", label: "March" },
    { value: "april", label: "April" },
    { value: "may", label: "May" },
    { value: "june", label: "June" },
    { value: "july", label: "July" },
    { value: "august", label: "August" },
    { value: "september", label: "September" },
    { value: "october", label: "October" },
    { value: "november", label: "November" },
    { value: "december", label: "December" },
  ];

  useEffect(() => {
    const getApplications = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}/application/?status=${statusFilter}&course=${courseFilter}&searchTerm=${searchTerm}&university=${universityFilter}&intakes=${intakeFilter}`,
        );
        if (res.status === 200) {
          setApplications(res.data.data);
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    getApplications();
  }, [courseFilter, intakeFilter, searchTerm, statusFilter, universityFilter]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [courseRes, universityRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_SERVER}/course`),
          axios.get(`${process.env.NEXT_PUBLIC_SERVER}/university`),
        ]);

        setCourses(courseRes.data.data);
        setUniversities(universityRes.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchDropdownData();
  }, []);

  useEffect(() => {
    const getFilteredApplications = async () => {
      setLoading(true);
      try {
        const params = {
          status: statusFilter,
          course: courseFilter,
          university: universityFilter,
          intakes: intakeFilter.map((i) => i.value).join(","),
          searchTerm,
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
      setLoading(false);
    };
    getFilteredApplications();
  }, [statusFilter, courseFilter, universityFilter, intakeFilter, searchTerm]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const sortedApplications = [...applications].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    if (sortOrder === "asc") return dateA - dateB;
    if (sortOrder === "desc") return dateB - dateA;
    return 0;
  });

  const allApplications = sortedApplications.slice(startIndex, endIndex);

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
        <div className="mb-4 grid max-w-full grid-cols-1 gap-4 overflow-x-auto lg:md:grid-cols-2">
          <div className="mt-2 grid grid-cols-2 gap-x-4 lg:md:mt-0">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-md border p-2 text-[#333] placeholder:text-[#333]"
            />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full rounded-md border p-2 text-[#333] placeholder:text-[#333]"
            >
              <option value="">Sort by Date</option>
              <option value="asc">Oldest to Newest</option>
              <option value="desc">Newest to Oldest</option>
            </select>
          </div>
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
              {courses?.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-x-4 lg:md:mt-0">
            <select
              value={universityFilter}
              onChange={(e) => setUniversityFilter(e.target.value)}
              className="w-full rounded-md border p-2 text-[#333] placeholder:text-[#333]"
            >
              <option value="">All Universities</option>
              {universities?.map((university) => (
                <option key={university._id} value={university._id}>
                  {university.name}
                </option>
              ))}
            </select>

            <select
              value={intakeFilter}
              onChange={(e) => setIntakeFilter(e.target.value)}
              className="w-full rounded-md border p-2 text-[#333] placeholder:text-[#333]"
            >
              <option value="">All Intakes</option>
              {intakes.map((intake) => (
                <option key={intake.value} value={intake.value}>
                  {intake.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
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
                    University Name
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Program Name
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Intake
                  </th>

                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Application Status
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
                        {item.status}
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
        )}
      </div>
      <div className="mt-4 flex items-center justify-center gap-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`dark:bg-gray-700 rounded bg-[#ddd] px-4 py-2 text-[#333] dark:text-gray-300 ${
            currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`dark:bg-gray-700 rounded bg-[#ddd] px-4 py-2 text-[#333] dark:text-gray-300 ${
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

export default AllApplicationsComp;
