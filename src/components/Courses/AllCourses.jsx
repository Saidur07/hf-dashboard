"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseISO, format } from "date-fns";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MultiSelect } from "react-multi-select-component";

const AllCoursesComp = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("new");
  const [universities, setUniversities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [selectedIntakes, setSelectedIntakes] = useState([]);

  const getCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/course/`);
      console.log(res);
      if (res.status === 200) {
        setCourses(res.data.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);
  const fetchUniversities = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/university`,
      );
      if (response.data.success) {
        setUniversities(response.data.data);
      }
    } catch (error) {
      toast.error("Error fetching Universities");
    }
  };
  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/misc/countries`,
      );
      if (response.data.success) {
        setCountries(response.data.data.map((country) => country.name));
      }
    } catch (error) {
      toast.error("Error fetching countries");
    }
  };

  const fetchStates = async (country) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/misc/state/${country}`,
      );
      if (response.data.success) {
        setStates(response.data.data.map((state) => state.name));
      }
    } catch (error) {
      toast.error("Error fetching states");
    }
  };

  const fetchCities = async (state) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER}/misc/city/${state}`,
      );
      if (response.data.success) {
        setCities(response.data.data.map((city) => city.name));
      }
    } catch (error) {
      toast.error("Error fetching cities");
    }
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredCourses = courses
    .filter((course) =>
      course.course_name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) =>
      sortOrder === "new"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt),
    );

  const allCourses = filteredCourses.slice(startIndex, endIndex);

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

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(""); // "edit", "add", or "delete"
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    course_name: "",
    campus: "",
    course_url: "",
    application_deadline: "",
    application_fee: "",
    yearly_tuition_fee: "",
    pte_overall: "",
    pte_no_bands_less_than: "",
    toefl_ibt_overall: "",
    ielts_overall: "",
    ielts_no_band_less_than: "",
    det_score: "",
    entry_requirements: "",
    remarks: "",
    duration: "",
    highest_qualification_studied: "",
    backlog: "",
  });
  useEffect(() => {
    if (selectedCountry && !selectedState && !selectedCity) {
      // Country selected, but state and city are not selected
      fetchStates(selectedCountry);
    } else if (selectedState && !selectedCity) {
      // State selected, but city is not selected
      fetchCities(selectedState);
    } else if (selectedCity && !selectedState && !selectedCountry) {
      // Only city is selected, remove it and call all
      setSelectedCity(null);
      fetchCountries();
      fetchStates();
      fetchCities();
    } else if (selectedState && !selectedCountry) {
      // Only state is selected, clear it and call all
      setSelectedState(null);
      fetchCountries();
      fetchStates();
      fetchCities();
    } else if (selectedState && selectedCity && !selectedCountry) {
      // Both state and city are selected, call all
      fetchCountries();
      fetchStates();
      fetchCities();
    } else if (selectedCountry && selectedCity && !selectedState) {
      // Country and city selected only, clear country and fetch states
      setSelectedCountry(null);
      fetchStates();
    }
  }, [selectedCountry, selectedState, selectedCity]);

  const openModal = (mode, course) => {
    setModalMode(mode);
    fetchUniversities();
    fetchCountries();
    setSelectedCourse(course);
    if (course) {
      setFormData(course);
      setSelectedCountry(course.country);
      setSelectedState(course.state);
      setSelectedCity(course.city);
      setSelectedUniversity(course.university._id);
      console.log(course.state, selectedState);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      course_name: "",
      campus: "",
      course_url: "",
      application_deadline: "",
      application_fee: "",
      yearly_tuition_fee: "",
      pte_overall: "",
      pte_no_bands_less_than: "",
      toefl_ibt_overall: "",
      ielts_overall: "",
      ielts_no_band_less_than: "",
      det_score: "",
      entry_requirements: "",
      remarks: "",
      duration: "",
      highest_qualification_studied: "",
      backlog: "",
    });
    setSelectedCountry(null);
    setSelectedState(null);
    setSelectedCity(null);
    setSelectedUniversity(null);
    setSelectedIntakes([]);
    setSelectedCourse(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (modalMode === "add") {
        await axios.post(`${process.env.NEXT_PUBLIC_SERVER}/course/create`, {
          ...formData,
          country: selectedCountry,
          city: selectedCity,
          state: selectedState,
          intakes: selectedIntakes.map((intake) => intake.value).join(","),
          university: selectedUniversity,
        });
        toast.success("Course added successfully!");
      } else if (modalMode === "edit") {
        await axios.patch(
          `${process.env.NEXT_PUBLIC_SERVER}/course/edit?id=${selectedCourse._id}`,
          {
            ...formData,
            country: selectedCountry,
            city: selectedCity,
            state: selectedState,
            intakes: selectedIntakes.map((intake) => intake.value).join(","),
            university: selectedUniversity,
          },
        );
        toast.success("Course updated successfully!");
      }
      setIsModalOpen(false);
      getCourses();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER}/course/delete?id=${selectedCourse._id}`,
      );
      toast.success("Course deleted successfully!");
      setIsModalOpen(false);
      getCourses();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="mb-2 text-3xl text-[#333]">All Courses</h2>
        <button
          onClick={() => openModal("add", null)}
          className="flex justify-center rounded bg-primary px-12 py-4 font-medium text-gray hover:bg-opacity-90"
        >
          Create a new course
        </button>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
        <div className="mb-4 grid max-w-full grid-cols-2 gap-x-4 overflow-x-auto">
          <input
            type="text"
            placeholder="Search courses"
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-4 w-full rounded-md border border-gray-300 p-2"
          />
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="mb-4 w-full rounded-md border border-gray-300 p-2"
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
                <tr className="bg-gray-200 text-left">
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    #
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    Date Created
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    Course Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    Intakes
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    Campus
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    Application Deadline
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    Application Fee
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    Yearly Tuition Fee
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    IELTS Band
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    Entry Requirements
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    University
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allCourses.map((item, index) => (
                  <tr key={item._id}>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <h5 className="font-medium text-black">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <p className="text-black">
                        {format(parseISO(item?.createdAt), "MM/dd/yyyy")}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <p className="text-black">{item?.course_name}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <p className="text-black">{item?.intakes.join(", ")}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <p className="capitalize text-black">{item?.campus}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <p className="capitalize text-black">
                        {item?.application_deadline}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <p className="capitalize text-black">
                        {item?.application_fee}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <p className="capitalize text-black">
                        {item?.yearly_tuition_fee}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <p className="capitalize text-black">
                        {item?.ielts_no_band_less_than}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <p className="capitalize text-black">
                        {item?.entry_requirements}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <p className="capitalize text-black">
                        {item?.university.name}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <div className="flex items-center space-x-3.5">
                        <p
                          className="cursor-pointer text-xl capitalize text-green-800"
                          onClick={() => openModal("edit", item)}
                        >
                          <FaEdit />
                        </p>
                        <p
                          className="cursor-pointer text-xl capitalize text-red"
                          onClick={() => openModal("delete", item)}
                        >
                          <MdDelete />
                        </p>
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
          className={`rounded bg-[#ddd] px-4 py-2 text-[#333] ${
            currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`rounded bg-[#ddd] px-4 py-2 text-[#333] ${
            currentPage === totalPages ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>
      <ToastContainer />
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-3xl rounded bg-white p-8">
            <h3 className="mb-4 text-xl font-semibold">
              {modalMode === "add"
                ? "Add New Course"
                : modalMode === "edit"
                  ? "Edit Course"
                  : "Delete Course"}
            </h3>
            {modalMode === "delete" ? (
              <div>
                <p>Are you sure you want to delete this course?</p>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={handleDeleteCourse}
                    className="rounded bg-[#f83f3f] px-4 py-2 text-white"
                  >
                    {loading ? "..." : "Yes, Delete"}
                  </button>
                  <button
                    onClick={closeModal}
                    className="rounded bg-[#636363] px-4 py-2 text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="grid max-h-[50vh] grid-cols-2 gap-4 overflow-y-auto">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Course Name*
                    </label>
                    <input
                      type="text"
                      name="course_name"
                      value={formData.course_name}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Course Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Intakes*
                    </label>
                    <MultiSelect
                      options={[
                        { label: "january", value: "january" },
                        { label: "february", value: "february" },
                        { label: "march", value: "march" },
                        { label: "april", value: "april" },
                        { label: "may", value: "may" },
                        { label: "june", value: "june" },
                        { label: "july", value: "july" },
                        { label: "august", value: "august" },
                        { label: "september", value: "september" },
                        { label: "october", value: "october" },
                        { label: "november", value: "november" },
                        { label: "december", value: "december" },
                      ]}
                      value={selectedIntakes}
                      onChange={setSelectedIntakes}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Campus*
                    </label>
                    <input
                      type="text"
                      name="campus"
                      value={formData.campus}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Campus"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Course URL*
                    </label>
                    <input
                      type="url"
                      name="course_url"
                      value={formData.course_url}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Course URL"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Application Deadline*
                    </label>
                    <input
                      type="date"
                      name="application_deadline"
                      value={formData.application_deadline}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Application Deadline"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Application Fee*
                    </label>
                    <input
                      type="number"
                      name="application_fee"
                      value={formData.application_fee}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Application Fee"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Yearly Tuition Fee*
                    </label>
                    <input
                      type="number"
                      name="yearly_tuition_fee"
                      value={formData.yearly_tuition_fee}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Yearly Tuition Fee"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      PTE Overall
                    </label>
                    <input
                      type="number"
                      name="pte_overall"
                      value={formData.pte_overall}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="PTE Overall"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      PTE No Bands Less Than*
                    </label>
                    <input
                      type="number"
                      name="pte_no_bands_less_than"
                      value={formData.pte_no_bands_less_than}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="PTE No Bands Less Than"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      TOEFL iBT Overall*
                    </label>
                    <input
                      type="number"
                      name="toefl_ibt_overall"
                      value={formData.toefl_ibt_overall}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="TOEFL iBT Overall"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      IELTS Overall*
                    </label>
                    <input
                      type="number"
                      name="ielts_overall"
                      value={formData.ielts_overall}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="IELTS Overall"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      IELTS No Band Less Than*
                    </label>
                    <input
                      type="number"
                      name="ielts_no_band_less_than"
                      value={formData.ielts_no_band_less_than}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="IELTS No Band Less Than"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      DET Score*
                    </label>
                    <input
                      type="number"
                      name="det_score"
                      value={formData.det_score}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="DET Score"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Entry Requirements*
                    </label>
                    <input
                      type="text"
                      name="entry_requirements"
                      value={formData.entry_requirements}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Entry Requirements"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Remarks*
                    </label>
                    <input
                      type="text"
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Remarks"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Duration*
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Duration"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      University*
                    </label>
                    <select
                      value={selectedUniversity}
                      onChange={(e) => setSelectedUniversity(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="University"
                      required
                    >
                      <option value="">Select an option</option>
                      {universities?.map((option, index) => (
                        <option key={index} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    {/* <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="University"
                      required
                    /> */}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Country*
                    </label>

                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Country"
                      required
                    >
                      <option value="">Select an option</option>
                      {countries?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {/* <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Country"
                      required
                    /> */}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      State*
                    </label>
                    {/* <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="State"
                      required
                    /> */}
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="State"
                      required
                    >
                      <option value="">Select an option</option>
                      {states?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      City*
                    </label>
                    {/* <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="City"
                      required
                    /> */}
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="City"
                      required
                    >
                      <option value="">Select an option</option>
                      {cities?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Highest Qualification Studied*
                    </label>
                    <select
                      name="highest_qualification_studied"
                      value={formData.highest_qualification_studied}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Highest Qualification Studied"
                      required
                    >
                      <option value="">Select an option</option>
                      {[
                        "PhD",
                        "Postgraduate",
                        "Undergraduate",
                        "Grade 12th or equivalent",
                        "Grade 10th or equivalent",
                      ]?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {/* <input
                      type="text"
                      name="highest_qualification_studied"
                      value={formData.highest_qualification_studied}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Highest Qualification Studied"
                      required
                    /> */}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      Backlog*
                    </label>
                    <input
                      type="number"
                      name="backlog"
                      value={formData.backlog}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="Backlog"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="rounded bg-blue-500 px-4 py-2 text-white"
                  >
                    {loading ? "..." : "Save"}
                  </button>
                  <button
                    onClick={closeModal}
                    className="text-gray-800 rounded bg-gray-300 px-4 py-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCoursesComp;
