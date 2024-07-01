import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllAdminsComp from "./../../../components/Admin/AllAdmins";

export const metadata: Metadata = {
  title: "All Admins | HF Consultancy Dashboard",
  description: " All Admin page",
};

const AllAdmin: React.FC = () => {
  return (
    <DefaultLayout>
      <AllAdminsComp />
    </DefaultLayout>
  );
};

export default AllAdmin;
