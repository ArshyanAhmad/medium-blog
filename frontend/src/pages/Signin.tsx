import { toast, ToastContainer } from 'react-toastify';
import { InputLabel } from "../components/InputLabel";
import { SigninInput } from "@ahhmd235/medium-common";
import { Header } from "../components/Header";
import { Quote } from "../components/Quote";
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import { useState } from "react";
import axios from "axios";


export const Signin = () => {
    const navigate = useNavigate();

    const [signinInputs, setSigninInputs] = useState<SigninInput>({
        username: "",
        password: ""
    });

    const sendRequest = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!signinInputs.username || !signinInputs.password) {
            return toast.warn("Please fill in all the required credentials before proceeding.");
        }

        try {


            const res = await axios.post(`${BACKEND_URL}/api/v1/users/signin`, signinInputs)
            const data = res.data;

            toast.success("User Login Successfully!")
            localStorage.setItem("token", data.token)

            setTimeout(() => {
                navigate("/blogs")
            }, 1000);

        } catch (error) {
            toast.error("Login failed!")
        }
    }

    return (
        <div>
            <ToastContainer />
            < div className="grid grid-cols-1 h-screen md:grid-cols-2" >

                <div className="flex items-center h-screen md:h-screen justify-center ">
                    <div className="max-w-80  p-5 w-full">
                        <Header type="signin" />

                        <form className="flex flex-col gap-4" onSubmit={sendRequest}>

                            <InputLabel
                                value={signinInputs.username}
                                onChange={(e) =>
                                    setSigninInputs((prev) => ({
                                        ...prev,
                                        username: e.target.value,
                                    }))
                                }
                                type="email"
                                label="Username"
                                placeholder="johndoe@gmail.com"
                            />

                            <InputLabel
                                value={signinInputs.password}
                                onChange={(e) =>
                                    setSigninInputs((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }
                                type="password"
                                label="Password"
                                placeholder="**********"
                            />

                            <div>
                                <button type='submit' className="bg-gray-900 hover:bg-gray-800 w-full py-2 cursor-pointer rounded text-white">
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <Quote />
            </div>
        </div>
    )
};


