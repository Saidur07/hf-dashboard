import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from './../../../components/Layouts/DefaultLayout';
import ChatComp from "../../../components/Chat/ChatComp";

export const metadata: Metadata = {
    title: "Conversation | KOC Admin Dashboard",
    description: "This is KOC Admin Dashboard Conversation page",
};

const AllCategories: React.FC = () => {
    return (
        <DefaultLayout>
            <ChatComp />
        </DefaultLayout>
    );
};

export default AllCategories;
