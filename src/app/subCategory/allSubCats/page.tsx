import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllSubCatComp from './../../../components/SubCategory/AllSubCatComp';

export const metadata: Metadata = {
    title: "All Sub Category | KOC Admin Dashboard",
    description: "This is KOC Admin Dashboard All Category page",
};

const AllSubCats: React.FC = () => {
    return (
        <DefaultLayout>
            <AllSubCatComp />
        </DefaultLayout>
    );
};

export default AllSubCats;
