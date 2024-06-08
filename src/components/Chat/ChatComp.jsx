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
import Image from 'next/image';

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

      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER}/message/${operator}/${peer}`);

      if (response.status === 200) {
        // Filter messages based on the time period
        const filteredMessages = response.data.data.filter(msg => {
          const messageTimestamp = new Date(msg.createdAt).getTime() / 1000;
          return (!minTimestamp || messageTimestamp >= minTimestamp) &&
            (!maxTimestamp || messageTimestamp <= maxTimestamp);
        });

        setMessages(filteredMessages);
      }

    } catch (error) {
      console.log(error);
    }
  };

  console.log(messages)
  return (
    <div>
      <h2 className="lg:md:text-3xl text-xl font-semibold mb-2">Search Conversation</h2>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white lg:md:text-2xl text-lg">
            Search Conversation
          </h3>
        </div>

        <div className='grid grid-cols-2 items-center gap-x-4 p-6 w-full'>
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Sender User ID
            </label>
            <input
              type="text"
              onChange={(e) => setOperator(e.target.value)}
              placeholder="Sender User ID"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Receiver User ID
            </label>
            <input
              type="text"
              onChange={(e) => setPeer(e.target.value)}
              placeholder="Receiver User ID"
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
          <h2 className="text-xl font-semibold mb-2">Messages ({messages?.length ? `${messages?.length}` : '0'} found)</h2>


          <div className="chat-container">
            <div className="chat-bubble-container">
              {messages && messages.map((msg, index) => (
                <div key={index} className={`chat-bubble ${msg.sender === operator ? 'operator' : 'peer'}`}>
                  <p>{msg.message}</p>
                  {msg.image &&
                    <Image
                      src={msg.image}
                      alt="image"
                      width={100}
                      height={100}
                    />
                  }

                  <p className="time">{new Date(msg.createdAt * 1000).toLocaleString()}</p>
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