import { ToastContainer, toast } from "react-toastify";
import { AppBar } from "../components/AppBar";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const AddBlog = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const addNewBlog = async () => {
        if (!title.trim() || !content.trim()) {
            toast.warn("Please fill in both the title and content before submitting.");
            return;
        }

        try {
            await axios.post(`${BACKEND_URL}/api/v1/blog`,
                {
                    title,
                    content
                },
                {
                    headers: {
                        "Authorization": localStorage.getItem("token"),
                        "Content-Type": "application/text"
                    }
                }
            )
            toast.success("Blog added successfully");

            setTitle("")
            setContent("")

        } catch (error: any) {
            console.error("Error while adding new blog", error.message);
        }
    }

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="max-w-6xl p-2 rounded m-auto">
                <AppBar />
            </div>

            <div className="max-w-4xl w-full mx-auto">
                <div className=" pt-9 flex flex-col gap-8">
                    <div>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" className="border-0 outline-0 text-xl text-slate-700 bg-slate-100/30 w-full p-5 rounded" />
                    </div>
                    <div>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)} name="text" className="w-full  text-slate-700 h-96 text-xl bg-slate-100/30 p-5 rounded outline-0" placeholder="Content"></textarea>
                    </div>

                    <div>
                        <button onClick={addNewBlog} className="text-lg rounded bg-blue-500/80 border-0 hover:bg-blue-500/70 text-white py-1 px-7 cursor-pointer">Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
