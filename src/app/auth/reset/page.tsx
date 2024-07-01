import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ResetPasswordComp from "./../../../components/Auth/ResetPasswordComp";

export const metadata: Metadata = {
  title: "HF Consultancy Dashboard | Reset Password",
  description: " Reset password page",
};

const Reset: React.FC = () => {
  return (
    <DefaultLayout>
      <ResetPasswordComp />
    </DefaultLayout>
  );
};

export default Reset;
