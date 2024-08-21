"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllAdminComp from "@/components/Admin/AllAdmins";

const AllAdmins: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const role = Cookies.get("role");
    if (role !== "superadmin") {
      router.push("/");
    }
  }, [router]);

  return (
    <DefaultLayout>
      <AllAdminComp />
    </DefaultLayout>
  );
};

export default AllAdmins;
