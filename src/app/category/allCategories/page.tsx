import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllCategoriesComp from './../../../components/Category/AllCategoriesComp';

export const metadata: Metadata = {
  title: "All Categories | KOC Admin Dashboard",
  description: "This is KOC Admin Dashboard All Categories page",
};

const AllCategories: React.FC = () => {
  return (
    <DefaultLayout>
      <AllCategoriesComp/>
    </DefaultLayout>
  );
};

export default AllCategories;
