"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllAdminComp from "@/components/Admin/AllAdmins";

const AllAdmins: React.FC = () => {
  const router = useRouter();

  const role = Cookies.get("role");
  useEffect(() => {
    if (role !== "superadmin") {
      router.push("/");
    }
  }, [role, router]);

  return (
    <DefaultLayout>{role === "superadmin" && <AllAdminComp />}</DefaultLayout>
  );
};

export default AllAdmins;
