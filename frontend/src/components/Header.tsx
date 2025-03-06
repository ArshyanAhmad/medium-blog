
import { Link } from "react-router-dom";

export const Header = ({ type }: { type: "signin" | "signup" }) => {
    return <div>
        <div className="text-center mb-3 pb-4">
            <h2 className="text-3xl text-gray-800 font-bold pb-1">
                Create an account
            </h2>
            <p className="text-sm text-slate-600">
                {type === "signup"
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                <Link to={type === "signup" ? "/signin" : "/signup"}>
                    <u>{type === "signup" ? "Login" : "Register"}</u>
                </Link>
            </p>
        </div>
    </div>;
};

