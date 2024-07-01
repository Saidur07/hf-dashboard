import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ForgotPassComp from "./../../../components/Auth/ForgotPassComp";

export const metadata: Metadata = {
  title: "HF Consultancy Dashboard | Forgot Password",
  description: " Forgot Password page",
};

const Forgot: React.FC = () => {
  return (
    <div>
      <ForgotPassComp />
    </div>
  );
};

export default Forgot;
