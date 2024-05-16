import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllAdminsComp from './../../../components/Admin/AllAdmins';

export const metadata: Metadata = {
    title: "All Admin | KOC Admin Dashboard",
    description: "This is KOC Admin Dashboard All Admin page",
};

const AllAdmin: React.FC = () => {
    return (
        <DefaultLayout>
            <AllAdminsComp />
        </DefaultLayout>
    );
};

export default AllAdmin;
