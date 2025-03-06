import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./Avatar";


export const AppBar = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const logoutHandler = async () => {
        localStorage.setItem("token", "");

        navigate("/signin")
    };


    return (
        <div className="flex p-1 items-center justify-between">
            <div>
                <Link to="/blogs">
                    <h4 className="text-xl font-medium">Medium</h4>
                </Link>
            </div>
            <div className="flex items-center gap-3">
                {
                    token ? <button type="button" className="text-white bg-blue-600 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center me-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700 cursor-pointer"

                        onClick={() => navigate('/blog/new')}>
                        Add Blog
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                        : null
                }


                {token ? (
                    <button
                        type="button"
                        className="text-white bg-slate-600 hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-300 font-medium rounded-full text-sm px-5 py-2 me-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-700 cursor-pointer dark:border-slate-700"

                        onClick={logoutHandler}
                    >
                        Logout
                    </button>
                ) : (
                    null
                )}


                <Avatar size={"big"} />
            </div>
        </div >
    );
};
