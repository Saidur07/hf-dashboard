"use client";

import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterStudent = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/dashboard/createStudent`,
        {
          ...formData,
          role: "student",
          createdAt: new Date().toISOString(),
        },
      );

      if (res.status === 200 || res.status === 201) {
        toast.success("Student registered successfully");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          password: "",
          confirm_password: "",
        });
      }
    } catch (error) {
      console.log(error);

      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-3xl text-[#333] dark:text-[#fff]">
        Register A New Student
      </h2>
      <div className="rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
                placeholder="First Name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone_number"
              className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="password"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
                placeholder="Enter your password"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm_password"
                className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="bg-gray-50 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block w-full rounded-lg border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
                placeholder="Confirm password"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
          >
            Register
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterStudent;
