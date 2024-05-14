import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EditSubCatComp from './../../../components/SubCategory/EditSubCatComp';

export const metadata: Metadata = {
    title: "Edit Sub Category | KOC Admin Dashboard",
    description: "This is KOC Admin Dashboard Edit Category page",
};

const EditSubCategory: React.FC = () => {
    return (
        <DefaultLayout>
            <EditSubCatComp />
        </DefaultLayout>
    );
};

export default EditSubCategory;
