"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MultiSelect } from "react-multi-select-component";
import instance from "@/axios/axios";
import Image from "next/image";

const AllUniversitiesComp = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  useEffect(() => {
    fetchUniversities();
  }, []);
  const fetchUniversities = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(universities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredUniversities = universities.filter((university) =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const allUniversities = filteredUniversities.slice(startIndex, endIndex);

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
  const [imageLoading, setImageLoading] = useState(false);
  const [logoLoading, setLogoLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(""); // "edit", "add", or "delete"
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    image: "",
    location: "",
    university_url: "",
    ranking: "",
    description: "",
  });
  console.log("selected", formData);
  const openModal = (mode, university) => {
    setModalMode(mode);
    console.log(university, formData);
    if (university) {
      setFormData(university);
      setSelectedUniversity(university._id);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: "",
      logo: "",
      image: "",
      location: "",
      university_url: "",
      ranking: "",
      description: "",
    });
    setSelectedUniversity(null);
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
        await instance.post(`/university/create`, {
          ...formData,
        });
        toast.success("University added successfully!");
      } else if (modalMode === "edit") {
        await instance.patch(`/university/${selectedUniversity}`, {
          ...formData,
        });
        toast.success("University updated successfully!");
      }
      closeModal();
      fetchUniversities();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUniversity = async () => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER}/university/${selectedUniversity}`,
      );
      toast.success("University deleted successfully!");
      setIsModalOpen(false);
      fetchUniversities();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = async (event) => {
    setLogoLoading(true);
    const file = event.target.files[0];

    if (file?.type?.startsWith("image/")) {
      const formdata = new FormData();
      formdata.append("image", file);
      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=388da10c80ace52a73ba2f27f1720f0e`,
          formdata,
        );
        const imageUrl = response.data.data.url;
        setFormData({ ...formData, logo: imageUrl });
        console.log("image", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("Please select an image file.");
    }
    setLogoLoading(false);
  };
  const handleImageChange = async (event) => {
    setImageLoading(true);
    const file = event.target.files[0];

    if (file?.type?.startsWith("image/")) {
      const formdata = new FormData();
      formdata.append("image", file);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=388da10c80ace52a73ba2f27f1720f0e`,
          formdata,
        );
        const imageUrl = response.data.data.url;
        setFormData({ ...formData, image: imageUrl });
        console.log("image", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.error("Please select an image file.");
    }
    setImageLoading(false);
  };
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="mb-2 text-3xl text-[#333]">All Universities</h2>
        <button
          onClick={() => openModal("add", null)}
          className="flex justify-center rounded bg-primary px-12 py-4 font-medium text-gray hover:bg-opacity-90"
        >
          Add a university
        </button>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 xl:pb-1">
        <div className="mb-4  max-w-full overflow-x-auto">
          <input
            type="text"
            placeholder="Search University"
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-4 w-full rounded-md border border-gray-300 p-2"
          />
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
                    Logo
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    University Name
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    University Location
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    Ranking
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    University URL
                  </th>
                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    Description
                  </th>

                  <th className="whitespace-nowrap px-4 py-4 font-medium text-black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUniversities.map((item, index) => (
                  <tr key={item._id}>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <h5 className="font-medium text-black">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <Image
                        src={item?.logo}
                        alt=""
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <p className="text-black">{item?.name}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <p className="text-black">{item?.location}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <p className="capitalize text-black">{item?.ranking}</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <a
                        className=" text-black underline"
                        href={item?.university_url}
                        target="_blank"
                      >
                        {item?.university_url}
                      </a>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5">
                      <p className="text-nowrap capitalize text-black">
                        {item?.description?.slice(0, 30)}...
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
                ? "Add New University"
                : modalMode === "edit"
                  ? "Edit University"
                  : "Delete University"}
            </h3>
            {modalMode === "delete" ? (
              <div>
                <p>Are you sure you want to delete this University?</p>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    onClick={handleDeleteUniversity}
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
                      University Name*
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="University Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      University Location*
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="University Location"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      University URL*
                    </label>
                    <input
                      type="url"
                      name="university_url"
                      value={formData.university_url}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="University URL"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900">
                      University Rank*
                    </label>
                    <input
                      type="text"
                      name="ranking"
                      value={formData.ranking}
                      onChange={handleInputChange}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                      placeholder="University Rank"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    University Description*
                  </label>
                  <textarea
                    cols={3}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
                    placeholder="University Description"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    University Logo*
                  </label>
                  <div>
                    <div className="grid grid-cols-1 space-y-2">
                      <div className="flex w-full items-center justify-center">
                        <label
                          className="group flex h-60 w-full cursor-pointer flex-col rounded-lg border-4 border-dashed p-10 text-center transition-all hover:border-dotted"
                          htmlFor="logo"
                        >
                          {formData?.logo !== "" ? (
                            <div className="flex h-full w-full flex-col items-center justify-center text-center  ">
                              {logoLoading ? (
                                "Loading..."
                              ) : (
                                <img
                                  src={formData?.logo}
                                  width={200}
                                  height={200}
                                  alt="picture"
                                  className="rounded-xl"
                                  style={{ objectFit: "cover" }} // Ensure the image covers the specified dimensions
                                />
                              )}
                            </div>
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center text-center  ">
                              <div className="mx-auto -mt-5 flex max-h-48 w-3/5 flex-auto">
                                <img
                                  className="has-mask mx-auto h-36 object-center"
                                  src="https://cdni.iconscout.com/illustration/premium/thumb/social-media-image-upload-4358258-3618854.png"
                                  alt="freepik image"
                                />
                              </div>

                              <p className="pointer-none text-gray-500 ">
                                {logoLoading ? (
                                  "Loading..."
                                ) : (
                                  <span>
                                    <span className="cursor-pointer text-blue-600 hover:underline">
                                      Select a file
                                    </span>{" "}
                                    from your computer
                                  </span>
                                )}
                              </p>
                            </div>
                          )}

                          <input
                            type="file"
                            id="logo"
                            name="logo"
                            accept="image/*"
                            onChange={handleLogoChange}
                            disabled={imageLoading}
                            className="w-[0.00001px] "
                            required
                          />
                        </label>
                      </div>
                    </div>

                    <div></div>
                  </div>
                </div>
                <div>
                  <label className="mb-2 mt-2 block text-sm font-medium text-gray-900">
                    University Image*
                  </label>
                  <div>
                    <div className="grid grid-cols-1 space-y-2">
                      <div className="flex w-full items-center justify-center">
                        <label
                          className="group flex h-60 w-full cursor-pointer flex-col rounded-lg border-4 border-dashed p-10 text-center transition-all hover:border-dotted"
                          htmlFor="image"
                        >
                          {formData?.image !== "" ? (
                            <div className="flex h-full w-full flex-col items-center justify-center text-center  ">
                              {imageLoading ? (
                                "Loading..."
                              ) : (
                                <img
                                  src={formData?.image}
                                  width={200}
                                  height={200}
                                  alt="picture"
                                  className="rounded-xl"
                                  style={{ objectFit: "cover" }} // Ensure the image covers the specified dimensions
                                />
                              )}
                            </div>
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center text-center  ">
                              <div className="mx-auto -mt-5 flex max-h-48 w-3/5 flex-auto">
                                <img
                                  className="has-mask mx-auto h-36 object-center"
                                  src="https://cdni.iconscout.com/illustration/premium/thumb/social-media-image-upload-4358258-3618854.png"
                                  alt="freepik image"
                                />
                              </div>

                              <p className="pointer-none text-gray-500 ">
                                {imageLoading ? (
                                  "Loading..."
                                ) : (
                                  <span>
                                    <span className="cursor-pointer text-blue-600 hover:underline">
                                      Select a file
                                    </span>{" "}
                                    from your computer
                                  </span>
                                )}
                              </p>
                            </div>
                          )}

                          <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={imageLoading}
                            className="w-[0.00001px] "
                            required
                          />
                        </label>
                      </div>
                    </div>

                    <div></div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="rounded bg-blue-500 px-4 py-2 text-white disabled:bg-opacity-60"
                    disabled={
                      !formData.logo ||
                      !formData.image ||
                      formData.logo === "" ||
                      formData.image === ""
                    }
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

export default AllUniversitiesComp;
