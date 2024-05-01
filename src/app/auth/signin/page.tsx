import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SignInComp from './../../../components/Auth/SignInComp';

export const metadata: Metadata = {
  title: "KOC Admin Dashboard | Sign In",
  description: "This is KOC Admin Dashboard Sign In page",
};

const SignIn: React.FC = () => {
  return (
    <div>
      <SignInComp/>
    </div>
  );
};

export default SignIn;
