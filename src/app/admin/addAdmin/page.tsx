"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddAdminComp from "@/components/Admin/AddAdmin";

const AddAdmin: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const role = Cookies.get("role");
    if (role !== "superadmin") {
      router.push("/");
    }
  }, [router]);

  return (
    <DefaultLayout>
      <AddAdminComp />
    </DefaultLayout>
  );
};

export default AddAdmin;
