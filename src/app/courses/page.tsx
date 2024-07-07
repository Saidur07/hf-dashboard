import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllCourses from "../../components/Courses/AllCourses";

export const metadata: Metadata = {
  title: "All Courses | HF Consultancy Dashboard",
  description: " All Courses page",
};

const Courses: React.FC = () => {
  return (
    <DefaultLayout>
      <AllCourses />
    </DefaultLayout>
  );
};

export default Courses;
