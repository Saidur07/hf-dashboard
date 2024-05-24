'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IMGBB_KEY from '../../../constant';
import { IoIosArrowDown } from 'react-icons/io';
import Link from "next/link"

const ChatComp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const token = Cookies.get('token');
  const [messages, setMessages] = useState([]);
  const [operator, setOperator] = useState("");
  const [peer, setPeer] = useState("");
  const [minTime, setMinTime] = useState("");
  const [maxTime, setMaxTime] = useState("");

  const onSubmit = async () => {
    try {
      const minTimestamp = minTime ? new Date(minTime).getTime() / 1000 : undefined;
      const maxTimestamp = maxTime ? new Date(maxTime).getTime() / 1000 : undefined;

      const res = await axios.post(`https://adminapisgp.im.qcloud.com/v4/openim/admin_getroammsg?sdkappid=20008771&identifier=administrator&usersig=eJwtzFsLgkAQBeD-Ms*Rq7GtCb0FmUQFWkn4Is0oQ3lbF4mi-15eHs93DucD0T6cd6TBA2cuYDZkRioNZzxwigWX3BqdmkpPgxYfaV0zgucIIVyl7NHpVbMm8GwpZd*MarjoTdlyoZauO2nL*f-9HlPldxhsskN58ilKrLfY5gE2VSPUMYzxUjwTi3B1ve3Oa-j*AH0mNYU_&random=99999999&contenttype=json`, {
        Operator_Account: operator,
        Peer_Account: peer,
        MaxCnt: 1000,
        MinTime: minTimestamp,
        MaxTime: maxTimestamp
      });

      console.log(res.data)

      if (res.status === 200) {
        setMessages(res.data);
      }

    } catch (e) {
      console.log(e)
    }
  };
console.log(messages)
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-2">Search Conversation</h2>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Search Conversation
          </h3>
        </div>

        <div className='grid grid-cols-2 items-center gap-x-4 p-6 w-full'>
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Person One Email
            </label>
            <input
              type="text"
              onChange={(e) => setOperator(e.target.value)}
              placeholder="Person One Email"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Person Two Email
            </label>
            <input
              type="text"
              onChange={(e) => setPeer(e.target.value)}
              placeholder="Person Two Email"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Min Time
            </label>
            <input
              type="date"
              placeholder="Min Time"
              onChange={(e) => setMinTime(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Max Time
            </label>
            <input
              type="date"
              placeholder="Max Time"
              onChange={(e) => setMaxTime(e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <button
            type="submit"
            onClick={onSubmit}
            className=" flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">Search</button>
        </div>

        <div className='p-6 mt-4 bg-slate-700'>
          <h2 className="text-xl font-semibold mb-2">Messages ({messages?.MsgCnt ? `${messages?.MsgCnt}` : '0'} found)</h2>


          <div className="chat-container">
            <div className="chat-bubble-container">
              {messages?.MsgList && messages?.MsgList.map((msg, index) => (
                <div key={index} className={`chat-bubble ${msg.From_Account === operator ? 'operator' : 'peer'}`}>
                  <p>{msg.MsgBody[0].MsgType === "TIMTextElem" && msg.MsgBody[0].MsgContent.Text}</p>
                  {msg.MsgBody[0].MsgType === "TIMFileElem" &&  
                  <div className="">
                    <Link 
                    href={msg.MsgBody[0].MsgContent.Url} 
                    target="_blank" 
                    className="hover:underline text-blue-500">{msg.MsgBody[0].MsgContent.FileName}</Link>
                    </div>
                    }
                 
                  <p className="time">{msg.From_Account}</p>
                  <p className="time">{new Date(msg.MsgTimeStamp * 1000).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ChatComp;