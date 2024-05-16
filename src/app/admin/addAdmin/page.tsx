import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddAdminComp from './../../../components/Admin/AddAdmin';

export const metadata: Metadata = {
    title: "Add Admin | KOC Admin Dashboard",
    description: "This is KOC Admin Dashboard Add Admin page",
};

const AddAdmin: React.FC = () => {
    return (
        <DefaultLayout>
            <AddAdminComp />
        </DefaultLayout>
    );
};

export default AddAdmin;
