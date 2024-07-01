"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllAdminsComp = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER}/dashboard/admins`,
        );
        console.log(res);
        if (res.status === 200) {
          setAdmins(res.data.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    getAdmins();
  }, []);

  const deleteAdmin = async () => {
    if (!adminToDelete) return;

    setDeleting(true);
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER}/dashboard/admin/${adminToDelete}`,
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        setAdmins(admins.filter((admin) => admin._id !== adminToDelete));
        setShowModal(false);
        setAdminToDelete(null);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setDeleting(false);
    }
  };

  const filteredAdmins = admins.filter((admin) =>
    `${admin.first_name} ${admin.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const openDeleteModal = (adminId) => {
    setAdminToDelete(adminId);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setAdminToDelete(null);
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <input
          type="text"
          placeholder="Search admins"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-gray-300 mb-4 w-full rounded-md border p-2"
        />
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-left dark:bg-meta-4">
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  #
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Admin Name
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Email Address
                </th>
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin, index) => (
                <tr key={admin._id}>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{index + 1}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {admin.first_name + " "} {admin?.lastName}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">{admin?.email}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <button
                      onClick={() => openDeleteModal(admin._id)}
                      className="text-xl hover:text-danger"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-md bg-white p-6">
            <p className="mb-4">Are you sure you want to delete this admin?</p>
            <div className="flex justify-end">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-300 mr-4 rounded-md px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={deleteAdmin}
                className="rounded-md bg-black px-4 py-2 text-white"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllAdminsComp;
