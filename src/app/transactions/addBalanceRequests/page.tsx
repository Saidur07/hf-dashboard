import React from 'react';
import DefaultLayout from './../../../components/Layouts/DefaultLayout';
import AllAddbalanceReqs from './../../../components/Withdrawal/AllAddbalanceReqs';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Add Balance Requests | KOC Admin Dashboard",
    description: "This is KOC Admin Dashboard Add Balance Request page",
};


const AddBalanceRequests = () => {
    return (
        <DefaultLayout>
            <AllAddbalanceReqs />            
        </DefaultLayout>
    );
};

export default AddBalanceRequests;

