import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllStudents from "../../components/Students/AllStudents";

export const metadata: Metadata = {
  title: "All Students | HF Consultancy Dashboard",
  description: " All Students page",
};

const Students: React.FC = () => {
  return (
    <DefaultLayout>
      <AllStudents />
    </DefaultLayout>
  );
};

export default Students;
