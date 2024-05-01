import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ForgotPassComp from './../../../components/Auth/ForgotPassComp';

export const metadata: Metadata = {
  title: "KOC Admin Dashboard | Forgot Password",
  description: "This is KOC Admin Dashboard Forgot Password page",
};

const SignIn: React.FC = () => {
  return (
    <div>
      <ForgotPassComp/>
    </div>
  );
};

export default SignIn;
