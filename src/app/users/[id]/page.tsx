import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EditUser from '../../../components/User/EditUser';

export const metadata: Metadata = {
    title: "Edit User | KOC Admin Dashboard",
    description: "This is KOC Admin Dashboard Edit User page",
};

const AllUsers: React.FC = () => {
    return (
        <DefaultLayout>
            <EditUser />
        </DefaultLayout>
    );
};

export default AllUsers;