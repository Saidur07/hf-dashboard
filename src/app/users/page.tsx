import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllUsersComp from './../../components/User/AllUsersComp';

export const metadata: Metadata = {
    title: "All Users | KOC Admin Dashboard",
    description: "This is KOC Admin Dashboard All Users page",
};

const AllUsers: React.FC = () => {
    return (
        <DefaultLayout>
            <AllUsersComp />
        </DefaultLayout>
    );
};

export default AllUsers;