import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const NotAuthenticated = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            toast.error("Login First!");
            setTimeout(() => {
                navigate("/signin");  // Ensure navigation happens after toast
            }, 2200);  // Delay navigation slightly to allow toast to show
        }
    }, [token, navigate]);


    return <div>
        <ToastContainer position="top-right" autoClose={2200} />
    </div>;
};
