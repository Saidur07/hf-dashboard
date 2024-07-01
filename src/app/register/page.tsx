import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import RegisterStudent from "../../components/Register/RegisterStudent";

export const metadata: Metadata = {
  title: "Register New Student | HF Consultancy Dashboard",
  description: " Register New Student page",
};

const Register: React.FC = () => {
  return (
    <DefaultLayout>
      <RegisterStudent />
    </DefaultLayout>
  );
};

export default Register;
