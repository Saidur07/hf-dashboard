import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddSubCategoryComp from './../../../components/SubCategory/AddSubCatComp';

export const metadata: Metadata = {
    title: "Add Sub Category | KOC Admin Dashboard",
    description: "This is KOC Admin Dashboard Add Category page",
};

const AddSubCategory: React.FC = () => {
    return (
        <DefaultLayout>
            <AddSubCategoryComp />
        </DefaultLayout>
    );
};

export default AddSubCategory;
