'use client';

import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IMGBB_KEY from './../../../constant';
import { IoIosArrowDown } from 'react-icons/io';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const UpdateTerms = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();

    const token = Cookies.get('token');
    const [terms, setTerms] = useState({});
    const [agreement, setAgreement] = useState({});
    const [editorContentKVKK, setEditorContentKVKK] = useState('');
    const [editorContentAgreement, setEditorContentAgreement] = useState('');

    useEffect(() => {
        const getTerms = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/misc/terms`);
                if (res.status === 200) {
                    const data = res.data.data[0];
                    setTerms(data);
                    setEditorContentKVKK(data.kvkk);
                    setEditorContentAgreement(data.userAgreement);
                    setValue('kvkk', data.kvkk);
                    setValue('userAgreement', data.userAgreement);
                }
            } catch (e) {
                console.log(e);
            }
        };
        getTerms();
    }, [setValue]);

    const onUpdateTerms = async (data) => {
        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER}/misc/terms`,
                {
                    kvkk: data.kvkk ? data.kvkk : terms.kvkk,
                    userAgreement: data.userAgreement ? data.userAgreement : terms.userAgreement,
                    _id: terms._id
                }, {
                headers: {
                    authorization: `${token}`,
                },
            });

            if (res.status === 200) {
                toast.success("Şartlar güncellendi");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleEditorChangeKVKK = (content) => {
        setEditorContentKVKK(content);
        setValue('kvkk', content);
    };

    const handleEditorChangeAgreement = (content) => {
        setEditorContentAgreement(content);
        setValue('userAgreement', content);
    };

    return (
        <div>
            <h2 className="lg:md:text-3xl text-xl font-semibold mb-2">Şartlar ve Koşulları Güncelle </h2>

            {/* Update KVKK Section */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white lg:md:text-2xl text-lg">
                        KVKK Güncelle
                    </h3>
                </div>
                <form action="#" onSubmit={handleSubmit(onUpdateTerms)}>
                    <div className="p-6.5">
                        <div className="mb-6">
                            <ReactQuill
                                theme="snow"
                                value={editorContentKVKK}
                                onChange={handleEditorChangeKVKK}
                                className="w-full"
                            />
                        </div>

                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Güncelle
                        </button>
                    </div>
                </form>
            </div>

            {/* Update User Agreement Section */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-4">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white lg:md:text-2xl text-lg">
                        Kullanıcı Sözleşmesi Güncelle
                    </h3>
                </div>
                <form action="#" onSubmit={handleSubmit(onUpdateTerms)}>
                    <div className="p-6.5">
                        <div className="mb-6">
                            <ReactQuill
                                theme="snow"
                                value={editorContentAgreement}
                                onChange={handleEditorChangeAgreement}
                                className="w-full"
                            />
                        </div>

                        <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Güncelle
                        </button>
                    </div>
                </form>
            </div>

            <ToastContainer />
        </div>
    );
};

export default UpdateTerms;

