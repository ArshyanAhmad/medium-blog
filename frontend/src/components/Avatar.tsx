import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Avatar = ({ size = "small" }: { size?: "small" | "big" }) => {

    const [name, setName] = useState("Anonymous");

    useEffect(() => {
        const getUserData = async () => {
            const response = await axios.get(`${BACKEND_URL}/api/v1/users/data`,
                {
                    headers: {
                        "Authorization": localStorage.getItem("token"),
                        "Content-Type": "application/text"
                    }
                }
            );

            const userName = response.data.name;
            console.log("username", userName);

            setName(userName);
        }

        getUserData();
    }, []);


    return (
        <div className={`relative inline-flex items-center justify-center  ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className={`font-medium ${size === "small" ? "text-xs" : "text-md"} text-gray-600 dark:text-gray-300`}>
                {name[0]}
            </span>
        </div>
    );
};
