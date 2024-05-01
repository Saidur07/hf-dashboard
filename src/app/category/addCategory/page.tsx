import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddCategoryComp from './../../../components/Category/AddCategoryComp';

export const metadata: Metadata = {
  title: "Add Category | KOC Admin Dashboard",
  description: "This is KOC Admin Dashboard Add Category page",
};

const AddCategory: React.FC = () => {
  return (
    <DefaultLayout>
      <AddCategoryComp/>
    </DefaultLayout>
  );
};

export default AddCategory;
