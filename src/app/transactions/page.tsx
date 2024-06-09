import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import AllWithdrawalReqs from '../../components/Withdrawal/AllWithdrawalReqs';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Transactions | KOC Admin Dashboard",
    description: "This is KOC Admin Dashboard Transactions page",
};


const WithdrawalRequests = () => {
    return (
        <DefaultLayout>
            <AllWithdrawalReqs />            
        </DefaultLayout>
    );
};

export default WithdrawalRequests;