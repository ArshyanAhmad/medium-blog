// This is custom hook

import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";

interface Blog {
    id: string;
    title: string;
    content: string;
    author: {
        name: string
    }
}

export const useBlog = ({ id }: { id?: string }) => {

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | null>(null);

    console.log("Inner useBlog blog", blog);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                        "Content-Type": "application/json",
                    },
                });

                console.log("response", response);

                setBlog(response.data.blog)
            } catch (error: any) {
                console.error("Error fetching blog:", error.message);

                if (error.response?.status === 401) {
                    toast.error("You are not authenticated! Please log in.");
                } else {
                    toast.error("Failed to fetch blogs. Please try again.");
                }
            } finally {
                setLoading(false);
            }

        };

        fetchBlogs();

    }, [id])

    return {
        loading,
        blog
    }

}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blogs`, {
                    headers: {
                        Authorization: localStorage.getItem('token'),
                        "Content-Type": "application/json",
                    },
                });

                setBlogs(response.data.blogs);
            } catch (error: any) {
                console.error("Error fetching blogs:", error.message);

            } finally {
                setLoading(false);
            }

        };

        fetchBlogs();

    }, [])

    return {
        loading,
        blogs
    }

}