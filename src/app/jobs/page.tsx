import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllJobsComp from './../../components/Job/AllJobs';

export const metadata: Metadata = {
    title: "All Jobs | KOC Admin Dashboard",
    description: "This is KOC Admin Dashboard All Jobs page",
};

const Jobs: React.FC = () => {
    return (
        <DefaultLayout>
            <AllJobsComp />
        </DefaultLayout>
    );
};

export default Jobs;
