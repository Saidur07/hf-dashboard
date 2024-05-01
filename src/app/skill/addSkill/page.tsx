import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddSkillComp from './../../../components/Skill/AddSkillComp';

export const metadata: Metadata = {
    title: "Add Skill | KOC Admin Dashboard",
    description: "This is KOC Admin Dashboard Add Skill page",
};

const AddSkill: React.FC = () => {
    return (
        <DefaultLayout>
            <AddSkillComp />
        </DefaultLayout>
    );
};

export default AddSkill;
