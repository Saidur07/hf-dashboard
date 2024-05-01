import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import EditCategoryComp from './../../../components/Category/EditCategoryComp';

export const metadata: Metadata = {
  title: "Edit Category | KOC Admin Dashboard",
  description: "This is KOC Admin Dashboard Edit Category page",
};

const EditCategory: React.FC = () => {
  return (
    <DefaultLayout>
      <EditCategoryComp/>
    </DefaultLayout>
  );
};

export default EditCategory;
