import React from 'react';
import { CiLock } from "react-icons/ci";
import Cookies from "js-cookie"

const ResetPasswordComp = () => {
    const token = Cookies.get("token")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPass] = useState("");

    const onResetPass = async () => {
        try {
            const res = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER}/auth/resetPassword/${token}`, {
                password: password, 
                confirmPassword: confirmPassword
            });
            console.log(res)
            if (res.status === 200) {
                toast.success(res.data.message);
            }
        
        } catch (e) {
            console.log(e)
        }
        
    }
    return (
        <div>
            <div className="h-screen my-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark w-full flex justify-center items-center">
                <div className="flex flex-wrap items-center w-full justify-center">
                    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            <span className="mb-1.5 block font-medium">Reset Password</span>

                            <form>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Enter password"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                        <span className="absolute right-4 top-4 text-2xl text-[#ddd]">
                                            <CiLock />
                                        </span>
                                    </div>
                                </div>
                                 <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Confirm Password"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            onChange={(e) => setConfirmPass(e.target.value)}
                                        />

                                        <span className="absolute right-4 top-4 text-2xl text-[#ddd]">
                                            <CiLock />
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <button
                                        type="submit"
                                        onClick={() => onResetPass()}
                                        className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                    >Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordComp;