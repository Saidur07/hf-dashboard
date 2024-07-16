import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllUniversities from "../../components/Universities/AllUniversities";

export const metadata: Metadata = {
  title: "All Universities | HF Consultancy Dashboard",
  description: " All Universities page",
};

const Universities: React.FC = () => {
  return (
    <DefaultLayout>
      <AllUniversities />
    </DefaultLayout>
  );
};

export default Universities;
