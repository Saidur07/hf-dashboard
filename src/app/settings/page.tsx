import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UpdateTerms from './../../components/Terms/UpdateTerms';

export const metadata: Metadata = {
  title: "Settings | KOC Admin Dashboard",
    description: "This is KOC Admin Dashboard Settings page",
};

const Settings = () => {
  return (
    <DefaultLayout>
     <UpdateTerms/>
    </DefaultLayout>
  );
};

export default Settings;
