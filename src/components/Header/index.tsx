import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import { CiLogout } from "react-icons/ci";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';


const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {

  const logout = () => {
    // Clear all cookies
    Object.keys(Cookies.get()).forEach(cookie => {
      Cookies.remove(cookie);
    });
    // Redirect to sign-in page
    window.location.href = "/auth/signin";
  }
 
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none items-center">
      <div className="lg:md:hidden block">
        <Link href="/">
          <h2 className="text-xl font-bold text-[#fff] ps-4">KocFreelancing</h2>
        </Link>
      </div>
      <div className="flex flex-grow items-center justify-end px-2 py-4 lg:md:shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm bg-white p-1.5 shadow-sm  dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>


        <div className="flex items-center gap-3 2xsm:gap-7 justify-end">
          <ul className="flex items-center gap-2 2xsm:gap-4 justify-end">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}
            <div className="lg:md:hidden block">
            <button
              onClick={() => logout()}
              className="flex items-center gap-3.5 px-2 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
             <CiLogout className="text-3xl"/>
            </button>
          </div>
          </ul>

          <div className="lg:md:block hidden">
            {/* <!-- User Area --> */}
            <DropdownUser />
            {/* <!-- User Area --> */}
          </div>
          
          
        </div>
      </div>
    </header>
  );
};

export default Header;
