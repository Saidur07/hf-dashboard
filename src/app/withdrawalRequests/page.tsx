import React from 'react';
import DefaultLayout from './../../components/Layouts/DefaultLayout';
import AllWithdrawalReqs from '../../components/Withdrawal/AllWithdrawalReqs';
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: "Withdrawal Requests | KOC Admin Dashboard",
    description: "This is KOC Admin Dashboard Withdrawal Requests page",
};


const WithdrawalRequests = () => {
    return (
        <DefaultLayout>
            <AllWithdrawalReqs />            
        </DefaultLayout>
    );
};

export default WithdrawalRequests;