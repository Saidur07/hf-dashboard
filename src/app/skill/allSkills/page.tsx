import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AllSkillsComp from './../../../components/Skill/AllSkillsComp';

export const metadata: Metadata = {
    title: "All Skill | KOC Admin Dashboard",
    description: "This is KOC Admin Dashboard All Skill page",
};

const AllSkill: React.FC = () => {
    return (
        <DefaultLayout>
            <AllSkillsComp />
        </DefaultLayout>
    );
};

export default AllSkill;
