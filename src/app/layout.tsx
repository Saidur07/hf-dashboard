"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import Cookies from 'js-cookie';

type LayoutProps = {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role")
    const currentPath = window.location.pathname;
    // Check if the current path is not the sign-in path and there's no token
  
    if(currentPath == "/auth/forgot"){
      setTimeout(() => setLoading(false), 1000);
    }
    else if (currentPath !== "/auth/signin" && !token && role !== "admin") {
      window.location.href = "/auth/signin"; // Redirect to sign-in page
    } else {
      setTimeout(() => setLoading(false), 1000);
    }

  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
