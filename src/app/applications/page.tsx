import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllApplications from "../../components/Applications/AllApplications";

export const metadata: Metadata = {
  title: "All Applications | HF Consultancy Dashboard",
  description: " All Applications page",
};

const Applications: React.FC = () => {
  return (
    <DefaultLayout>
      <AllApplications />
    </DefaultLayout>
  );
};

export default Applications;
