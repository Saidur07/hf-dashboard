import Stats from "@/components/Dashboard/Stats";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HF Consultancy Dashboard",
  description: "This is Home page for HF Consultancy Dashboard",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Stats />
      </DefaultLayout>
    </>
  );
}
