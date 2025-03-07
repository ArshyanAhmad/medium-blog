import { InputLabel } from "../components/InputLabel";
import { SignupInput } from "@ahhmd235/medium-common";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Quote } from "../components/Quote";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Signup = () => {
    const navigate = useNavigate();

    const [signupInputs, setSignupInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: "",
    });

    const sendRequest = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!signupInputs.username || !signupInputs.password) {
            return toast.warn("Please fill in all the required credentials before proceeding.");
        }

        try {

            const res = await axios.post(
                `${BACKEND_URL}/api/v1/users/signup`,
                signupInputs
            );

            const jwt = res.data;

            toast.success("User registered successfully!");
            localStorage.setItem("token", jwt.token);

            setTimeout(() => {
                navigate("/blogs");
            }, 1000);

        } catch (error: any) {
            toast.error("User Registeration failed!");
        }
    };

    return (
        <div>
            <div className="grid grid-cols-1 h-screen md:grid-cols-2">
                <div className="flex items-center h-screen md:h-screen justify-center ">
                    <div className="max-w-80  p-5 w-full">
                        <Header type="signup" />

                        <form className="flex flex-col gap-4" onSubmit={sendRequest}>
                            <InputLabel
                                value={signupInputs.name ? signupInputs.name : ""}
                                onChange={(e) =>
                                    setSignupInputs((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                                type="text"
                                label="Name"
                                placeholder="John Doe"
                            />

                            <InputLabel
                                value={signupInputs.username}

                                onChange={(e) =>
                                    setSignupInputs((prev) => ({
                                        ...prev,
                                        username: e.target.value,
                                    }))
                                }
                                type="email"
                                label="Username"
                                placeholder="johndoe@gmail.com"
                            />

                            <InputLabel
                                value={signupInputs.password}

                                onChange={(e) =>
                                    setSignupInputs((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }
                                type="password"
                                label="Password"
                                placeholder="**********"
                            />

                            <div>
                                <button
                                    type="submit"
                                    className="bg-gray-900 hover:bg-gray-800 w-full py-2 cursor-pointer rounded text-white"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <Quote />
            </div>
        </div>
    );
};
